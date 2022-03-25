from telnetlib import TLS
from tkinter.tix import TList
from django.shortcuts import render
from django.http import HttpResponse
import pymongo
from pymongo import MongoClient
from api.utils import get_db_handle
from django.conf import settings
import certifi

connection_string = 'mongodb+srv://CIS4930:DrunkSuperSmashBros@drunksupersmashbros.820dx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
# Password = DrunkSuperSmashBros
# db_name = DrunkSuperSmashBros
# username = CIS4930

my_client = MongoClient(connection_string)
dbname = my_client['DrunkSuperSmashBros']
col_name = dbname["test"]

def test(request):
 #   test = col_name.insert_one({"test": "testing"})
 #   print(test)
    return HttpResponse("Test Backend")

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