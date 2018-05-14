import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./SignUp.css";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: ""
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

    if (object.password !== object.passwordConfirmation) {
      message.push(
        `There is a mistake with the Password confirmation, please to try again`
      );
    }

    if (object.password.length < 6) {
      message.push("the password lenght most be higher than 6");
    }

    return message;
  };

  addNewUser = () => {
    axios.post("/addNewUser", { ...this.state }).then(res => {
      alert(`Account was created for ${res.data[0].name}`);
    });
  };

  render() {
    return (
      <div className="signup-container">
        <form>
          <div className="input-line">
            <label> Name </label>
            <input
              name="name"
              placeholder="Name"
              onChange={this.handleChange}
            />
          </div>

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
            <label> Image Link </label>
            <input
              name="image"
              placeholder="Image Link"
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

          <div className="input-line">
            <label> Password Confirmation </label>
            <input
              type="password"
              name="passwordConfirmation"
              placeholder="Password Confirmation"
              onChange={this.handleChange}
            />
          </div>

          <div className="input-button">
            <input
              type="button"
              value="Submit"
              onClick={e => {
                this.formValidator(this.state).length === 0
                  ? this.addNewUser(this.state)
                  : alert(this.formValidator(this.state));
              }}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
