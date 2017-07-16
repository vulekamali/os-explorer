FROM node:7-alpine

WORKDIR /app
ADD . .

RUN apk --no-cache --update add \
  autoconf \
  automake \
  build-base \
  nasm \
  libpng-dev \
  git 

RUN update-ca-certificates

RUN npm install && npm run build

RUN rm -rf /var/cache/apk/*

EXPOSE 8000

CMD /app/docker/startup.sh
