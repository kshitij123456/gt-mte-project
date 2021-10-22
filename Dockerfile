FROM node:12-bullseye

WORKDIR /usr/src/app

EXPOSE 8080

EXPOSE 4200

COPY . .

RUN npm install

CMD ["npm", "start"]