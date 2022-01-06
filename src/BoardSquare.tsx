import { CSSProperties, FC, ReactNode } from 'react'
import {
  DropTarget,
  DropTargetMonitor,
  DropTargetConnector,
  ConnectDropTarget,
} from 'react-dnd'
import { Square } from './Square'
import { ItemTypes } from './ItemTypes'
import { Overlay, OverlayType } from './Overlay'
import { Game } from './Game'
import React from 'react';
import {Piece} from "./Piece";

export interface BoardSquareProps {
  // x: number
  // y: number
  piece:Piece
  game: Game
  children?: ReactNode

  // Collected Props
  isOver: boolean
  canDrop: boolean
  connectDropTarget: ConnectDropTarget
}

const boardSquareStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
}

const BoardSquare: FC<BoardSquareProps> = ({
  piece,
  connectDropTarget,
  isOver,
  canDrop,
  children,
}) => {
  const black = (piece.position[0] + piece.position[1]) % 2 === 1
  return connectDropTarget(
    <div role="none" data-testid={`(${piece.position[0]},${piece.position[1]})`} style={boardSquareStyle}>
      <Square black={black}>{children}</Square>
      {isOver && !canDrop && <Overlay type={OverlayType.IllegalMoveHover} />}
      {!isOver && canDrop && <Overlay type={OverlayType.PossibleMove} />}
      {isOver && canDrop && <Overlay type={OverlayType.LegalMoveHover} />}
    </div>,
  )
}

export default DropTarget(
  ItemTypes.KNIGHT,
  {
    canDrop: ({ game, piece }: BoardSquareProps,monitor) => game.canMove(piece.position[0],piece.position[1]),
    drop: ({ game, piece}: BoardSquareProps) => game.move(piece.position[0],piece.position[1]),
  },
  (connect: DropTargetConnector, monitor: DropTargetMonitor) => {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }
  },
)(BoardSquare)
