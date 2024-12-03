# syntax = docker/dockerfile:1.2

FROM node:20.17.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "src/index.js"]
