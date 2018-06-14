#!/bin/sh

echo "Waiting for postgres"
until node_modules/.bin/knex migrate:currentVersion &> /dev/null
do
  printf "."
  sleep 1
done

echo -e "\npostgres ready"
