import { Field, ObjectType, ID } from "type-graphql";

@ObjectType()
export class LikeModel {

  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: false })
  postId: string;

  @Field({ nullable: false })
  userId: string;
}
