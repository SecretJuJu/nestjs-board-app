import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  private boards = [];

  public getAllBoards() {
    return this.boards;
  }
}
