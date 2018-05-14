import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Routes from "./Component/Routes/Routes";
import { connect } from "react-redux";

import "./app.css";
import NavBar from "./Component/NavBar/NavBar";
import Footer from "./Component/Footer/Footer";
import Search from "./Component/Search/Search";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <div className="navbar">
            <NavBar />
          </div>
          <div className="app-content">
            {this.props.isSearchBarDisplayed && <Search />}
            <Routes />
          </div>
          <div className="footer">
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSearchBarDisplayed: state.isSearchBarDisplayed
  };
};

const mapDispatchToSTate = dispatch => {};

export default connect(mapStateToProps, mapDispatchToSTate)(App);
