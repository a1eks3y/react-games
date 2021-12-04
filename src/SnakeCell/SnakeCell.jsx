import React from 'react';
import './SnakeCell.css'

const SnakeCell = ({x, y}) => {
    return (
        <div className='snakeCell' style={{marginTop: (y-1)*20 + 'px', marginLeft: (x-1)*20 + 'px'}}>
            <div className='CellBG'/>
        </div>
    );
};

export default SnakeCell;