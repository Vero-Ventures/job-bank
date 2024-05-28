FROM node:alpine

WORKDIR /job-bank

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]