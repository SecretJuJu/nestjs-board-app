import { Test, TestingModule } from '@nestjs/testing';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.model';

import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

describe('board service test', () => {
  let boardsService: BoardsService;
  let createdBoardId: string;
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
      createdBoardId = createdBoard.id;
      expect(typeof createdBoard.id).toEqual('string');
    });
  });
  describe('create board 후 다시 get boards', () => {
    it('get board by id', async () => {
      const board: Board = boardsService.getBoardById(createdBoardId);
      expect(!!board).toBeTruthy();
    });
    it('get board by strange id', async () => {
      const board: Board = boardsService.getBoardById('dummy id');
      expect(!!board).toBeFalsy();
    });
    it('get all boards', async () => {
      const boards: Board[] = boardsService.getAllBoards();
      expect(boards.length).toEqual(1);
    });
  });

  describe('update board status', () => {
    it('정상적인 board update status', () => {
      const updatedBoard: Board = boardsService.updateBoardStatus(
        createdBoardId,
        BoardStatus.PRIVATE,
      );

      expect(updatedBoard.status).toEqual(BoardStatus.PRIVATE);
    });
  });

  describe('delete board', () => {
    it('board delete', async () => {
      const deleteResult = boardsService.deleteBoard(createdBoardId);
      expect(deleteResult);
    });
    it('없는 id로 board delete', async () => {
      const deleteResult: boolean = boardsService.deleteBoard('dummy id');
      expect(!deleteResult);
    });
  });
});
