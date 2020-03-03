import { InputType, Field } from "type-graphql";

@InputType()
export class LikeInput {

  @Field({ nullable: false })
  postId: string;

  @Field({ nullable: false })
  userId: string;
}
