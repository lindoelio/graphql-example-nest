import { Injectable } from "@nestjs/common";
import { PostModel } from "./post.model";
import { LikeModel } from "./like.model";
import * as admin from "firebase-admin";
import { PostInput } from "./post.input";

@Injectable()
export class PostService {

  async create(post: PostModel): Promise<PostModel> {
    const { id } = await admin.firestore().collection('posts').add(post);

    post.id = id;

    return post;
  }

  async list(): Promise<PostModel[]> {
    return this.find(null);
  }

  async find(post: PostInput): Promise<PostModel[]> {
    console.log(post);

    const posts: PostModel[] = []

    try {
      const postsRef = admin.firestore().collection('posts');

      const postDocs = await postsRef.get();
      
      postDocs.forEach(postDoc => {
        const data = postDoc.data();

        posts.push({
          id: postDoc.id,
          imageUrl: data['imageUrl'],
          userId: data['userId']
        });
      });
    } catch (error) {
      console.log('Error getting posts', error);
    } finally {
      return posts;
    }
  }

  async addLike(like: LikeModel): Promise<PostModel> {
    return new PostModel()
  }
}
