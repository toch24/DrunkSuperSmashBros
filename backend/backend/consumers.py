import json
from api import models
from channels.generic.websocket import WebsocketConsumer

class LobbyConsumer(WebsocketConsumer):
    def connect(self):
        super().connect()
        room = models.Room()

        # Sending the generated code to identify room.
        self.send(text_data=json.dumps({
            'roomCode': room.roomCode
        }))

    def disconnect(self, closing_code):
        pass

    def receive(self, text_data, bytes_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        self.send(text_data=json.dumps({
            'message': message
        }))

