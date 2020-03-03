import { Injectable } from "@nestjs/common";
import { UserModel } from "./user.model";

@Injectable()
export class UserService {

  private readonly authors: UserModel[] = [];

  async create(author: UserModel): Promise<void> {
    this.authors.push(author);
  }

  async findAll(): Promise<UserModel[]> {
    return this.authors;
  }
}
