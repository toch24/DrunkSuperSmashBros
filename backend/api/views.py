from telnetlib import TLS
from tkinter.tix import TList
from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
import pymongo
from pymongo import MongoClient
from api.utils import get_db_handle
from django.conf import settings
import certifi
from django.views.decorators.csrf import csrf_exempt

connection_string = 'mongodb+srv://CIS4930:DrunkSuperSmashBros@drunksupersmashbros.820dx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
# Password = DrunkSuperSmashBros
# db_name = DrunkSuperSmashBros
# username = CIS4930

my_client = MongoClient(connection_string)
dbname = my_client['DrunkSuperSmashBros']
col_name = dbname["test"]


@csrf_exempt
def new_lobby(request):
    if request.method == "POST":
        name = request.POST['name']
        code = request.POST['newCode']
        print(name)
        print(code)

    return HttpResponse(200)

# from django.shortcuts import render
# from django.http import HttpResponse
# import pymongo
# from api.utils import get_db

# def test(request):

#     client = pymongo.MongoClient("mongodb+srv://CIS4930:DrunkSuperSmashBros@drunksupersmashbros.820dx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
#     db = client.DrunkSuperSmashBros
#     col = db.UserInfo
#     col.insert({"test1":"CIS", "test2":17})
#     return HttpResponse("Test Backend")
