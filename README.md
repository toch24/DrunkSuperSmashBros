### DETAILS ON SUPER SMASHED ###
A simple drinking game where players can create a lobby and everyone that is playing Smash Bros at the same time can join the same lobby. The host can then join the game while the other players can choose either to join the game, meaning they are playing in the game or betting to see who wins the current game. Players that choose to join the game will be able to select the character they are playing as and then the same challenge will be given to all the players that are currently playing the game. Host picks the challenge either randomly or customizes it. Betters can choose who they think is going to win the current game and if they lose, there's a challenge for them. If they win, they get to be free. All players must return to the lobby once the game is done, players playing will do this automatically while betters will have to press the "Return to Lobby" button. Once everyone is back in the lobby, a new round of game can start.


### HOW TO INSTALL AND RUN APP IN LOCAL HOST ###
FOR THE BACKEND:
1. `cd backend`
2. `pip install -r requirements.txt`
3. `python manage.py runserver 8080` => This will run the backend server in port 8080 (DO NOT CHANGE PORT)

FOR THE FRONTEND:
1. `cd frontend`
2. `npm install`
3. `npm start`



### Creating Images
#### Backend
From backend directory

$ `$ docker build -t atunbetun/backend_dock .`

#### Frontend
From frontend directory

$ `$ docker build -t atunbetun/frontend_dock .`

## Extra Features Implemented

## Issues
- We were not able to fully deploy the application onto AWS as we ran unto some issues.
- We were able to fully containerize the application onto a docker-compose without compilation errors but the sockets were giving us a hard time.
- After dockerizing the app we could only use the frontend on http:localhost but it would not connect to the backend as the socket connections were not correctly served.
- You can run the docker container on the root directory by using `docker-compose -f docker-compose-dev.yml up --build`. It will run on a
loop echoing "Waiting for db to be ready...". This is done on purpose as we would then ssh into the container to try and manually run the vunicorn server but we had errors.
- vunicorn command: `gunicorn backend.asgi:application -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000`

## Separation of Work

**Tommy Chong** 
- Connection of the socket in the backend to the frontend
- was able to establish an ongoing communication for the socket between the backend and the frontend. 
- Worked on afterlobby, beforeplaying, charselect, joinform, createform, and waitingroom components in the frontend. 
- Worked on call to the API to get Smash characters data in the backend to the frontend. Created challenges in the database.

**Justin Mulder** 
- Researched and set up the websockets and channel layers.
- Helped with the models used in backend.
- Worked on making host wait for players to pick characters, host picking the winning player, resetting data after round end, and stopping users from same username.

**Hanyan Zhang (Yuki)** 
- Worked on part of the lobby design including allowing popups for create lobby and player joining. 
- Worked on the betting system that let user who are not participating in the current round to bet for other players by sending data to the backend and interacts with the models.

**Alberto de Saint Malo** 
- Set up Google Cloud PostreSQL service and connected it with Django
- Created Django models to serve the backend in order to handle lobby creation logio, player joining lobbies, challenge storage
- Worked on Dockerizing the Webapp with Docker containers and deploying to AWS:
  - AWS deploynment not up yet because I could not figure out a way to handle the static files


## Python Libraries Used (also found in requirements.txt)
asgiref==3.5.0
attrs==21.4.0
autobahn==22.3.2
Automat==20.2.0
certifi==2021.10.8
cffi==1.15.0
channels==3.0.4
charset-normalizer==2.0.12
constantly==15.1.0
cryptography==36.0.2
daphne==3.0.2
Django==4.0.4
django-cors-headers==3.11.0
djangorestframework==3.13.1
hyperlink==21.0.0
idna==3.3
incremental==21.3.0
psycopg2==2.9.3
pyasn1==0.4.8
pyasn1-modules==0.2.8
pycparser==2.21
pyOpenSSL==22.0.0
pytz==2022.1
requests==2.27.1
service-identity==21.1.0
six==1.16.0
sqlparse==0.4.2
Twisted==22.4.0
twisted-iocpsupport==1.0.2
txaio==22.2.1
typing_extensions==4.2.0
tzdata==2022.1
urllib3==1.26.9
zope.interface==5.4.0