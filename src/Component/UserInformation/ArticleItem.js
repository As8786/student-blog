import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import "./articleItem.css";

class ArticleItem extends React.Component {
  deleteArtcile = () => {
    axios
      .delete(`/articles/${this.props.el._id}`)
      .then(alert("article deleted"));
  };

  reloadUserArticles = () => {
    axios.get(`/articles/user/${this.props.connectedUser._id}`).then(res => {
      this.props.initialiseArticles(res.data);
    });
  };

  render() {
    return (
      <div
        className="article-item-container"
        onClick={() => this.props.setCurrentAnnouncementValue(this.props.el)}
      >
        <div className="article-category"> {this.props.el.category} </div>
        <Link
          to={`/article/${this.props.el._id}`}
          style={{ textDecoration: "none" }}
          className="img-container"
        >
          <div
            className="img-container-div"
            style={{ backgroundImage: `url(${this.props.el.image})` }}
            title={this.props.el.title}
          />
        </Link>

        <div className="description-container">
          <div className="article-title">
            <Link
              to={`/article/${this.props.el._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
              className="title-link"
            >
              {" "}
              <p>{this.props.el.title}</p>{" "}
            </Link>
          </div>
          <p className="article-date">{this.props.el.date}</p>
          <p className="article-content">{this.props.el.content}</p>
        </div>
        <div className="input-container">
          <Link
            to={`/${this.props.connectedUser._id}/modify_article/${
              this.props.el._id
            }`}
          >
            <input type="button" value="Modify" />
          </Link>
          <input
            type="button"
            value="Delete"
            onClick={() => {
              this.deleteArtcile();
              this.reloadUserArticles();
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    connectedUser: state.connectedUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentAnnouncementValue: data => {
      dispatch({
        type: "Add_Announcement",
        data: data
      });
    },
    initialiseArticles: data => {
      dispatch({
        type: "ADD_ARTICLES",
        data: data
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleItem);
