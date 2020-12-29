FROM node:14.15.3

WORKDIR /usr/src/pma

COPY ./package.json ./

RUN npm install

COPY . .

ENV REACT_APP_BASE_URL=http://localhost:3000/api

EXPOSE 8080

CMD ["npm", "start"]