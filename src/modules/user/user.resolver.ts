import { Resolver, Query, ResolveProperty, Parent, Args } from "@nestjs/graphql";
import { UserModel } from "./user.model";
import { UserService } from "./user.service";
import { PostService } from "../post/post.service";
import { PostModel } from "../post/post.model";

@Resolver(() => UserModel)
export class UserResolver {

  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Query(() => UserModel)
  async getUserById(@Args('id') id: string): Promise<UserModel> {
    return await this.userService.getById(id);
  }

  @ResolveProperty(() => [PostModel])
  async getPosts(@Parent() user: UserModel): Promise<PostModel[]> {
    return await this.postService.find(user.id);
  }
}
