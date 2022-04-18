from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    #re_path(r'ws/socket/(?P<room_code>\w+)(?P<username>\w+)/$', consumers.LobbyConsumer.as_asgi()),
    re_path(r'ws/socket/', consumers.LobbyConsumer.as_asgi()),
   # re_path(r'ws/socket/join_lobby', consumers.VisitorLobbyConsumer.as_asgi())
]