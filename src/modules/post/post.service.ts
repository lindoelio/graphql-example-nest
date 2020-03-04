import { Injectable } from "@nestjs/common";
import { PostModel } from "./post.model";
import { LikeModel } from "./like.model";
import * as admin from "firebase-admin";

@Injectable()
export class PostService {

  private readonly postsRef = admin.firestore().collection('posts');

  async create(post: PostModel): Promise<PostModel> {
    try {
      const { id } = await this.postsRef.add(post);

      return { ...post, id };
    } catch (error) {
      throw error;
    }
  }

  async list(): Promise<PostModel[]> {
    try {
      const posts: PostModel[] = []

      const postDocs = await this.postsRef.get();

      postDocs.forEach(async postDoc => {
        const post: PostModel = postDoc.data() as PostModel;

        posts.push({ id: postDoc.id, ...post });
      });

      return posts;
    } catch (error) {
      throw error;
    }
  }

  async find(userId: string): Promise<PostModel[]> {
    try {
      const posts: PostModel[] = []

      const postDocs = await this.postsRef.where('userId', '==', userId).get()

      postDocs.forEach(async postDoc => {
        const post: PostModel = postDoc.data() as PostModel;

        posts.push({ ...post, id: postDoc.id });
      });

      return posts;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string): Promise<PostModel> {
    try {
      const postDoc = await this.postsRef.doc(id).get()

      const post: PostModel = { id, ...(postDoc.data() as PostModel) };

      return post;
    } catch (error) {
      throw error;
    }
  }

  async addLike(like: LikeModel): Promise<LikeModel> {
    try {
      await this.postsRef.doc(like.postId).update({
        likes: admin.firestore.FieldValue.arrayUnion(like)
      });

      return like
    } catch (error) {
      throw error;
    }
  }
}
