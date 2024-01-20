FROM node:20.6.0-alpine

WORKDIR /usr/src/app

COPY backend/package*.json ./

RUN npm install

COPY backend/ .

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]