import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import moment from "moment"

import "./addArticles.css";

class AddArticles extends React.Component {
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
    this.setState({
      user_name: this.props.currentUser.name,
      user_id: this.props.currentUser._id,
      date: moment().format("L")
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addUserNameAndDate = () => {
    this.setState({
      user: this.props.currentUser.name,
      date: new Date()
    });
  };

  postArticle = value => {
    axios.post("/articles", { ...value }).then(res => console.log(res.data));
  };

  resetState = () => {
    this.setState({
      title: "",
      category: "",
      image: "",
      content: "",
      date: "",
      user: "",
      isArticleAdded: true
    });
  };

  render() {
    this.state.user === "" && this.addUserNameAndDate();
    return this.state.isArticleAdded ? (
      <Redirect to="/home" />
    ) : (
      <div className="add-articles-container">
        <h1> Add Article </h1>
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
                this.resetState();
                alert("article added");
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

export default connect(mapStateToProps, mapDispatchToProps)(AddArticles);
