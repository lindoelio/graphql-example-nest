
import { Field, Int, ObjectType } from 'type-graphql';
import { Like } from './like.model';

@ObjectType()
export class Post {

  @Field(() => Int)
  id: string;

  @Field()
  description: string;

  @Field()
  photoUrl: string;

  @Field(() => [Like])
  likes?: Like[];
}
