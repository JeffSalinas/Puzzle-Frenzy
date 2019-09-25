import React from 'react';
import Space from './space.jsx';

const Row = (props) => {

  return (
    <>
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
    </>
  )
}

export default Row;