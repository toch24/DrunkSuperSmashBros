from django.db import models

# Create your models here.


class challenges(models.Model):
    challenge_id = models.BigAutoField(primary_key=True)
    challenge_str = models.CharField(max_length=150)


class lobbies(models.Model):
    room_id = models.BigAutoField(primary_key=True)
    room_code = models.CharField(max_length=5)
    room_host = models.CharField(max_length=20)


class players(models.Model):
    player_id = models.BigAutoField(primary_key=True)
    room_code = models.ForeignKey(to=lobbies, on_delete=models.CASCADE)
    player_name = models.CharField(max_length=20)



