import React, { Component } from "react";

class Comment extends Component {
  handleDelete = () => {
    const { id, onDelete } = this.props;
    onDelete(id);
  };

  render() {
    const { text, id } = this.props;
    return (
      <li className="newsItem">
        <p>
          {text}
          {id}
          <span
            onClick={this.handleDelete}
            className="delete-button"
          >
            X
          </span>
        </p>
      </li>
    );
  }
}
export default Comment;
