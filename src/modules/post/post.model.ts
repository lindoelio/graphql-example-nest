
import { Field, ObjectType, ID } from 'type-graphql';
import { LikeModel } from './like.model';
import { UserModel } from '../user/user.model';

@ObjectType()
export class PostModel {

  @Field(() => ID, { nullable: true})
  id?: string;

  @Field({ nullable: true})
  description?: string;

  @Field({ nullable: true})
  imageUrl?: string;

  @Field(() => UserModel, { nullable: true})
  user?: UserModel;

  @Field(() => [LikeModel], { nullable: true})
  likes?: LikeModel[];
}
