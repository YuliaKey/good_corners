FROM node:lts-alpine

WORKDIR /app

COPY public public
COPY src src
COPY .next .next
COPY next-env.d.ts next-env.d.ts
COPY next.config.js next.config.js
COPY tsconfig.json tsconfig.json
COPY .eslintrc.json .eslintrc.json
COPY package.json package.json

RUN mkdir node_modules
RUN npm install

CMD npm run dev