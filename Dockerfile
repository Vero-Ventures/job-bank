FROM node:alpine

WORKDIR /src/server

COPY . /src/server/

RUN npm install

RUN npm install -ws

CMD ["npm", "run", "-w", "services", "start"]