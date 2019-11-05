import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import About from './About';

// export default class PeopleList extends React.Component {
//   state = {
//     name: '',
//   }
//   handleChange = event => {
//     this.setState({ name: event.target.value });
//   }
//    handleSubmit = event => {
//     event.preventDefault();
//       const user= {
//       name: this.state.name
//     };
// axios.post(`${axios.defaults.baseURL}/people`, { user })
//       .then(res => {
//         console.log(res);
//       })
//   }
//    render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             User Name:
//             <input type="text" name="name" onChange={this.handleChange} />
//           </label>
//           <button type="submit">Add user</button>
//         </form>
//       </div>
//     )
//   }
// }



ReactDOM.render((<Router>
<Switch>
  <Route path="/app">
    <App />
  </Route>
  <Route path="/about">
    <About />
      </Route>
    <Route path="/users">
      <Users />
    </Route>
    <Route path="/*">
      <NotFound />
    </Route>
    </Switch>
</Router>), document.getElementById('root'));


// export default function App() {
//   return (
//    );
// }

// function About() {
//   return <h2>About</h2>;
// }

function Users() {
  return <h2>Users</h2>;
}

function NotFound() {
  return <h2>404<br/>page not found<br/><Link to="/app">go to main</Link></h2>;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
