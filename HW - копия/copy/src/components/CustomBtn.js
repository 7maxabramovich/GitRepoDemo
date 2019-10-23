import React from 'react';
import './CustomBtn.css';

let saySmth = function(e) {
    alert(123, e);
};

function CustomBtn() {
  return (
      <button className="custom-btn"
      onClick={ saySmth }>Submit</button>
  );
}

export default CustomBtn;
