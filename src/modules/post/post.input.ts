import { InputType, Field } from "type-graphql";

@InputType()
export class PostInput {

  @Field()
  description: string;

  @Field()
  imageUrl: string;

  @Field()
  userId: string;
}
