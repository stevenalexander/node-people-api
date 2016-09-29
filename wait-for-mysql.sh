#!/bin/bash

echo "Waiting for mysql"
until node_modules/.bin/knex migrate:currentVersion &> /dev/null
do
  printf "."
  sleep 1
done

echo -e "\nmysql ready"