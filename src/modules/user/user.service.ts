import { Injectable } from "@nestjs/common";
import { UserModel } from "./user.model";
import admin = require("firebase-admin");

@Injectable()
export class UserService {

  async getById(id: string): Promise<UserModel> {
    try {
      const { displayName, uid, email, photoURL } = await admin.auth().getUser(id);

      return {
        id: uid,
        displayName,
        email,
        photoUrl: photoURL
      };
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        return {};
      }

      throw error;
    }
  }
}
