import { Mutation, Args, Resolver, Query, Subscription } from "@nestjs/graphql";

import { PubSub } from 'graphql-subscriptions';

import { PostModel } from "./post.model";
import { PostService } from "./post.service";
import { PostInput } from "./post.input";
import { PostTopic } from "./post.topic";
import { LikeInput } from "./like.input";
import { LikeModel } from "./like.model";

@Resolver(() => PostModel)
export class PostResolver {

  private readonly pubSub: PubSub;

  constructor(private readonly postService: PostService) {
    this.pubSub = new PubSub();
  }

  @Query(() => PostModel)
  async findAll(): Promise<PostModel[]> {
    return await this.postService.findAll();
  }

  @Mutation(() => PostModel)
  async createPost(@Args('input') input: PostInput): Promise<PostModel> {
    const newPost: PostModel = {
      imageUrl: input.imageUrl,
      description: input.description,
      userId: input.userId
    }

    const post: PostModel = await this.postService.create(newPost);

    this.pubSub.publish(PostTopic.CREATED, post)

    return post
  }

  @Mutation(() => LikeModel)
  async likePost(@Args('input') input: LikeInput): Promise<LikeModel> {
    const newLike: LikeModel = {
      postId: input.postId,
      userId: input.userId
    }

    this.postService.addLike(newLike).then(() => {
      this.pubSub.publish(PostTopic.UPDATED, newLike)
    })

    return newLike
  }

  @Subscription(() => PostModel)
  postCreated() {
    return this.pubSub.asyncIterator(PostTopic.CREATED);
  }

  @Subscription(() => PostModel)
  postUpdated() {
    return this.pubSub.asyncIterator(PostTopic.UPDATED);
  }
}