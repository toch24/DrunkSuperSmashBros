from pymongo import MongoClient

# mongodb+srv://CIS4930:<password>@drunksupersmashbros.820dx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
# Password = DrunkSuperSmashBros
# db_name = DrunkSuperSmashBros
# username = CIS4930


def get_db_handle(db_name, host, port, username, password):

 client = MongoClient(host=host,
                      port=int(port),
                      username=username,
                      password=password
                     )
 db_handle = client['db_name']
 return db_handle, client