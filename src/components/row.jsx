import React from 'react';
import Space from './space.jsx';

const Row = (props) => {

  return (
    <div className="rows">
      {props.row.map((block, i) => {
        return (
          <Space
            selecterTop={props.selecterTop}
            turnToBrick={props.turnToBrick}
            img={block}
            row={props.rowIndex}
            col={i}
            key={i}
          />
        )
      })}
    </div>
  )
}

export default Row;