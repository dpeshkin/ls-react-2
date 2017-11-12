import React, { Component } from "react";
import { getNewId } from "./App";
import Comment from "./Comment";

class NewsPost extends Component {
  //State
  constructor(props) {
    super(props);
    this.state = {
      commentInput: "",
      comments: []
    };
  }

  handleChange = event => {
    const value = event.target.value;
    this.setState({
      commentInput: value
    });
  };

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      const { commentInput, comments } = this.state;
      const newComment = {
        id: getNewId(),
        value: commentInput
      };
      this.setState({
        commentInput: "",
        comments: [...comments, newComment]
      });
    }
  };

  handleDelete = id => {
    this.setState(state => ({
      comments: state.comments.filter(
        comment => id !== comment.id
      )
    }));
  };

  render() {
    const { commentInput, comments } = this.state;
    return (
      <li className="news-item">
        <p>{this.props.text}</p>
        <input
          type="text"
          placeholder="Ваш комментарий"
          value={commentInput}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          className="input"
        />
        <ul className="comments-list">
          {comments.map(comment => (
            <Comment
              key={comment.id}
              id={comment.id}
              text={comment.value}
              onDelete={this.handleDelete}
            />
          ))}
        </ul>
      </li>
    );
  }
}

export default NewsPost;
