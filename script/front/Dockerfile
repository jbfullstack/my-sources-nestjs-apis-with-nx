# FROM node:18 as front_build

# ADD app/my-sources /home/node/app
# WORKDIR /home/node/app

# RUN npx -y json -I -f /home/node/app/package.json -e 'delete this.scripts.postinstall'

# RUN cd /home/node/app && yarn install --frozen-lockfile
# RUN yarn add @angular/cli 

# COPY . .

# # # # RUN yarn run prisma generate 
# # # # RUN nx build --prod




# # FROM nginx:latest as ngi
# # #RUN apt update && apt install libssl-dev dumb-init -y --no-install-recommends
# # # WORKDIR /home/node/app

# # COPY --from=front_build /home/node/app/my-sources /usr/share/nginx/html

# # # COPY . /usr/share/nginx/html
# # COPY /nginx.conf  /etc/nginx/conf.d/default.conf

# # # EXPOSE 80
# # # # CMD [ "node", "main" ]


# # FROM node:18 

# # RUN mkdir /usr/src/app  
# # WORKDIR /usr/src/app

# # RUN yarn add @angular/cli 

# # COPY . . 

# # COPY /nginx.conf  /etc/nginx/conf.d/default.conf
# # COPY nginx.conf /etc/nginx/nginx.conf
# # COPY --from=front_build /home/node/app/my-sources /usr/share/nginx/html
# # USER nginx

# # FROM node:latest as build-stage
# # WORKDIR /app
# # COPY package*.json ./
# # RUN yarn install
# # COPY ./ .

# # FROM nginx:latest
# # RUN mkdir /app
# # COPY --from=build-stage /app/    .
# # COPY . /usr/share/nginx/html/
# # COPY nginx.conf /etc/nginx/nginx.conf
# # USER nginx



# # FROM nginx:latest as ngi

# FROM node:18 
# ADD app /home/node/app
# WORKDIR /home/node/app



# # COPY . /usr/share/nginx/html
# RUN ls
# COPY . /usr/share/nginx/html
# COPY /nginx.conf  /etc/nginx/conf.d/default.conf

# RUN npx -y json -I -f /home/node/app/package.json -e 'delete this.scripts.postinstall'

# # RUN cd /home/node/app && yarn install --frozen-lockfile
# RUN yarn add @angular/cli 
# RUN cd /home/node/app && yarn install --frozen-lockfile
# CMD [ "ng" ]

# Fetch nginx image to host application
FROM nginx:mainline-alpine

# ADD app /home/node/app
WORKDIR /usr/share/nginx/html

RUN rm *

# COPY --from=front_build /home/node/app/app/my-sources .
COPY /app/my-sources .

# Copy nginx configuration and build application inside the final container
COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY . /usr/share/nginx/html