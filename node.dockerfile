FROM node:15.9.0-alpine

LABEL author="Jérémy Brunel"

ENV NODE_ENV=production
ENV PORT=3000

#WORKDIR /var/www
COPY    package.json ./

#RUN npm i --force
#RUN npm start

COPY dist/apps/api ./dist

RUN echo $(ls -1 ./dist)
RUN npm i -f
RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express
#RUN npm build

#CMD [ "npm", "start"]
#EXPOSE $PORT

CMD [ "node", "dist/main" ]
#ENTRYPOINT [ "npm", "run", "start",  "api" ]