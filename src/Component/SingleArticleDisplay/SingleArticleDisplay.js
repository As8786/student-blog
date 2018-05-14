import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import "./singleArticleDisplay.css";
import Comments from "../Comments/Comments";

class SingleArticleDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  handleState = value => {
    this.setState({
      id: value._id,
      image: value.image,
      title: value.title,
      date: value.date.toString(),
      content: value.content,
      writer: value.user,
      category: value.category,
      comments: value.comments
    });
  };

  componentDidMount() {
    axios
      .get(`/articles/${this.props.id}`)
      .then(res => this.props.handleCurrentiArticleInfo(res.data));
  }

  render() {
    console.log("dd", this.props.currentArticle);
    return (
      <div className="single-article-container">
        <div className="title-container">
          <div
            className="principal-image"
            style={{
              backgroundImage: `url(${this.props.currentArticle.image})`
            }}
          />
          <h1>{this.props.currentArticle.title}</h1>
          <p className="article-date">
            {" "}
            {this.props.currentArticle.date} by{" "}
            {this.props.currentArticle.user_name}
          </p>
        </div>

        <div className="content-container">
          <p>{this.props.currentArticle.content}</p>
        </div>

        <div className="comments-part">
          <Comments />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentArticle: state.currentArticle
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleCurrentiArticleInfo: data => {
      dispatch({
        type: "SET_CURRENT_ARTICLE_VALUE",
        data: data
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleArticleDisplay
);
