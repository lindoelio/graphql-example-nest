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

  @Query(() => [PostModel])
  async listPosts(): Promise<PostModel[]> {
    return await this.postService.list();
  }

  @Query(() => [PostModel])
  async findPosts(@Args('userId') userId: string): Promise<PostModel[]> {
    return await this.postService.find(userId);
  }

  @Mutation(() => PostModel)
  async createPost(@Args('input') input: PostInput): Promise<PostModel> {
    const { imageUrl, description, userId } = input;

    const newPost: PostModel = {
      imageUrl,
      description,
      userId
    };

    const post: PostModel = await this.postService.create(newPost);

    this.pubSub.publish(PostTopic.CREATED, post);

    return post;
  }

  @Mutation(() => LikeModel)
  async likePost(@Args('input') input: LikeInput): Promise<LikeModel> {
    const { postId, userId } = input;

    const newLike: LikeModel = {
      postId,
      userId
    };

    const like: LikeModel = await this.postService.addLike(newLike);

    const post = await this.postService.getById(like.postId);

    this.pubSub.publish(PostTopic.UPDATED, post);

    return newLike;
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