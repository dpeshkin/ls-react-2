import React, { Component } from "react";
import NewsPost from "./NewsPost";
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
        text: newsInput
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
      <div className="App">
        <input
          type="text"
          placeholder="Какие новости?"
          value={newsInput}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <ul className="news-list">
          {news.map(post => (
            <NewsPost key={post.id} text={post.text} />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
export { getNewId };
