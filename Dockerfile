FROM node:10.5.0-alpine

WORKDIR /usr/src/app

EXPOSE 46140

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn

COPY . .

CMD ["./start.sh"]
