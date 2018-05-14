import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import "./searchDisplay.css";
import ArticleItem from "./ArticleItem";

class SearchDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: ""
    };
  }

  componentDidMount = () => {
    axios
      .get(`/articles/search/${this.props.category}`)
      .then(res => {
        this.props.searchArticles(res.data);
      })
      .then(
        this.props.articles.length > 0 &&
          this.setState({
            category: this.props.articles[0].category
          })
      );
  };

  componentWillReceiveProps = nextProps => {
    console.log("aa", nextProps.category);
    if (nextProps.category !== this.state.category) {
      axios.get(`/articles/search/${nextProps.category}`).then(res => {
        this.props.searchArticles(res.data);
        this.setState({
          category: nextProps.category
        });
      });
    }
  };

  render() {
    return (
      <div className="articles-list-container">
        {this.props.articles.length > 0 ? (
          this.props.articles.map((el, i) => {
            return <ArticleItem key={i} el={el} />;
          })
        ) : (
          <h1> No result </h1>
        )}
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
    searchArticles: data => {
      dispatch({
        type: "ADD_ARTICLES",
        data: data
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchDisplay);
