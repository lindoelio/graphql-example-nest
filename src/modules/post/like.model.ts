import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Like {

  @Field()
  postId: string;

  @Field()
  userId: string;
}