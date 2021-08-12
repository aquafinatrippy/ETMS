FROM node:latest

RUN mkdir -p /usr/src/index
RUN mkdir -p /usr/src/index/server

WORKDIR /usr/src/index/server

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "startDev"]
