import React, { useState } from 'react';
import logoBlaBlaBla from './logo.svg';
import './App.css';
import CustomBtn from './components/CustomBtn';
import {Alert} from 'react-bootstrap';
import {Card} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {CardColumns} from 'react-bootstrap';


// https://pastebin.com/EPaUApbp
// https://pastebin.com/HFXgy3Nb
// https://react-bootstrap.github.io/components/cards/

let appId = 'app1';
let arr = [{id: 1, imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIp61ttQT24AY_9Bd9j90Mql_9S45PZQmHASO1-wBBf-flvud3&s', name: 'flesh', price: 30}, {id: 2, imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6qKDQQlfspN5le-strQP0veUrhqQMd85owwVk-7_ykgmhczMj&s', name: 'charge', price: 40}, {id: 3, imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiJQkCoiB2_HR_JNL4GTEOdiMHh_xWzLocY2RRc4i10HjpI7b1WQ&s', name: 'mouse', price: 50}];

// let arr1 = ['1'];
let arrNames = ['Dmytro', 'Valentyna', 'Denis'];

function App() {

    let [date, setDate] = useState(new Date());

    setInterval(() => {
        setDate(new Date(), 1000);
    });
  return (
      <React.Fragment>

    <CardColumns>
      { arr.map(({id, imgSrc, name, price}) => (
    <Card style={{width: '10rem'}}>
        <Card.Img variant="top" height='150' src={imgSrc}/>
        <Card.Body>{id}
        <Card.Title>{name}</Card.Title>
          <Card.Text>Price: {price}</Card.Text>
          <Button variant="primary">Buy Now, Add to Cart</Button>
      </Card.Body>
    </Card>
      ))}
      </CardColumns>

        <CustomBtn name='customBtn' arr={arr} date={date} />
        { arrNames.map((item, idx) => (
            <Alert key={idx} variant={"success"}>
                {item}
            </Alert>
        ))}

      <div className="App-main" id={appId} >

        <header className="App-header">
          <img src={logoBlaBlaBla} className="App-logo" alt="logo" />
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
