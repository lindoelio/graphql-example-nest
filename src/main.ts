import { NestFactory } from '@nestjs/core';
import * as firebase from 'firebase-admin';

import { AppModule } from './app.module';

async function bootstrap() {
  firebase.initializeApp({
    credential: firebase.credential.applicationDefault(),
    databaseURL: "https://graphql-banco-pan.firebaseio.com"
  });

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
