import string, random
from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

# Generates a room code. Inspired by https://www.youtube.com/watch?v=uhSmgR1hEwg&list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j&index=2
def roomGuid():
    while True:
        roomCode = ''.join(random.choices(string.ascii_uppercase, k=5))
        if lobbies.objects.filter(room_code = roomCode).count() == 0:
            break
    return roomCode

# If you are creating a new model please be careful with the $ manage.py migration and $ manage.py makemigrations command
# Do NOT manually touch the database, django will lose "sense" with it and its hard to get back in sync

# If you are creating a new table follow these steps:

# Working on another branch different to main
#   1. Create your model here
#   2. $ python manage.py makemigrations
#   3. $ python manage.py migrate
#   4. Commit your migrations files
#   5. Merge/Pull Request onto main branch with the new files and models
#
#   On Main Branch Now:
#   6. $ python manage.py migrate

# If working from main:
# Create the models as you would and then just
#   2. $ python manage.py makemigrations
#   3. $ python manage.py migrate
#  End with commiting the migration files

class challenges(models.Model):
    challenge_id = models.IntegerField(primary_key=True)
    challenges = ArrayField(models.CharField(max_length=500), null=True)


class lobbies(models.Model):
    room_id = models.BigAutoField(primary_key=True)
    room_code = models.CharField(max_length=5, default=roomGuid, unique=True)
    room_host = models.CharField(max_length=20)
    numPlayers = models.IntegerField(null = False, default=1)
    numBetted = models.IntegerField(null = False, default=0)
    players_playing = ArrayField(models.CharField(max_length=500), null=True)


class players(models.Model):
    player_id = models.BigAutoField(primary_key=True)
    room_code = models.ForeignKey(to=lobbies, on_delete=models.CASCADE)
    player_name = models.CharField(max_length=20)
    is_playing = models.BooleanField(null = True)
    bet_for = models.CharField(null = True, max_length=20)