#!/bin/sh

if [ $ENV = "production" ]
then
    npm run build-assets
    npm run start
else
    yarn watch-assets &
    yarn dev
fi
