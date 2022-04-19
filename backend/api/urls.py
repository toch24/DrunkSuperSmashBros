from django.urls import path
from .views import get_char_data, get_player_data, new_lobby, betting, get_rand_challenge
urlpatterns = [
    path('new_lobby/', new_lobby),
    path('betting/', betting),
    path('get_char_data', get_char_data),
    path('get_rand_challenge', get_rand_challenge),
    path('get_player_data', get_player_data)
]