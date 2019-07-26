#!/usr/bin/env bash

### Requires 1 args
if [ "$#" -ne 1 ]; then
  echo "Usage: ci_start.sh <Config file path>"
  exit 1
fi
FILE=$1
ENV=default

### Check config file
if [ ! -f $FILE ]; then
  echo "File does not exists: $FILE"
  exit 1
fi

### Copy config file
echo "Using file: $FILE"
cp -f $FILE ./env/$ENV.env.yml

### Start
npm ci
npm run start

# Make directory writable by group
chmod -R g+w .
