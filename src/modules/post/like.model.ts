import { Field, ObjectType } from "type-graphql";
import { UserModel } from "../user/user.model";

@ObjectType()
export class LikeModel {

  @Field({ nullable: true })
  postId?: string;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;
}
