FROM node:lts-alpine

RUN apk --no-cache add curl

WORKDIR /app

COPY package.json package.json
RUN npm install

COPY good_corner.sqlite good_corner.sqlite
COPY tsconfig.json tsconfig.json
COPY src src

CMD npm start