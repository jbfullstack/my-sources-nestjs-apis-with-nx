#!/bin/bash

# clean containers
sudo docker stop front
sudo docker rm -f front

### FRONT
cd ../
rm -rf front/app
yarn run nx run my-sources:build
cd script
cp -r ../dist/apps/my-sources ./front/app
cp ../package.json ./front/app/package.json
cp ../yarn.lock ./front/app/yarn.lock


# sudo docker compose up -d


