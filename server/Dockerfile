FROM node:14.16.0-alpine3.10

WORKDIR /tmp
COPY package.json ./
RUN npm install

WORKDIR /home/node
RUN cp /tmp/package.json ./package.json
RUN cp -r /tmp/node_modules ./node_modules

COPY tsconfig.json ./
COPY tsoa.json ./
COPY types types
COPY src src

CMD ["npm", "run", "dockerDev"]