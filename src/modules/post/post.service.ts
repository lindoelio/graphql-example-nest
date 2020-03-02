import { Injectable } from "@nestjs/common";
import { Post } from "./post.model";
import { Like } from "./like.model";

@Injectable()
export class PostService {

  private readonly posts: Post[] = [];

  async create(post: Post): Promise<void> {
    this.posts.push(post);
  }

  async findAll(authorId?: string): Promise<Post[]> {
    if (authorId) {
      return this.posts.filter(post => post.id === authorId);
    }

    return this.posts;
  }

  async addLike(postId: string, userId: string): Promise<void> {
    const like: Like = {
      postId,
      userId
    };

    this.posts.find(post => post.id === postId).likes.push(like);
  }
}
