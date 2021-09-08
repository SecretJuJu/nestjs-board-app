import { BoardStatus } from './board-status.enum';

export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
}
