#!/bin/bash

images=$(sudo docker image ls -aq)

# Clean sudo docker networks
##sudo docker network rm front_back
sudo docker network rm back_db

# clean containers
sudo docker stop front
sudo docker stop back 
sudo docker stop postgres

sudo docker rm front
sudo docker rm back 
sudo docker rm postgres

# clean images
sudo docker image rm ${images} -f


# create sudo docker networks
#sudo# docker network create front_back
# sudo docker network create back_db

#

# create images
rm -rf back/app
cd ../
yarn run nx run api:build
cd script
cp -r ../dist/apps/api ./back/app
cp ../package.json ./back/app/package.json
cp ../yarn.lock ./back/app/yarn.lock
cp ../docker-compose.env ./.env
cp ../docker-back.env ./back/app/.env
cp -r ../prisma    ./back/app/prisma
cp ./run_migration_and_start.sh    ./back/app/run_migration_and_start.sh
#cp ../docker-compose.yml ./back/app/docker-compose.yml


sudo docker compose up -d
# sudo docker build -f ./back/Dockerfile  ./back -t back_img
# # run back
# sudo docker run -d -p 3000:3000 --name back back_img

# echo $(sudo docker container ps -a)

# sudo docker network connect back_db back
##sudo #docker network connect front_back back


