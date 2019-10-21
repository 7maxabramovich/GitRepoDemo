import React from 'react';
import './CustomBtn.css';
import 'moment';
import 'moment-timezone';


let saySmth = function(e) {
    alert(123, e);
};

function CustomBtn() {
  return (
      <button className="custom-btn"
      onClick={ saySmth }>Submit</button>
  );
}


export default class MyComponent extends React.Component {
    render() {
        return (
            const dateToFormat = '1976-04-19T12:59-0500';
            <Moment>{dateToFormat}</Moment>
        );
    }
}

export default CustomBtn;
