#!/bin/sh

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
cd ../
tar -czvf dist.tar.gz dist