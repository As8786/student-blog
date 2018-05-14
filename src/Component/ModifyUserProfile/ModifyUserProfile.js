import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import "./modifyUserProfile.css";

class ModifyUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      image: "",
      isProfileUpdated: true
    };
  }

  componentWillMount = () => {
    this.setState({
      name: this.props.connectedUser.name,
      email: this.props.connectedUser.email,
      image: this.props.connectedUser.image,
      password: this.props.connectedUser.password,
      isProfileUpdated: !this.state.isProfileUpdated
    });
  };

  toggleIsProfileUpdatedValue = () => {
    this.setState({
      isProfileUpdated: !this.state.isProfileUpdated
    });
  };

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

    if (object.password.length < 6) {
      message.push("the password lenght most be higher than 6");
    }

    return message;
  };

  ModifyUser = () => {
    let userInformation = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      image: this.state.image
    };
    axios
      .put(`/users/${this.props.connectedUser._id}`, { ...userInformation })
      .then(
        alert("user infromation updated"),
        axios
          .get(`/users/${this.props.connectedUser._id}`)
          .then(res => this.props.uspdateUserInformation(res.data))
      );
  };

  render() {
    return this.state.isProfileUpdated ? (
      <Redirect to={`/${this.props.connectedUser._id}/profile`} />
    ) : (
      <div className="signup-container">
        <form>
          <div className="input-line">
            <label> Name </label>
            <input
              name="name"
              placeholder="Name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>

          <div className="input-line">
            <label> Email </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>

          <div className="input-line">
            <label> Image Link </label>
            <input
              name="image"
              placeholder="Image Link"
              onChange={this.handleChange}
              value={this.state.image}
            />
          </div>

          <div className="input-line">
            <label> Password </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </div>

          <div className="input-button">
            <input
              type="button"
              value="Modify"
              onClick={e => {
                this.formValidator(this.state).length === 0
                  ? (this.ModifyUser(), this.toggleIsProfileUpdatedValue())
                  : alert(this.formValidator(this.state));
              }}
            />
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
    uspdateUserInformation: user => {
      dispatch({
        type: "ADD_USER",
        data: user
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyUserProfile);
