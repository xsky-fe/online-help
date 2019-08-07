#!/bin/sh

yarn global add gitbook-cli
yarn install --registry https://registry.npm.taobao.org/
cd ./online-help-cn
gitbook install
cd ../online-help-en
gitbook install
cd ../
node server/download.js
cd online-help-cn
gitbook build ./ ../dist/_book_zh-cn
cd ../online-help-en
gitbook build ./ ../dist/_book_en
