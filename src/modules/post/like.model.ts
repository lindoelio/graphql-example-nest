import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LikeModel {

  @Field({ nullable: false })
  postId: string;

  @Field({ nullable: false })
  userId: string;
}
