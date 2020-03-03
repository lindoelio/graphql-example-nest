import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';

import { UserService } from './modules/user/user.service';
import { PostService } from './modules/post/post.service';

import { UserResolver } from './modules/user/user.resolver';
import { PostResolver } from './modules/post/post.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: './src/app.schema.gql',
      installSubscriptionHandlers: true
    })
  ],
  providers: [
    PostService,
    UserService,
    UserResolver,
    PostResolver
  ],
})
export class AppModule {}
