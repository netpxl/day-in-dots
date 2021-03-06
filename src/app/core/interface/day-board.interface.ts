import { DotInterface } from './dot.interface';

export interface DayBoardInterface {
  id: string,
  hours: Array<number>
  slots: Array<number>
  date: string
  board: DotInterface[][]
}
