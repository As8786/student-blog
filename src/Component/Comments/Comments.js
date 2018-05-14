import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router-dom";

import "./comments.css";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      user: "",
      date: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addUserNameAndDate = () => {
    this.setState({
      date: new Date(),
      user: this.props.connectedUser.name
    });
  };

  resetStateValue = () => {
    this.setState({
      comment: ""
    });
  };

  addNewComment = value => {
    axios
      .post(`/articles/${this.props.currentArticle._id}/comments`, value)
      .then(
        axios
          .get(`/articles/${this.props.currentArticle._id}`)
          .then(res => this.props.handleCurrentiArticleInfo(res.data))
      );
    this.resetStateValue();
  };

  render() {
    this.state.user === "" && this.addUserNameAndDate();
    return (
      <div className="comments-container">
        <h2> Comments </h2>

        <div className="add-comments">
          <label> Add Comment </label>
          <textarea
            placeholder="Comments"
            name="comment"
            value={this.state.comment}
            onChange={this.handleChange}
          />
          <input
            type="button"
            value="submit"
            onClick={() => {
              this.props.connectedUser.name !== ""
                ? this.addNewComment(this.state)
                : alert("Please to log in to can post a comment");
            }}
          />
        </div>

        <div className="comments-list">
          {console.log("this.is comments", this.props.comments)}
          {this.props.currentArticle.comments &&
            this.props.currentArticle.comments.map((el, i) => {
              return (
                <div className="single-comment">
                  <div className="comment-header">
                    <p className="comment-user"> {el.user} </p>
                    <p className="comment-date"> {el.date} </p>
                  </div>
                  <p> {el.comment} </p>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    connectedUser: state.connectedUser,
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

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
