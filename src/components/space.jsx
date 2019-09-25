import React from 'react'

const Space = (props) => {

  let newId = 'none';

  // if (props.selecterTop.row === props.row && props.selecterTop.col === props.col) {
  //   newId = 'topSelect';
  // }
  // if (props.selecterTop.row + 1 === props.row && props.selecterTop.col === props.col) {
  //   newId = 'bottomSelect';
  // }

  return (
    <>
      <img id={newId} className="blocks" onClick={() => props.turnToBrick(null, props.row, props.col)} src={props.img}></img>
      {/* <img id={props.id} className="blocks" src={props.img}></img> */}
    </>
  )
}

export default Space;
