
import { Field, ObjectType, ID } from 'type-graphql';
import { PostModel } from '../post/post.model';

@ObjectType()
export class UserModel {

  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  photoUrl?: string;

  @Field({ nullable: true })
  email?: string;

  @Field(() => [PostModel], { nullable: true })
  posts?: PostModel[];
}