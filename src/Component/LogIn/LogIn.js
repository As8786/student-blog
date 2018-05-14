import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import "./LogIn.css";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  formValidator = object => {
    let message = [];
    for (let i in object) {
      if (object[i] === "") {
        message.push(`${i} is still empty, please to fill it`);
      }
    }
    return message;
  };

  getUser = () => {
    axios.get(`/users/${this.state.email}/${this.state.password}`).then(res => {
      console.log(res.data);
      if (res.data) {
        this.props.fecthUserInformation(res.data);
      } else {
        alert("wrong password or email");
      }
    });
  };

  render() {
    return this.props.connectedUser.name ? (
      <Redirect to="/home" />
    ) : (
      <div className="login-container">
        <form>
          <div className="input-line">
            <label> Email </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
          </div>

          <div className="input-line">
            <label> Password </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </div>

          <div className="input-button">
            <input
              type="button"
              value="Submit"
              onClick={() => {
                this.formValidator(this.state).length === 0
                  ? this.getUser()
                  : alert(this.formValidator(this.state));
              }}
            />
          </div>

          <div className="condition-signIn">
            <p>
              No account,
              <Link to="/signup" className="signin-link">
                create one
              </Link>
            </p>
          </div>
        </form>
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
    fecthUserInformation: user => {
      dispatch({
        type: "ADD_USER",
        data: user
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
