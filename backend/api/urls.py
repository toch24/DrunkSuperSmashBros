from django.urls import path
from .views import test, get_ownerinfo
#from .core import *
# from django.conf.urls import url

urlpatterns = [
    path('test/', test),
    path('lobbyowner/', get_ownerinfo),
]