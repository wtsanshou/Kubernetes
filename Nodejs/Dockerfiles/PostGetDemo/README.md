# How to GET and POST in node.js
==============================

A code example that illustrates how to handle the GET and POST methods in node.js when using the HTTP server.

Project contents
----------------

* server.js - contains the node.js code used to retrieve and display the first 5 friends from Twitter

* index.html - html and css that gets served when a GET request is sent to the server

* package.json - holds various metadata relevant to the project such as identifying dependencies

## Build Docker image
```bash
sudo docker build -f dockerfile -t 192.168.200.167:5000/thingnet-nodejs .
```

## Run a container
```bash
sudo docker run -it -p 8888:80 192.168.200.167:5000/thingnet-nodejs bash
```

## Access Nodejs
In host machine, open the port 8880
```
sudo nc -l 8880
```

In browser

```
http://192.168.200.186:8880/
```