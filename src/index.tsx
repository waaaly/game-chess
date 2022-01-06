import {render} from 'react-dom'
import Example from './example'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import React, {CSSProperties} from 'react';
const appStyle: CSSProperties = {
    display:"flex",
    alignItems:"center",
    justifyContent:'center',
    height:'800px'
}
function App() {
    return (
        <div style={appStyle}>
            <DndProvider backend={HTML5Backend}>
                <Example/>
            </DndProvider>
        </div>
    )
}

const rootElement = document.getElementById('root')
render(<App/>, rootElement)
