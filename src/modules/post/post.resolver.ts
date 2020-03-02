import { Mutation, Args } from "@nestjs/graphql";
import { Post } from "./post.model";
import { PostService } from "./post.service";

export class PostResolver {

  constructor(
    private readonly postsService: PostService,
  ) {}

  @Mutation(() => Post)
  async likePost(@Args('post_id') postId: string, @Args('user_id') userId: string) {
    this.postsService.addLike(postId, userId);
  }
}
