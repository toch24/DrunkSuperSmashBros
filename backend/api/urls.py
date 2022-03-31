from django.urls import path
from . import views

urlpatterns = [
    path('new_lobby/', views.new_lobby, name='new_lobby'),
    path('get_data/', views.get_char_data, name='get_data')
]
