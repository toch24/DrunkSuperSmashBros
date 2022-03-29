from django.urls import path
from .views import new_lobby
urlpatterns = [
    path('new_lobby/', new_lobby),
]