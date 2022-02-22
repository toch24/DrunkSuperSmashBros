from django.db import models

# Create your models here.

class Room(models.Model):
    roomCode = models.CharField(max_length=10, default="", unique=True)
    roomHost = models.CharField(max_length=70, default="none", unique=True)
    numPlayers = models.IntegerField(null = False, default=1)