import React from 'react';
import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    persons: [],
  };
  componentDidMount() {
    axios.get(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`).then(res => {
        console.log(res);
        this.setState({ persons: res.data });
  });
}

render() {
  return <ol>{ this.state.persons.map(({r030, txt, rate, cc, exchangedate}) => <li key={cc}>{r030}, {txt}, {rate}, {cc}, {exchangedate}</li>)}</ol>;
  }
}


// <CardColumns>
//   { arr.map(({id, imgSrc, name, price}) => (
// <Card key={id} style={{width: '10rem'}}>
//     <Card.Img variant="top" height='150' src={imgSrc}/>
//     <Card.Body>{id}
//     <Card.Title>{name}</Card.Title>
//       <Card.Text>Price: {price}</Card.Text>
