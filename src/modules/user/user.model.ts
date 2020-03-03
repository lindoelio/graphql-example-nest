
import { Field, ObjectType, ID } from 'type-graphql';
import { PostModel } from '../post/post.model';

@ObjectType()
export class UserModel {

  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => [PostModel], { nullable: true })
  posts?: PostModel[];
}