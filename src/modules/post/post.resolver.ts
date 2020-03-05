import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";

import * as firebase from "firebase-admin";

import PubSub from 'graphql-firestore-subscriptions';

import { LikeInput } from "./like.input";
import { LikeModel } from "./like.model";
import { PostInput } from "./post.input";
import { PostModel } from "./post.model";
import { PostService } from "./post.service";
import { PostTopic } from "./post.topic";

@Resolver(() => PostModel)
export class PostResolver {

  private readonly pubSub: PubSub;

  constructor(private readonly postService: PostService) {
    this.pubSub = new PubSub();

    this.pubSub.registerHandler(PostTopic.CREATED, broadcast =>
      firebase.firestore().collection('posts').onSnapshot(snapshot => {
        snapshot
          .docChanges()
          .filter(change => change.type === 'added')
          .map(item => broadcast({ ...item.doc.data(), id: item.doc.id}));
      })
    );

    this.pubSub.registerHandler(PostTopic.UPDATED, broadcast =>
      firebase.firestore().collection('posts').onSnapshot(snapshot => {
        snapshot
          .docChanges()
          .filter(change => change.type === 'modified')
          .map(item => broadcast({ ...item.doc.data(), id: item.doc.id}));
      })
    );
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
      user: { id: userId }
    };

    const post: PostModel = await this.postService.create(newPost);

    return post;
  }

  @Mutation(() => LikeModel)
  async likePost(@Args('input') input: LikeInput): Promise<LikeModel> {
    const { postId, userId } = input;

    const newLike: LikeModel = {
      postId,
      user: { id: userId }
    };

    const like: LikeModel = await this.postService.addLike(newLike);

    return like;
  }

  @Subscription(() => PostModel, {
    resolve: (payload) => {
      return payload;
    }
  })
  postCreated() {
    return this.pubSub.asyncIterator(PostTopic.CREATED);
  }

  @Subscription(() => PostModel, {
    resolve: (payload) => {
      return payload;
    }
  })
  postUpdated() {
    return this.pubSub.asyncIterator(PostTopic.UPDATED);
  }
}