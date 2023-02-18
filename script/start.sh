#!/bin/bash

images=$(sudo docker image ls -aq)
echo ${images}

# Clean sudo docker networks
##sudo docker network rm front_back
sudo docker network rm back_db

# clean containers
sudo docker stop front
sudo docker stop back 
sudo docker stop db

sudo docker rm front
sudo docker rm back 
sudo docker rm db

# clean images
sudo docker image rm ${images} -f


# create sudo docker networks
#sudo# docker network create front_back
sudo docker network create back_db

#

# create images
rm -rf back/app
cd ../
yarn run nx run api:build
cd script
cp -r ../dist/apps/api ./back/app
cp ../package.json ./back/app/package.json
cp ../yarn.lock ./back/app/yarn.lock
cp -r ../prisma    ./back/app/prisma

sudo docker build -f back/Dockerfile back -t back_img
# run back
sudo docker run -d -p 3000:3000 --name back back_img

#echo $(sudo docker container ps -a)

sudo docker network connect back_db back
##sudo #docker network connect front_back back


