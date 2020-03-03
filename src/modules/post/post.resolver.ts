import { Mutation, Args, Resolver, Query } from "@nestjs/graphql";
import { PostModel } from "./post.model";
import { PostService } from "./post.service";

@Resolver(() => PostModel)
export class PostResolver {

  constructor(
    private readonly postService: PostService,
  ) {}

  @Query(() => PostModel)
  async findAll(): Promise<PostModel[]> {
    return await this.postService.findAll();
  }

  @Mutation(() => PostModel)
  async likePost(@Args('post_id') postId: string, @Args('user_id') userId: string) {
    this.postService.addLike(postId, userId);
  }
}
