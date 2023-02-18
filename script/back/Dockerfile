FROM node:alpine

ENV NODE_ENV="development"
ENV PORT=3000

ENV DEBUG="true"
ENV DEBUG_GUARDS="true"

ENV ADMIN_EMAIL="admin@example.com"
ENV ADMIN_PASSWORD="$2a$10$kSbH1fEQwsxsNh1Bru9mi.lVue6S7IASPHlOYlo1VxuEnQyFRY00y"
ENV ADMIN_PSEUDO="admin_pseudo"
ENV ADMIN_ROLE_ID=3
ENV JWT_EXPIRE=3600
ENV JWT_SECRET="JBHIVE-SECRET-875-!?"   
ENV DATABASE_URL="postgresql://prisma_user:prisma_mdp@localhost:5432/prisma?schema=public"



ADD app /home/node/app
WORKDIR /home/node/app

RUN npx -y json -I -f /home/node/app/package.json -e 'delete this.scripts.postinstall'

RUN cd /home/node/app && yarn install --frozen-lockfile


RUN yarn run prisma generate 

EXPOSE 3000

ENTRYPOINT [ "node", "main.js" ]