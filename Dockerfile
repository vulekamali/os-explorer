FROM node:8-alpine

WORKDIR /app

RUN apk --no-cache --update add \
  autoconf \
  automake \
  build-base \
  nasm \
  libpng-dev \
  git 

RUN update-ca-certificates

ADD . .

ENV OS_SNIPPETS_GA=UA-33874954-42

RUN npm install && npm run build

EXPOSE 8000

CMD npm start
