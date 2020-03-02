import { InputType, Field } from "type-graphql";

@InputType()
export class PostInput {

  @Field()
  description: string;

  @Field()
  photoUrl: string;

  @Field()
  authorId: string;
}
