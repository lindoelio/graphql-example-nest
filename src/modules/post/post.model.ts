
import { Field, ObjectType, ID } from 'type-graphql';
import { LikeModel } from './like.model';

@ObjectType()
export class PostModel {

  @Field(() => ID, { nullable: true})
  id?: string;

  @Field({ nullable: true})
  description?: string;

  @Field({ nullable: false})
  imageUrl?: string;

  @Field({ nullable: false})
  userId?: string;

  @Field(() => [LikeModel], { nullable: true})
  likes?: LikeModel[];
}
