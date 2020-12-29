FROM node:14.15.3

WORKDIR /usr/src/pma

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]