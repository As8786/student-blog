import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

import "./userInformation.css";
import ArticleItem from "./ArticleItem";

class UserArticles extends React.Component {
  componentDidMount() {
    axios.get(`/articles/user/${this.props.connectedUser._id}`).then(res => {
      this.props.initialiseArticles(res.data);
    });
  }

  render() {
    console.log(this.props.connectedUser._id);
    return (
      <div className="user-information-container">
        <div className="profil-information">
          <div
            className="user-img"
            style={
              this.props.connectedUser.image === undefined
                ? { backgroundImage: `url(/user.png)` }
                : { backgroundImage: `url(${this.props.connectedUser.image})` }
            }
            title={this.props.connectedUser.name}
          />
          <div className="user-data">
            <h1> User Name : {this.props.connectedUser.name} </h1>
            <h2> Number of posted articles : {this.props.articles.length} </h2>
            <Link to={`/${this.props.connectedUser}/profile_modify`}>
              <input type="button" value="Modify Profile Information" />
            </Link>
          </div>
        </div>
        <div className="users-articles-conatiner">
          {this.props.articles.map((el, i) => {
            return <ArticleItem key={i} el={el} />;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.articles,
    connectedUser: state.connectedUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initialiseArticles: data => {
      dispatch({
        type: "ADD_ARTICLES",
        data: data
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserArticles);
