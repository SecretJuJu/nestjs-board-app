import { Injectable, NotFoundException } from '@nestjs/common';
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

  getBoardById(id: string): Board {
    const found = this.boards.find((board) => id === board.id);

    if (!found) {
      throw new NotFoundException();
    }

    return found;
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
    const boardIndex: number = this.boards.findIndex((board: Board) => {
      return board.id === id;
    });

    if (boardIndex === -1) {
      throw new NotFoundException();
    }

    try {
      this.boards[boardIndex].status = status;
      return this.boards[boardIndex];
    } catch (err) {
      return null;
    }
  }

  deleteBoard(id: string): boolean {
    const targetBoardIndex: number = this.boards.findIndex(
      (board) => board.id === id,
    );

    if (targetBoardIndex === -1) {
      throw new NotFoundException();
    }

    try {
      this.boards.splice(targetBoardIndex, 1);
      return true;
    } catch (err) {
      return false;
    }
  }
}
