import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GraphQLModule } from '@nestjs/graphql';
import { AuthorService } from './modules/author/author.service';
import { PostService } from './modules/post/post.service';
import { AuthorResolver } from './modules/author/author.resolver';
import { PostResolver } from './modules/post/post.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: './src/app.schema.gql'
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PostService,
    AuthorService, AuthorResolver, PostResolver
  ],
})
export class AppModule {}
