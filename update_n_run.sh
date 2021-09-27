#!/bin/bash
imageName=xx:discord-bot
containerName=jimmy-steve

docker build -t $imageName -f Dockerfile  .

echo Delete old container...
docker rm -f $containerName

echo Pulling down from Github...
git pull

echo Building new docker image...
docker build -t jimmy-steve .

echo Run new container...
docker run -d -p 5000:5000 --name $containerName $imageName