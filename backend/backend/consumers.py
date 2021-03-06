# from asyncio.windows_events import NULL
from asyncio.windows_events import NULL
from cgitb import text
from unittest import result
from django.db.models import Q
from django.db.models import F
import json
from api import models
import random
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class LobbyConsumer(WebsocketConsumer):

    def connect(self):
        #Accept connection request.
        print("connected to the websocket")
        self.accept()



    #Remove room and player from db and close websocket connection.
    def disconnect(self, closing_code):
        if hasattr(self, 'player'):
            self.player.delete()
        #Host can only end the game for everyone else.
        if hasattr(self, 'room') and self.player.player_name == self.room.room_host:
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                'type':'room_message',
                'event_type':'end_lobby',
                'message':'true'
                }
            )
            self.room.delete()

        if hasattr(self, 'room_group_name'):
            async_to_sync(self.channel_layer.group_discard)(
                self.room_group_name,
                self.channel_name
            )    
        
        print("disconnected")


    def receive(self, text_data):
        #splitting data 
        data = text_data.split(',')

        if(data[0] == 'create_lobby'):
            #Create a lobby and player, these will get saved to the db.
            self.room = models.lobbies()
            self.player = models.players()
            self.player.player_name = self.room.room_host = data[1]

            #Save lobby and player to db.
            self.room.save()
            self.player.room_code = self.room
            self.player.save()

            self.room_group_name = self.room.room_code

            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name
            )

            #Sending the generated lobby_code to client.
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                'type':'room_message',
                'event_type': 'lobby_code',
                'message':self.room_group_name
                }
            )

        if(data[0] == "everyone_in"):
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                'type':'room_message',
                'event_type':'everyone_in',
                'message':'true'
              
                }
            )


        if(data[0] == "join"):
            self.room = models.lobbies.objects.get(room_code = data[1])
            self.room_group_name = self.room.room_code
            
            #Check if another player already has the same name.
            similarNamePlayers = models.players.objects.filter(Q(room_code = self.room) & Q(player_name = data[2]))
            if len(similarNamePlayers) > 0:
                self.send(text_data=json.dumps({
                    'event_type':"invalid_name",
                    'message':"This name already exists in the lobby, please pick a different one."
                }))
                return

            self.player = models.players()
            self.player.room_code = self.room
            self.player.player_name = data[2]
            #Save player to db.
            self.player.save()

            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name
            )

            #Grab all players referencing the same room_code.
            self.roomPlayers = list(models.players.objects.filter(room_code = self.room))

            #Sending an updated list of lobby players to client.   
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                'type':'room_message',
                'event_type':'player_joined',
                'message':json.dumps([player.player_name for player in self.roomPlayers])
                }
            )

        if(data[0] == "end_lobby"):
            async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type':'room_message',
                'event_type':'end_lobby',
                'message': 'true'
            })

        if(data[0] == "wait_bet"):
            ready = False
            self.room = models.lobbies.objects.get(room_code = data[1])
            #Set is_playing to false for player, meaning player is betting.
            self.playerToUpdate = models.players.objects.filter(Q(player_name = data[2]) & Q(room_code = self.room)).update(is_playing = False)

            #List of players that haven't yet chosen to bet or join game.
            self.players = list(models.players.objects.filter(Q(is_playing__isnull=True) & Q(room_code = self.room)))

            if (len(self.players) == 0):
                ready = True

            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type':'room_message',
                    'event_type':'everyone_ready',
                    'message': ready

                }
            )

        if(data[0] == "betting"):
            self.player = models.players()
            self.room = models.lobbies.objects.get(room_code = data[1])

            #Grab all players referencing the same room_code and not betting.
            self.roomPlayers = list(models.players.objects.filter(Q(is_playing=True) & Q(room_code = self.room))) # is_playing temp set to False, change to True later

               
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                'type':'room_message',
                'event_type':'betting',
                'message':json.dumps([player.player_name for player in self.roomPlayers])
                }
            )

        if(data[0] == "bet_for"):
            self.room = models.lobbies.objects.get(room_code = data[1])
            models.players.objects.filter(Q(player_name = data[2]) & Q(room_code = self.room)).update(bet_for=data[3])
            # models.lobbies.objects.filter(Q(room_code = data[1])).update(numBetted=F('numBetted')+1)
            test = models.players.objects.filter(Q(player_name = data[2]) & Q(room_code = self.room))

            for t in test:
                print(t.bet_for)
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                'type':'room_message',
                'event_type':'wait_bet',
                'message': data[2]+" betted for "+data[3]
                }
            )

        if(data[0] == "bet_challenge"):
            check = False
            self.bet = ""
            self.player = models.players()
            self.room = models.lobbies.objects.get(room_code = data[1])

            #Grab all players referencing the same room_code and not betting.
            self.player = models.players.objects.filter(Q(player_name = data[2]) & Q(room_code = self.room))

            for p in self.player:
                self.bet = p.bet_for

            if data[3] == self.bet:
                check=True

            if(check):
                async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                'type':'room_message',
                'event_type':'bet_win',
                'message':data[2]
                }
            )
            else:
                async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                'type':'room_message',
                'event_type':'bet_challenge',
                'message':data[2]
                }
            )



        if(data[0] == "finish_play"):
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                'type':'room_message',
                'event_type':'wait_bet',
                'message': "true"
                }
            )

        if(data[0] == "char_select"):
            #Get the most recent version of the lobby. Could be unnecessary.
            self.room = models.lobbies.objects.get(room_code = self.room.room_code)

            #Update list of players with their choice
            if self.room.players_playing is None:
           
                self.room.players_playing = [str(data[1] + " " + data[2])]    
            else:
                self.readyPlayers = list(self.room.players_playing)
                self.readyPlayers.append(str(data[1] + " " + data[2]))
                self.room.players_playing = self.readyPlayers

            self.room.save()
                
            self.players = list(models.players.objects.filter(Q(is_playing = True) & Q(room_code = self.room)))
            self.readyPlayers = list(self.room.players_playing)

            #If every active player has picked a character.
            if len(self.players) == len(self.readyPlayers):
                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name,
                    {
                    'type':'room_message',
                    'event_type':'all_chars_chosen',
                    'message': True
                    }
                )

        if(data[0] == "wait_join"):
            ready = False
            self.room = models.lobbies.objects.get(room_code = data[1])
            self.playerToUpdate = models.players.objects.filter(Q(player_name = data[2]) & Q(room_code = self.room)).update(is_playing = True)

            self.players = list(models.players.objects.filter(Q(is_playing__isnull=True) & Q(room_code = self.room)))

            if (len(self.players) == 0):
                ready = True

            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type':'room_message',
                    'event_type':'everyone_ready',
                    'message': ready
                    }
                )

        if(data[0] == "new_challenge"):
            challenges = models.challenges.objects.filter(challenge_id=0).values()
            challenges = challenges[0]['challenges']
            challenge = random.choice(challenges)
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
            {
                    'type':'room_message',
                    'event_type':'new_challenge',
                    'message': challenge
                    }
            )
        
        if(data[0] == 'challenge'):
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
            {
                    'type':'room_message',
                    'event_type':'challenge',
                    'message': data[1]
                    }
            )

        if(data[0] == 'player_won'):
            #Get the most recent version of the lobby. Could be unnecessary.
            self.room = models.lobbies.objects.get(room_code = self.room.room_code)

            playerName = models.players.objects.get(player_id = data[1])

            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
            {
                    'type':'room_message',
                    'event_type':'player_won',
                    'message': playerName.player_name
                    }
            )
        
        #resets players_playing, is_playing, bet_for for a new round of game
        if(data[0] == 'reset'):
            self.room = models.lobbies.objects.get(room_code = self.room.room_code)
            self.room.players_playing = None
            models.players.objects.filter(Q(player_name = data[1]) & Q(room_code = self.room)).update(is_playing = None)
            models.players.objects.filter(Q(player_name = data[1]) & Q(room_code = self.room)).update(bet_for=None)
            self.room.save()


    #NOT FINISHED: this for now just deserializes the json message. This function will parse and route to functions based on the message contents.
    def messageRouter(message):
        text_data_json = json.loads(message)
        message = text_data_json['message']
        return message


    #Function that actually sends the message
    def room_message(self, event):
        message = event['message']
        eventType = event['event_type']

        self.send(text_data=json.dumps({
            'event_type':eventType,
            'message':message
        }))