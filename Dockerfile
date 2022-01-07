FROM node:16.13-alpine

WORKDIR /app

COPY package.json .

RUN npm i --no-optional

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]

