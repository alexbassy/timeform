#!/bin/sh

if [ $ENV = "production" ]
then
    npm run start
else
    yarn dev
fi
