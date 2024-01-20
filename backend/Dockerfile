FROM node:20.6.0-alpine

RUN export PATH=$PATH:/usr/local/bin

WORKDIR /usr/src/app

RUN npm cache clean --force

# RUN npm install

# RUN apk add --no-cache postgresql-client && \
#     psql -U postgres -d facilita_challenge -a -f migrations/create_tables.sql

EXPOSE 5000

CMD ["npm", "start"]