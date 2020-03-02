import { Mutation, Args, Resolver, Query } from "@nestjs/graphql";
import { Post } from "./post.model";
import { PostService } from "./post.service";

@Resolver(() => Post)
export class PostResolver {

  constructor(
    private readonly postService: PostService,
  ) {}

  @Query(() => Post)
  async findAll(): Promise<Post[]> {
    return await this.postService.findAll();
  }

  @Mutation(() => Post)
  async likePost(@Args('post_id') postId: string, @Args('user_id') userId: string) {
    this.postService.addLike(postId, userId);
  }
}
