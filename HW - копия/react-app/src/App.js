import React, { useState } from 'react';
import logoBlaBlaBla from './logo.svg';
import './App.css';
import CustomBtn from './components/CustomBtn';

// https://pastebin.com/EPaUApbp
// https://pastebin.com/HFXgy3Nb
let appId = 'app1';
let arr = ['Dmytro', 'Valentyna', 'Ann', 'Denis'];


function App() {

    let [date, setDate] = useState(new Date());

    setInterval(() => {
        setDate(new Date(), 1000);
    });
  return (
      <React.Fragment>
        <CustomBtn name='afwafw' arr={arr} date={date} />
        <div className="App-main" id={appId} >
            <ul>
                { arr.map(item => <li key={item} className={'cl-' + item}>{item.toUpperCase()}</li>) }
            </ul>
          <header className="App-header">
            <img src={logoBlaBlaBla} className="App-logo" alt="logo" />
          </header>
        </div>
      </React.Fragment>
  );
}

export default App;
