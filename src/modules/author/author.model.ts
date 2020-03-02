
import { Field, Int, ObjectType } from 'type-graphql';
import { Post } from '../post/post.model';

@ObjectType()
export class Author {
  @Field(() => Int)
  id: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => [Post])
  posts: Post[];
}