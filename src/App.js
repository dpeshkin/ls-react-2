import React, { Component } from "react";
import "./App.css";

//idCounter
//Вопрос, можно ли иметь один генератор айдишников на все приложение, или каждому компененту задаем по своему генератору???
let id = 0;
function getNewId() {
  id += 1;
  return id;
}

//App
class App extends Component {
  state = {
    newsInput: "",
    news: []
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState({ newsInput: value });
  };

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      const { newsInput, news } = this.state;
      const newsPost = {
        id: getNewId(),
        value: newsInput
      };
      this.setState({
        newsInput: "",
        news: [...news, newsPost]
      });
    }
  };

  render() {
    const { newsInput, news } = this.state;
    return (
      <div className="container">
        <input
          type="text"
          placeholder="Какие новости?"
          value={newsInput}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <ul className="news-list">
          {news.map(post => (
            <NewsPost key={post.id} text={post.value} />
          ))}
        </ul>
      </div>
    );
  }
}

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
            <Comments
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

class Comments extends Component {
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

export default App;
