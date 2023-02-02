# syntax=docker/dockerfile:1

FROM node:bullseye-slim
ENV NODE_ENV=development

WORKDIR /app

COPY ["./package.json", "./package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]