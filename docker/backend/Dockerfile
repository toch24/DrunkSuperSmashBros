# docker/backend/Dockerfile
#https://saasitive.com/tutorial/docker-compose-django-react-nginx-let-s-encrypt/
FROM python:3.8.3-slim

WORKDIR /app
ADD ./backend/requirements.txt /app/backend/

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install psycopg2

RUN pip install --upgrade pip
RUN pip install psycopg2-binary
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt

ADD ./docker /app/docker
ADD ./backend /app/backend