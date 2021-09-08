import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

import { Board } from './board.model';
import { BoardStatus } from './board-status.enum';
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
    console.log(id, status);
    const boardIndex: number = this.boards.findIndex((board: Board) => {
      return board.id === id;
    });

    this.boards[boardIndex].status = status;
    return this.boards[boardIndex];
  }
}
