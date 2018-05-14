import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./articleItem.css";

class ArticleItem extends React.Component {
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentAnnouncementValue: data => {
      dispatch({
        type: "Add_Announcement",
        data: data
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleItem);
