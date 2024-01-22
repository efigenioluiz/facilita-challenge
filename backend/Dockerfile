FROM node:20.6.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g --save-dev typescript

RUN npm install --save-dev @types/express @types/body-parser @types/pg

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start:docker"]