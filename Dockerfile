FROM node:16.15-alpine3.14

RUN mkdir -p /home/app
WORKDIR /home/app

COPY . .

RUN npm install

EXPOSE 8000

CMD ["npm", "start"]
