import { Injectable } from "@nestjs/common";
import { Author } from "./author.model";

@Injectable()
export class AuthorService {

  private readonly authors: Author[] = [];

  async create(author: Author): Promise<void> {
    this.authors.push(author);
  }

  async findAll(): Promise<Author[]> {
    return this.authors;
  }
}
