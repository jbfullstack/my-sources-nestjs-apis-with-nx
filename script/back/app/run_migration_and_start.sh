#!/bin/sh
# run_migration_and_start.sh

npx prisma migrate deploy

yarn run start:prod