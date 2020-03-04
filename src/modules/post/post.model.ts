
import { Field, ObjectType, ID } from 'type-graphql';
import { LikeModel } from './like.model';

@ObjectType()
export class PostModel {

  @Field(() => ID, { nullable: true})
  id?: string;

  @Field({ nullable: true})
  description?: string;

  @Field({ nullable: true})
  imageUrl?: string;

  @Field({ nullable: true})
  userId?: string;

  @Field(() => [LikeModel], { nullable: true})
  likes?: LikeModel[];
}

@ObjectType()
export class PostModelSubscribed {
  @Field(() => PostModel, { nullable: true })
  value?: PostModel
}
