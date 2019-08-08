#!/bin/sh

rm -r node_modules
yarn global add gitbook-cli
yarn install
wget -qO- "https://github.com/dustinblackman/phantomized/releases/download/2.1.1a/dockerized-phantomjs.tar.gz" | tar xz -C / \
    && npm config set user 0 \
    && npm install -g phantomjs-prebuilt
apk add --update ttf-dejavu ttf-droid ttf-freefont ttf-liberation ttf-ubuntu-font-family && rm -rf /var/cache/apk/*
