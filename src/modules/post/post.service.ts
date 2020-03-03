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

  async addLike(postId: string, userId: string): Promise<void> {
    const like: LikeModel = {
      id: null,
      postId,
      userId
    };

    this.posts.find(post => post.id === postId).likes.push(like);
  }
}
