import React, {FC} from 'react'
import DragPiece from './DragPiece'
import {Game, Position} from './Game'
import {knightImage} from './knightImage'

/**
 * King Queen  Rook Bishop Knight Pawn
 * ♔ ♕ ♖ ♗ ♘ ♟
 * ♚ ♛ ♜ ♝ ♞ ♟
 */
export enum PieceType {
    BK = 'BlackKing',
    BQ = 'BlackQueen',
    BR = 'BlackRook',
    BB = 'BlackBishop',
    BN = 'BlackKnight',
    BP = 'BlackPawn',
    WK = 'WhiteKing',
    WQ = 'WhiteQueen',
    WR = 'WhiteRook',
    WB = 'WhiteBishop',
    WN = 'WhiteKnight',
    WP = 'WhitePawn',
    Default = 'Default'
}
export const PieceImg = {
    BlackKing : '♚',
    BlackQueen : '♛',
    BlackRook : '♜',
    BlackBishop : '♝',
    BlackKnight : '♞',
    BlackPawn : '♟',
    WhiteKing : '♔',
    WhiteQueen : '♕',
    WhiteRook : '♖',
    WhiteBishop : '♗',
    WhiteKnight : '♘',
    WhitePawn : '♟',
    Default:''
}

// export interface PieceProps {
//     id: number,
//     position: Position,
//     type: PieceType,
//     img: PieceImg
// }
export type Piece = {
    id: number,
    position: Position,
    type: PieceType,
    img:string,
    preImg: string
}
export const PieceRender: FC<Piece&Game> = (props) => {
    let pieceProps: any =  {...props}
    switch (props.type) {
        case PieceType.BK:
        case PieceType.WK:
            pieceProps.preImg = knightImage
            return <DragPiece {...pieceProps}/>
        case PieceType.BQ:
        case PieceType.WQ:
            pieceProps.preImg = knightImage
            return <DragPiece {...pieceProps}/>
        case PieceType.BR:
        case PieceType.WR:
            pieceProps.preImg = knightImage
            return <DragPiece {...pieceProps}/>
        case PieceType.BB :
        case PieceType.WB:
            pieceProps.preImg = knightImage
            return <DragPiece {...pieceProps}/>
        case PieceType.BN:
        case PieceType.WN:
            pieceProps.preImg = knightImage
            return <DragPiece {...pieceProps}/>
        case PieceType.BP:
        case PieceType.WP:
            pieceProps.preImg = knightImage
            return <DragPiece {...pieceProps}/>
        default:
            return null
    }
}
