import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

import "./search.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }

  handleState = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  initializeState = () => {
    this.setState({
      input: ""
    });
  };

  render() {
    return (
      <div className="search-container">
        <input
          placeholder="category"
          className="search-input"
          onChange={this.handleState}
          value={this.state.input}
          name="input"
        />
        <Link to={`/articles/search/${this.state.input}`}>
          <input
            type="button"
            value="Search"
            className="search-button"
            onClick={() => {
              this.initializeState();
            }}
          />
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
