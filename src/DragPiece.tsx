import React, {CSSProperties, FC} from 'react'
import {
    DragSource,
    ConnectDragSource,
    ConnectDragPreview,
    DragSourceConnector,
    DragSourceMonitor,
    DragPreviewImage,
} from 'react-dnd'
import {ItemTypes} from './ItemTypes'

import {Piece} from "./Piece";
import {Game} from "./Game";

const knightStyle: CSSProperties = {
    fontSize: 40,
    fontWeight: 'bold',
    cursor: 'move',
    textAlign: 'center'
}

export interface DragPieceProps {
    connectDragSource: ConnectDragSource
    connectDragPreview: ConnectDragPreview
    isDragging?: boolean
}

const DragPiece: FC<DragPieceProps & Piece> = (props) => {
    return (
        <>
            <DragPreviewImage connect={props.connectDragPreview} src={props.preImg}/>
            <div
                ref={props.connectDragSource}
                style={{
                    ...knightStyle,
                    opacity: props.isDragging ? 0.5 : 1,
                    color: props.type.includes('W') ? '#fff' : 'red'
                }}
            >
                {props.img}
            </div>
        </>
    )
}

export default DragSource(
    ItemTypes.KNIGHT,
    {
        beginDrag: (props: Piece & Game) => {
            // console.log(props)
            props.setCurPiece(props.id,props.type)
            return {curId: props.id}
        },
    },
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    }),
)(DragPiece)
