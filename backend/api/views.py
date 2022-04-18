from telnetlib import TLS
from tkinter.tix import TList
from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
# from pymongo import MongoClient
# from .. import api
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import requests
import json
#for random code generation
import string
import random
from random import randrange
from . import models




connection_string = 'mongodb+srv://CIS4930:DrunkSuperSmashBros@drunksupersmashbros.820dx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
# Password = DrunkSuperSmashBros
# db_name = DrunkSuperSmashBros
# username = CIS4930

# my_client = MongoClient(connection_string)
# dbname = my_client['DrunkSuperSmashBros']
# col_name = dbname["test"]


@csrf_exempt
def new_lobby(request):

    if request.method == "POST":
        name = request.POST['name']
        code = request.POST['newCode']
        print(name)
        print(code)



    return HttpResponse(200)

@csrf_exempt
def betting(request):

    if request.method == "POST":
        betFor = request.POST['betFor']
        bet = request.POST['bet']
        name = request.POST['name']
        print(betFor)
        print(bet)
        print(name)

    return HttpResponse(200)

#get character data from the unofficial smash bros ultimate api
#reference https://smashbros-unofficial-api.vercel.app/
@csrf_exempt
def get_char_data(request):
    if request.method == 'GET':
        r = requests.get('https://smashbros-unofficial-api.vercel.app/api/v1/ultimate/characters')
        data = r.json()
        characters = {}
        for values in data:
            characters[values['name']] = values['images']['portrait']

    return HttpResponse(json.dumps(characters))


@csrf_exempt
def get_rand_challenge(request):
    if request.method == 'GET':
        challenges_obj = models.challenges.objects.get(challenge_id = 1)
        challenges_list = list(challenges_obj.challenges)
        size = len(challenges_list)
        index = randrange(size)
        challenge = challenges_list[index]
        print(challenges_list)
        print(challenge)

    return HttpResponse(json.dumps(challenge))
