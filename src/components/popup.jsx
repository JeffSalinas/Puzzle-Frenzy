import React from 'react';
import ReactDOM from 'react-dom';

const Popup = (props) => {

  return (
    ReactDOM.createPortal(
      <div className="popupStyle">
        <div className="title">
          <h3>Tricky Tricky!</h3>
        </div>
        <div id="text">
            Level: {props.currentlvl}<br></br>
            Moves: {props.level.moves}<br></br>
            Password: {props.level.password}
        </div>
        <p id="instruction">*Press Any Key To Begin*</p>
      </div>,
      document.getElementById('popup')
    )
  )
}

export default Popup;