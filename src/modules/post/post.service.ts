import { Injectable } from "@nestjs/common";
import { PostModel } from "./post.model";
import { LikeModel } from "./like.model";

@Injectable()
export class PostService {

  private readonly posts: PostModel[] = [];

  async create(post: PostModel): Promise<void> {
    this.posts.push(post);
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
