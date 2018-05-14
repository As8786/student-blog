import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import "./articlesInList.css";
import ArticleItem from "./ArticleItem";

class ArticlesInList extends React.Component {
  componentDidMount() {
    axios.get("articles").then(res => this.props.initialiseArticles(res.data));
  }

  render() {
    return (
      <div className="articles-list-container">
        {this.props.articles.map((el, i) => {
          return <ArticleItem key={i} el={el} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.articles
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesInList);
