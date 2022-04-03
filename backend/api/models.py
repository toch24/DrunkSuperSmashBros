import string, random
from django.db import models

# Create your models here.

# could use a re-look, from https://www.youtube.com/watch?v=uhSmgR1hEwg&list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j&index=2
def roomGuid():
    while True:
        roomCode = ''.join(random.choices(string.ascii_uppercase, k=5))
        if Room.objects.filter(roomCode = roomCode).count() == 0:
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


class Room(models.Model):
    roomCode = models.CharField(max_length=5, default=roomGuid, unique=True)
    roomHost = models.CharField(max_length=5, default="none", unique=True)
    numPlayers = models.IntegerField(null = False, default=1)

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



