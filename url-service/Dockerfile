FROM node:22.17.0-alpine

RUN apk update && apk upgrade

WORKDIR /app

COPY package*.json ./
COPY .npmrc ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]

EXPOSE 3002