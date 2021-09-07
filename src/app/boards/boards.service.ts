import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  public getAllBoards(): Board[] {
    return this.boards;
  }
}
