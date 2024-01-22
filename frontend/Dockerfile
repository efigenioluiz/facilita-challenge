FROM node:20.6.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install --save-dev react-scripts@5.0.1

COPY . .

EXPOSE 3000

CMD ["npm", "start"]