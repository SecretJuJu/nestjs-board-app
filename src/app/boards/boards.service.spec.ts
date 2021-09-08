import { Test, TestingModule } from '@nestjs/testing';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.model';

import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

describe('board service test', () => {
  let boardsService: BoardsService;
  let updateTargetId: string;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardsService],
    }).compile();

    boardsService = module.get<BoardsService>(BoardsService);
  });
  it('get all boards', async () => {
    const boards: Board[] = boardsService.getAllBoards();
    expect(boards.length).toEqual(0);
  });
  describe('create board', () => {
    it('정상적인 board 만들기', async () => {
      const newBoard: CreateBoardDto = {
        title: '1 번째 게시물',
        description: '1번째 게시물의 description',
      };
      const createdBoard: Board = boardsService.createBoard(newBoard);
      updateTargetId = createdBoard.id;
      expect(typeof createdBoard.id).toEqual('string');
    });
  });
  describe('create board 후 다시 get all boards', () => {
    it('get all boards', async () => {
      const boards: Board[] = boardsService.getAllBoards();
      expect(boards.length).toEqual(1);
    });
  });

  describe('update board status', () => {
    it('정상적인 board update status', () => {
      const updatedBoard: Board = boardsService.updateBoardStatus(
        updateTargetId,
        BoardStatus.PRIVATE,
      );

      console.log(updatedBoard);
      expect(updatedBoard.status).toEqual(BoardStatus.PRIVATE);
    });
  });
});
