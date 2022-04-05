FROM ubuntu:20.04
ADD . /app
WORKDIR /app

RUN apt-get update -y
RUN apt-get install software-properties-common -y
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get install python3.8 -y
RUN apt-get install python3-pip -y
RUN python3.8 -m pip install --upgrade setuptools
RUN python3.8 -m pip install psycopg2-binary
RUN python3.8 -m pip install --upgrade pip wheel
RUN apt-get install python3-dev
RUN python3.8 -m pip install backports.zoneinfo
RUN python3.8 -m pip install -r requirements.txt

RUN apt-get install ufw -y
RUN ufw allow 8080
EXPOSE 8080