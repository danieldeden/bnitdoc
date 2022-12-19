# syntax=docker/dockerfile:1

FROM node:latest
ENV NODE_ENV=development

WORKDIR /app

COPY ["./package.json", "./package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]