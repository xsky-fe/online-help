FROM node:latest
WORKDIR /code
COPY . /code
RUN yarn install && yarn global add gitbook-cli --registry https://registry.npm.taobao.org/
EXPOSE 8056
CMD chmod +x build-book.sh && ./build-book.sh
