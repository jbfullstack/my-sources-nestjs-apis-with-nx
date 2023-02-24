#!/bin/bash
images=$(sudo docker image ls -aq)

# Clean sudo docker networks
##sudo docker network rm front_back
# sudo docker network rm back_db

# clean containers
sudo docker stop front
sudo docker stop back 
sudo docker stop postgres

sudo docker rm -f front
sudo docker rm -f back 
sudo docker rm -f -v postgres

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

### FRONT
cd ../
rm -rf front/app
yarn run nx run my-sources:build
cd script
cp -r ../dist/apps/my-sources ./front/app
cp ../package.json ./front/app/package.json
cp ../yarn.lock ./front/app/yarn.lock


sudo docker compose up -d


