import React, { CSSProperties, FC, useMemo } from 'react'
import { Board } from './Board'
import { Game } from './Game'

export interface ChessboardTutorialAppState {
  knightPosition: [number, number]
}

const containerStyle: CSSProperties = {
  position:"relative",
  width: 500,
  height: 500,
  border: '1px solid gray',
}
const BlackDeathBox:CSSProperties = {
  position:"absolute",
  width:200,
  height:200,
  border: '1px solid gray',
  top: 0,
left: -250,
}
const witheDeathBox:CSSProperties = {
  position:"absolute",
  width:200,
  height:200,
  border: '1px solid gray',
  bottom:0,
  right:-250
}
/**
 * The Chessboard Tutorial Application
 */
export const TutorialApp: FC = () => {
  const game = useMemo(() => new Game(), [])

  return (
    <div style={containerStyle}>
      <div style={BlackDeathBox}></div>
      <Board game={game} />
      <div style={witheDeathBox}></div>
    </div>
  )
}
