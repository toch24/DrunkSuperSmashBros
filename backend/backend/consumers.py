import json
from api import models
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

class LobbyConsumer(WebsocketConsumer):
    def connect(self):
        room = models.Room()

        if len(self.scope['path_remaining']) > 1:
            print("REQUESTING SPECIAL CODE ", self.scope['path_remaining'])
            room.roomCode = self.scope['path_remaining']
            self.room_group_name = room.roomCode
            print("Received a join request at code ", self.room_group_name)
        else:
            self.room_group_name = room.roomCode

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        print("connected to ", self.room_group_name, self.channel_layer_alias)
        self.accept()

        # Sending the generated code to identify room.
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type':'room_message',
                'message':self.room_group_name
            }
        )


    def disconnect(self, closing_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type':'room_message',
                'message':message
            }
        )

    def room_message(self, event):
        message = event['message']

        self.send(text_data=json.dumps({
            'message':message
        }))

