#!/bin/sh

node server/download.js
cd ./online-help-cn
gitbook install
gitbook build ./ ../dist/_book_zh-cn
cd ../online-help-en
gitbook install
gitbook build ./ ../dist/_book_en
cd ../
tar -czvf dist.tar.gz dist