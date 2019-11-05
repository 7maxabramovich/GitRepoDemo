import React from 'react';
import axios from 'axios';

export default class PersonInput extends React.Component {
  state = {
    name: '',
    // id: 0,
  };

handleChange = event => {
  this.setState({ name: event.target.value});
};

//  handleChange = event => {
//   this.setState({ id: event.target.value});
// };

handleSubmit = event => {
  event.preventDefault();

  const user = {
    name: this.state.name
  }

  axios
    .post(`https://jsonplaceholder.typicode.com/users`, {user})
 // .put(`https://jsonplaceholder.typicode.com/users`, {user})
 // .delete(`https://jsonplaceholder.typicode.com/users/${this.state.id}`, {user})
    .then(res => {
      console.log(res);
      console.log(res.data);
    });
};

render() {
  return (
    <form onSubmit={this.handleSubmit}>
    <label>Person Name:
    <input type="text" name="name"
   onChange={this.handleChange}/>
    </label>
    <button type="submit">Add</button>
    </form>
  );
  }
}

//    {<!-- <label>Person ID: -->}
//    {<!--     <input type="number" name="id" -->}
//    {<!-- <button type="submit">Delete</button> -->}



// <CardColumns>
//   { arr.map(({id, imgSrc, name, price}) => (
// <Card key={id} style={{width: '10rem'}}>
//     <Card.Img variant="top" height='150' src={imgSrc}/>
//     <Card.Body>{id}
//     <Card.Title>{name}</Card.Title>
//       <Card.Text>Price: {price}</Card.Text>
