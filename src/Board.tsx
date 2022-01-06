import React, {CSSProperties, FC, useEffect, useState} from 'react'
import BoardSquare from './BoardSquare'
import {Game} from './Game'
import {Piece, PieceImg, PieceRender, PieceType} from './Piece'

export interface BoardProps {
    game: Game
}

/** Styling properties applied to the board element */
const boardStyle: CSSProperties = {
    // width: '1PieceType.DefaultPieceType.Default%',
    // height: '1PieceType.DefaultPieceType.Default%',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
}
/** Styling properties applied to each square element */
const squareStyle: CSSProperties = {width: '12.5%', height: '12.5%'}
export const InitPieceType = [
    PieceType.BR, PieceType.BN, PieceType.BB, PieceType.BQ, PieceType.BK, PieceType.BB, PieceType.BN, PieceType.BR,
    PieceType.BP, PieceType.BP, PieceType.BP, PieceType.BP, PieceType.BP, PieceType.BP, PieceType.BP, PieceType.BP,
    PieceType.Default, PieceType.Default, PieceType.Default, PieceType.Default, PieceType.Default, PieceType.Default, PieceType.Default, PieceType.Default,
    PieceType.Default, PieceType.Default, PieceType.Default, PieceType.Default, PieceType.Default, PieceType.Default, PieceType.Default, PieceType.Default,
    PieceType.Default, PieceType.Default, PieceType.Default, PieceType.Default, PieceType.Default, PieceType.Default, PieceType.Default, PieceType.Default,
    PieceType.Default, PieceType.Default, PieceType.Default, PieceType.Default, PieceType.Default, PieceType.Default, PieceType.Default, PieceType.Default,
    PieceType.WP, PieceType.WP, PieceType.WP, PieceType.WP, PieceType.WP, PieceType.WP, PieceType.WP, PieceType.WP,
    PieceType.WR, PieceType.WN, PieceType.WB, PieceType.WQ, PieceType.WK, PieceType.WB, PieceType.WN, PieceType.WR,]


/**
 * The chessboard component
 * @param props The react props
 */
export const Board: FC<BoardProps> = ({game}) => {

    const [pieceTypes,setPieceTypes] = useState<PieceType[]>(game.BoardPieceTypes)

    useEffect(() =>game.observe(setPieceTypes),[game])
    function renderSquare(p: Piece) {
        // eslint-disable-next-line
        let pieceProps: any = new Object({...p,...game})
        return (
            <div key={p.id} style={squareStyle}>
                <BoardSquare piece={p} game={game}>
                    <PieceRender {...pieceProps}/>
                </BoardSquare>
            </div>
        )
    }

    return <div style={boardStyle}>
        {
           pieceTypes.map((item,i)=>{
               let p: Piece = {id: i, type: pieceTypes[i], position: [i % 8, Math.floor(i / 8)], preImg:'',img:PieceImg[pieceTypes[i]]}
               return renderSquare(p)
           })
        }
    </div>
}

