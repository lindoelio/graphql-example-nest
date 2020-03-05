FROM node:12-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @nestjs/cli && npm install --only=production

COPY . ./

RUN npm run build

ENV GOOGLE_APPLICATION_CREDENTIALS=/usr/src/app/firebase-service-account.json

CMD [ "npm", "run", "start:prod" ]
