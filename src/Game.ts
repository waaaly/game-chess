import {PieceType} from "./Piece";
import {InitPieceType} from "./Board";

export type Position = [number, number]
export type ObserverType = ((BoardPieceTypes: PieceType[]) => void) | null
const InitPosition: Position[] = [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
    [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
    [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2],
    [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
    [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4],
    [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5],
    [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6],
    [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7],
]

export class Game {
    public curPieceId: number = 0
    public curPieceType: PieceType = PieceType.Default
    public piecePos: Position[] = InitPosition
    public BoardPieceTypes: PieceType[] = InitPieceType
    private observers: ObserverType [] = []

    public setCurPiece = (id: number, type: PieceType) => {
        this.curPieceId = id
        this.curPieceType = type
    }

    public observe(o: ObserverType): () => void {
        this.observers.push(o)
        // this.emitChange()

        return (): void => {
            this.observers = this.observers.filter((t) => t !== o)
        }
    }

    public move(toX: number, toY: number): void {
        this.BoardPieceTypes[toX + toY * 8] = this.curPieceType
        this.BoardPieceTypes[this.curPieceId] = PieceType.Default
        this.emitChange()
    }


    public canMove(toX: number, toY: number): boolean {
        const [x, y] = this.piecePos[this.curPieceId]
        const dx = toX - x
        const dy = toY - y
        const checkRule = () => {
            switch (this.curPieceType) {
                case PieceType.BP:
                    if (y === 1) {
                        return (
                            (dx === 0 && (dy === 1 || dy === 2)) ||
                            (Math.abs(dx) === 1 && Math.abs(dy) === 1)
                        )
                    } else {
                        return (
                            (dx === 0 && dy === 1) ||
                            (Math.abs(dx) === 1 && Math.abs(dy) === 1)
                        )
                    }
                case PieceType.WP:
                    if (y === 6) {
                        return (
                            (dx === 0 && (dy === -1 || dy === -2)) ||
                            (Math.abs(dx) === 1 && Math.abs(dy) === 1)
                        )
                    } else {
                        return (
                            (dx === 0 && dy === -1) ||
                            (Math.abs(dx) === 1 && Math.abs(dy) === 1)
                        )
                    }
                case PieceType.BR:
                case PieceType.WR:
                    return (Math.abs(dx) === 0 || Math.abs(dy) === 0)
                case PieceType.BN:
                case PieceType.WN:
                    return (
                        (Math.abs(dx) === 1 && Math.abs(dy) === 2) ||
                        (Math.abs(dx) === 2 && Math.abs(dy) === 1)
                    )
                case PieceType.BB:
                case PieceType.WB:
                    return (Math.abs(dx) === Math.abs(dy))
                case PieceType.BQ:
                case PieceType.WQ:
                    return (Math.abs(dx) === Math.abs(dy) || Math.abs(dx) === 0 || Math.abs(dy) === 0)
                default:
                    return false
            }
        }

        const isSelfPiece = (x: number, y: number) => {
            return (this.curPieceType.toString()[0] === this.BoardPieceTypes[x + y * 8].toString()[0])
        }

        const checkPathHasPiece = () => {
            if(this.curPieceType.toString().includes('P')){
                if(Math.abs(dx) === 1 && Math.abs(dy) === 1 ){
                    if(this.BoardPieceTypes[toX + toY * 8].toString()[0] !== 'D'){
                        return (this.curPieceType.toString()[0] !== this.BoardPieceTypes[toX + toY * 8].toString()[0] ) ? false : true
                    }else{
                        return  true
                    }
                }else{
                    return false
                }
            }

            if (this.curPieceType.toString().includes('K') ||
                (Math.abs(dx) === 1 && Math.abs(dy) === 0) ||
                (Math.abs(dx) === 0 && Math.abs(dy) === 1) ||
                (Math.abs(dx) === 1 && Math.abs(dy) === 1)) {
                return false
            }

            if (dx === 0) {
                let i = x, j = dy > 0 ? y + 1 : y - 1;
                while (j !== toY) {
                    if (this.BoardPieceTypes[i + j * 8] !== PieceType.Default) {
                        return true
                    }
                    j = dy > 0 ? j + 1 : j - 1
                }
            }
            if (dy === 0) {
                let i = dx > 0 ? x + 1 : x - 1, j = y;
                while (i !== toX) {
                    if (this.BoardPieceTypes[i + j * 8] !== PieceType.Default) {
                        return true
                    }
                    i = dx > 0 ? i + 1 : i - 1
                }
            }
            if(Math.abs(dx) === Math.abs(dy)){
                let i = dx > 0 ? x + 1 : x - 1, j = dy > 0 ? y + 1 : y - 1;
                while (i !== toX && j !== toY) {
                    if (this.BoardPieceTypes[i + j * 8] !== PieceType.Default) {
                        return true
                    }
                    i = dx > 0 ? i + 1 : i - 1
                    j = dy > 0 ? j + 1 : j - 1
                }
            }
        }
        return checkRule() && !isSelfPiece(toX, toY) && !checkPathHasPiece()
    }

    private emitChange() {
        let types = this.BoardPieceTypes
        this.observers.forEach((o) => o && o([...types]))
    }
}
