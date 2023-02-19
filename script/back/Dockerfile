FROM node:18 as build

ADD app /home/node/app
WORKDIR /home/node/app

RUN npx -y json -I -f /home/node/app/package.json -e 'delete this.scripts.postinstall'

RUN cd /home/node/app && yarn install --frozen-lockfile


COPY . .

RUN yarn run prisma generate 
# RUN npx run build




FROM node:18-slim
RUN apt update && apt install libssl-dev dumb-init -y --no-install-recommends
WORKDIR /home/node/app
# COPY --chown=node:node --from=build /home/node/app/dist ./dist
COPY --chown=node:node --from=build /home/node/app .
COPY --chown=node:node --from=build /home/node/app/.env .env
COPY --chown=node:node --from=build /home/node/app/package.json .
COPY --chown=node:node --from=build /home/node/app/run_migration_and_start.sh .
# COPY --chown=node:node --from=build /home/node/app/package-lock.json .
RUN yarn install --omit=dev
COPY --chown=node:node --from=build /home/node/app/node_modules/.prisma/client  ./node_modules/.prisma/client





# ENV NODE_ENV development
# # ENV NODE_ENV="development"
# ENV PORT=3000

# ENV DEBUG "true"
# ENV DEBUG_GUARDS="true"

# ENV ADMIN_EMAIL="admin@example.com"
# ENV ADMIN_PASSWORD="$2a$10$kSbH1fEQwsxsNh1Bru9mi.lVue6S7IASPHlOYlo1VxuEnQyFRY00y"
# ENV ADMIN_PSEUDO="admin_pseudo"
# ENV ADMIN_ROLE_ID=3
# ENV POSTGRES_PASSWORD prisma_mdp
# ENV JWT_EXPIRE=3600
# ENV JWT_SECRET="JBHIVE-SECRET-875-!?"   
# ENV DATABASE_URL="postgresql://prisma_user:prisma_mdp@postgres:5432/prisma?schema=public"
# RUN yarn run prisma migrate dev 
EXPOSE 3000

# RUN yarn run prisma migrate dev 

# CMD sh ../wait-for-postgres.sh postgres prisma_user npx prisma migrate deploy && npx prisma db seed --preview-feature

#CMD [ "yarn", "run", "start" ]
# ENTRYPOINT [ "node", "main.js" ]
CMD [ "sh", "run_migration_and_start.sh" ]

# CMD [  "npm", "run", "start:prod" ]
