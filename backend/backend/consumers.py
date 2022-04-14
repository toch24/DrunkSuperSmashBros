import json
from api import models
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

class HostLobbyConsumer(WebsocketConsumer):

    def connect(self):
        #Create a lobby and player, these will get saved to the db.
        self.room = models.lobbies()
        self.player = models.players()

        #Parse client's connection request into a dict of the passed in arguments.
        query_dict = QueryToDict(self.scope)

        #Set the player's username.
        if "username" in query_dict:
            self.player.player_name = self.room.room_host = query_dict["username"]

        #Save lobby and player to db.
        self.room.save()
        self.player.room_code = self.room
        self.player.save()

        self.room_group_name = self.room.room_code

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        #Accept connection request.
        print("connected to ", self.room_group_name, self.channel_layer_alias)
        self.accept()

        #Sending the generated lobby_code to client.
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type':'room_message',
                'event_type': 'lobby_code',
                'message':self.room_group_name
            }
        )

    #Remove room and player from db and close websocket connection.
    def disconnect(self, closing_code):
        self.player.delete()
        self.room.delete()

        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        message = messageRouter(text_data)
        
        #Send message to every member of lobby. Utilizes the room_message function below.
        async_to_sync(self.channel_layer.group_send)(
            
            self.room_group_name,
            {
                'type':'room_message',
                'message':message
            }
        )
 

    #Function that actually sends the message
    def room_message(self, event):
        message = event['message']
        eventType = event['event_type']

        self.send(text_data=json.dumps({
            'event_type':eventType,
            'message':message
        }))

    #NOT FINISHED: this for now just deserializes the json message. This function will parse and route to functions based on the message contents.
    def messageRouter(message):
        text_data_json = json.loads(message)
        message = text_data_json['message']
        return message




class VisitorLobbyConsumer(WebsocketConsumer):

    def connect(self):
        #Create a player, this will get saved to the db.
        self.player = models.players()

        #Parse client's connection request into a dict of the passed in arguments.
        query_dict = QueryToDict(self.scope)

        #Set the player's username.
        if "username" in query_dict:
            self.player.player_name = query_dict["username"]

        #Set the player's key reference to lobby/room and set connection channel_layer.
        if "room_code" in query_dict:
            self.room = models.lobbies.objects.get(room_code = query_dict["room_code"])
            self.player.room_code = self.room
            self.room_group_name = self.room.room_code
            print("Received a join request at code ", self.room_group_name)

        #Save player to db.
        self.player.save()

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        #Accept connection request.
        print("connected to ", self.room_group_name, self.channel_layer_alias)
        self.accept()

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

    #Remove player from db and close websocket connection.
    def disconnect(self, closing_code):
        self.player.delete()

        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        message = messageRouter(text_data)
        #Send message to every member of lobby. Utilizes the room_message function below.
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type':'room_message',
                'message':message
            }
        )

    #Function that actually sends the message
    def room_message(self, event):
        message = event['message']
        eventType = event['event_type']

        self.send(text_data=json.dumps({
            'event_type':eventType,
            'message':message
        }))

    #NOT FINISHED: this for now just deserializes the json message. This function will parse and route to functions based on the message contents.
    def messageRouter(message):
        text_data_json = json.loads(message)
        message = text_data_json['message']
        return message

#Parses arguments from the websocket connection requests.
def QueryToDict(request):
    query_string = str(request['query_string'])[1:].replace('\'', '').split(";")
    print("query string is: ", query_string)

    if len(query_string[0]) > 0:
        return dict(i.split('=') for i in query_string)
    else:
        return dict()