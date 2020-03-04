import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LikeModel {

  @Field({ nullable: true })
  postId?: string;

  @Field({ nullable: true })
  userId?: string;
}
