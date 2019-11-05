// import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';


import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
  const node = document.getElementById("root");
  class Post extends Component {
    render() {
      return React.createElement(
        "div",
        {
          className: "post" //#C
        },
        React.createElement(
          "h2",
          {
            className: "postAuthor",
            id: this.props.id
          },
          this.props.user, //#D
          React.createElement(
            "span",
            {
              className: "postBody" //#E
            },
            this.props.content //#F
          ),
          this.props.children
        )
      );
    }
  }

  Post.propTypes = {
    user: PropTypes.string.isRequired, //#G
    content: PropTypes.string.isRequired, //#G
    id: PropTypes.number.isRequired //#G
  };

  class Comment extends Component {
    render() {
      console.log("yo");
      return React.createElement(
        "div",
        {
          className: "comment"
        },
        React.createElement(
          "h2",
          {
            className: "commentAuthor"
          },
          this.props.user,
          React.createElement(
            "span",
            {
              className: "commentContent"
            },
            this.props.content
          )
        )
      );
    }
  }

  Comment.propTypes = {
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
  };

  class CreateComment extends Component {
    constructor(props) {
      super(props);
      this.state = {
        content: "",
        user: ""
      };
    }
    render() {
      return React.createElement(
        "form",
        {
          className: "createComment"
        },
        React.createElement("input", {
          type: "text",
          placeholder: "Your name",
          value: this.state.user
        }),
        React.createElement("input", {
          type: "text",
          placeholder: "Thoughts?"
        }),
        React.createElement("input", {
          type: "submit",
          value: "Post"
        })
      );
    }
  }
  CreateComment.propTypes = {
    content: PropTypes.string
  };

  const App = React.createElement(
    Post,
    {
    id: 1, //#H
    content: " said: This is a post!", //#H
    user: "mark" //#H
  },
  React.createElement(Comment, {
    id: 2,
    user: "bob",
    content: " commented: wow! how cool!"
  }),
  React.createElement(CreateComment)
);

  render(App, node);


// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
