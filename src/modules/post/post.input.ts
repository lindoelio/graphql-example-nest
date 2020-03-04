import { InputType, Field } from "type-graphql";

@InputType()
export class PostInput {

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  userId?: string;
}
