import { DotInterface } from "./dot.interface"

export interface DayBoardInterface {
    hours: Array<number>
    slots: Array<number>
    date: string
    board: Array<Array<DotInterface>>
}