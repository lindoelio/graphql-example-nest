import { Resolver, Query, ResolveProperty, Parent } from "@nestjs/graphql";
import { Author } from "./author.model";
import { AuthorService } from "./author.service";
import { PostService } from "../post/post.service";
import { Post } from "../post/post.model";

@Resolver(() => Author)
export class AuthorResolver {
  constructor(
    private readonly authorsService: AuthorService,
    private readonly postsService: PostService,
  ) {}

  @Query(() => Author)
  async findAll(): Promise<Author[]> {
    return await this.authorsService.findAll();
  }

  @ResolveProperty()
  async getPosts(@Parent() author: Author): Promise<Post[]> {
    return await this.postsService.findAll(author.id);
  }
}