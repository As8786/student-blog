import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

import "./modifyArticles.css";

class ModifyArticles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      category: "",
      image: "",
      content: "",
      date: "",
      user_name: "",
      user_id: "",
      isArticleAdded: false
    };
  }

  componentWillMount = () => {
    axios.get(`/articles/${this.props.article_id}`).then(res =>
      this.setState({
        title: res.data.title,
        category: res.data.category,
        image: res.data.image,
        content: res.data.content,
        date: res.data.date,
        user_name: res.data.user_name,
        user_id: res.data.user_id
      })
    );
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  postArticle = value => {
    axios
      .put(`/articles/${this.props.article_id}`, { ...value })
      .then(res => console.log(res.data));
  };

  render() {
    return this.state.isArticleAdded ? (
      <Redirect to="/home" />
    ) : (
      <div className="add-articles-container">
        <h1> Update Article </h1>
        <form>
          <label> Article Title </label>
          <input
            name="title"
            value={this.state.title}
            placeholder="article title"
            onChange={this.handleChange}
          />

          <label> Article Category </label>
          <input
            name="category"
            value={this.state.category}
            placeholder="article category"
            onChange={this.handleChange}
          />

          <label> Article Image Link </label>
          <input
            name="image"
            value={this.state.image}
            placeholder="article category"
            onChange={this.handleChange}
          />

          <label> Article Content </label>
          <textarea
            name="content"
            value={this.state.content}
            placeholder="article content"
            onChange={this.handleChange}
          />

          <Link to={`/${this.props.user_id}/profile`}>
            <input
              type="button"
              className="input-button"
              value="submit"
              onClick={() => {
                this.postArticle(this.state);
                alert("article updated");
              }}
            />
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.connectedUser
  };
};

const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyArticles);
