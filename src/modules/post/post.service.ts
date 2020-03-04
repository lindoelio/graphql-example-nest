import { Injectable } from "@nestjs/common";
import { PostModel } from "./post.model";
import { LikeModel } from "./like.model";
import * as admin from "firebase-admin";

@Injectable()
export class PostService {

  private readonly posts: PostModel[] = [];

  async create(post: PostModel): Promise<PostModel> {
    this.posts.push(post);

    const { id } = await admin.firestore().collection('posts').add(post);

    post.id = id;

    return post;
  }

  async findAll(authorId?: string): Promise<PostModel[]> {
    if (authorId) {
      return this.posts.filter(post => post.id === authorId);
    }

    return this.posts;
  }

  async addLike(like: LikeModel): Promise<void> {

    const likes: LikeModel[] = this.posts.find(post => post.id === like.postId).likes

    this.posts.find(post => post.id === like.postId).likes.push(...likes, like);
  }
}
