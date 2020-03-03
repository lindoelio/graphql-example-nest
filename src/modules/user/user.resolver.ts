import { Resolver, Query, ResolveProperty, Parent } from "@nestjs/graphql";
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
  async findAll(): Promise<UserModel[]> {
    return await this.userService.findAll();
  }

  @ResolveProperty(() => [PostModel])
  async getPosts(@Parent() author: UserModel): Promise<PostModel[]> {
    return await this.postService.findAll(author.id);
  }
}
