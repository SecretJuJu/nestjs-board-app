import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const { title, description } = createBoardDto;
    const newBoard: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(newBoard);
    return newBoard;
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const boardIndex = this.boards.findIndex((board: Board) => board.id === id);
    this.boards[boardIndex].status = status;
    return this.boards[boardIndex];
  }
}
