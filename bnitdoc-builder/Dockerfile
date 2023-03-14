# syntax=docker/dockerfile:1

FROM node:bullseye-slim
ENV NODE_ENV=production

RUN apt-get update && apt-get install -y python3

WORKDIR /app

COPY ["./package.json", "./package-lock.json*", "./"]

RUN npm install

COPY docs docs
COPY spaces spaces
COPY src src
COPY static static
COPY babel.config.js .
COPY docusaurus.config.js .
COPY plugins.js .
COPY sidebars.js .
COPY space.js .
COPY config.js .
COPY main.py .
COPY cmd.py .

EXPOSE 3000
CMD [ "python3", "-u", "main.py" ]