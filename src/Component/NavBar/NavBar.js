import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./navBar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuDipslayed: false
    };
  }

  toggleIsMenuDiplayedValue = () => {
    this.setState({
      isMenuDipslayed: !this.state.isMenuDipslayed
    });
  };

  render() {
    return (
      <div className="navbar-container">
        <div className="navbar-large-size">
          <div className="left-side">
            {this.props.connectedUser.name ? (
              <Link to={`/${this.props.connectedUser._id}/add-article`}>
                <input type="button" value="Post an article" />
              </Link>
            ) : (
              <Link to="/login">
                <input type="button" value="Post an article" />
              </Link>
            )}
          </div>
          <div className="center">
            <Link
              to="/home"
              title="Home"
              style={{ textDecoration: "none", color: "whitesmoke" }}
            >
              <h2> GMC STUDENTS BLOG </h2>
            </Link>
          </div>
          <div className="right-side">
            <i
              class="fas fa-search"
              title="Search"
              onClick={this.props.displaySearchComponent}
            />

            {this.props.connectedUser.name && (
              <Link to={`/${this.props.connectedUser.name}/profile`}>
                {this.props.connectedUser.image === undefined ? (
                  <i class="fas fa-user" />
                ) : (
                  <div
                    className="user-image"
                    style={{
                      backgroundImage: `url(${this.props.connectedUser.image})`
                    }}
                    title={`${this.props.connectedUser.name} Profile `}
                  />
                )}
              </Link>
            )}

            {this.props.connectedUser.name ? (
              <Link to="/home">
                <i
                  class="fas fa-sign-out-alt"
                  title="Log Out"
                  onClick={this.props.logOut}
                />
              </Link>
            ) : (
              <Link to="/login">
                <i class="fas fa-user" title="Log In" />
              </Link>
            )}
          </div>
        </div>

        <div className="responsive-navbar">
          <div className="menu-icon">
            {this.state.isMenuDipslayed ? (
              <i
                class="far fa-window-close"
                onClick={this.toggleIsMenuDiplayedValue}
              />
            ) : (
              <i class="fas fa-bars" onClick={this.toggleIsMenuDiplayedValue} />
            )}
            <ul
              className="link-list"
              style={
                this.state.isMenuDipslayed
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              {this.props.connectedUser.name && (
                <Link
                  to={`/${this.props.connectedUser.name}/profile`}
                  className="responsive-link"
                >
                  <li> {`${this.props.connectedUser.name} Profile`} </li>
                </Link>
              )}
              {this.props.connectedUser.name ? (
                <Link to="/home" className="responsive-link">
                  {" "}
                  <li onClick={this.props.logOut}> Log Out </li>{" "}
                </Link>
              ) : (
                <Link to="/login" className="responsive-link">
                  {" "}
                  <li> Log In </li>{" "}
                </Link>
              )}
              {this.props.connectedUser.name ? (
                <Link
                  to={`${this.props.connectedUser._id}/add-article`}
                  className="responsive-link"
                >
                  <li> Post an article </li>
                </Link>
              ) : (
                <Link to="/login" className="responsive-link">
                  <li> Post an article </li>
                </Link>
              )}
              <Link to="/" className="responsive-link">
                <li onClick={this.props.displaySearchComponent}>Search</li>
              </Link>
            </ul>
          </div>
          <div className="logo">
            <Link
              to="/home"
              className="logo-link"
              style={{ textDecoration: "none", color: "whitesmoke" }}
            >
              <h3> GMC STUDENTS BLOG </h3>
            </Link>
          </div>
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
    logOut: () => {
      dispatch({
        type: "LOG_OUT"
      });
    },
    displaySearchComponent: () => {
      dispatch({
        type: "DISPLAY_SEARCH"
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
