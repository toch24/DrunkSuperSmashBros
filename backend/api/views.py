from django.shortcuts import render
from django.http import HttpResponse
from pymongo import MongoClient
from api.utils import get_db
#mongodb+srv://CIS4930:<password>@drunksupersmashbros.820dx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
# Password = DrunkSuperSmashBros
# db_name = DrunkSuperSmashBros
# username = CIS4930

def test(request):
    mydb, mycol, myclient = get_db("DrunkSuperSmashBros", "UserInfo", "localhost", 27017, "CIS4930", "DrunkSuperSmashBros")
    #mycol.insert({"test1":"CIS", "test2":17})
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