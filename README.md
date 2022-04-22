### DETAILS ON SUPER SMASHED ###
A simple drinking game where players can create a lobby and everyone that is playing Smash Bros at the same time can join the same lobby. The host can then join the game while the other players can choose either to join the game, meaning they are playing in the game or betting to see who wins the current game. Players that choose to join the game will be able to select the character they are playing as and then the same challenge will be given to all the players that are currently playing the game. Host picks the challenge either randomly or customizes it. Betters can choose who they think is going to win the current game and if they lose, there's a challenge for them. If they win, they get to be free. All players must return to the lobby once the game is done, players playing will do this automatically while betters will have to press the "Return to Lobby" button. Once everyone is back in the lobby, a new round of game can start.


### HOW TO INSTALL AND RUN APP IN LOCAL HOST ###
FOR THE BACKEND:
1. cd backend
2. pip install -r requirements.txt
3. python manage.py runserver 8080 => This will run the backend server in port 8080 (DO NOT CHANGE PORT)

FOR THE FRONTEND:
1. cd frontend
2. npm install
3. npm start





## DOCKER
https://docs.docker.com/get-docker/
https://docs.docker.com/compose/

https://blog.devgenius.io/dockerizing-django-application-gunicorn-and-nginx-5a74b250198f
https://blog.devgenius.io/deploying-django-application-on-aws-ec2-and-docker-10a1f7c29573
https://medium.com/@gagansh7171/dockerize-your-django-and-react-app-68a7b73ab6e9

### Creating Images
#### Backend
From backend directory

$ `$ docker build -t atunbetun/backend_dock .`

#### Frontend
From frontend directory

$ `$ docker build -t atunbetun/frontend_dock .`

## Extra Features Implemented

## Separation of Work

**Tommy Chong** 
- Connection of the socket in the backend to the frontend
- was able to establish an ongoing communication for the socket between the backend and the frontend. 
- Worked on afterlobby, beforeplaying, charselect, joinform, createform, and waitingroom components in the frontend. 
- Worked on call to the API to get Smash characters data in the backend to the frontend. Created challenges in the database.

**Justin Mulder** 

**Hanyan Zhang (Yuki)** 
- Worked on part of the lobby design including allowing popups for create lobby and player joining. 
- Worked on the betting system that let user who are not participating in the current round to bet for other players by sending data to the backend and interacts with the models.

**Alberto de Saint Malo** 
- Set up Google Cloud PostreSQL service and connected it with Django
- Created Django models to serve the backend in order to handle lobby creation logio, player joining lobbies, challenge storage
- Worked on Dockerizing the Webapp with Docker containers:
- 
