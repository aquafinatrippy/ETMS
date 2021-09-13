FROM node:latest
# Add a work directory
WORKDIR /tmp
# Cache and Install dependencies
COPY package.json ./
RUN npm install

WORKDIR /home/client
# Copy app files

RUN cp /tmp/package.json ./package.json
RUN cp -r /tmp/node_modules ./node_modules
COPY tsconfig.json ./
COPY src src
COPY public /home/client/public
# TypeScript
#RUN npm run tsc
# Expose port
EXPOSE 7777
# Start the app
CMD [ "npm","run", "start" ]