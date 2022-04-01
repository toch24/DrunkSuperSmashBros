from django.urls import path
from .views import get_char_data, new_lobby
urlpatterns = [
    path('new_lobby/', new_lobby),
    path('get_char_data', get_char_data)
]