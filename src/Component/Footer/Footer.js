import React from "react";
import { Link } from "react-router-dom";

import "./footer.css";

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer-container">
        <h4>
          <Link
            to="/home"
            title="Home"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            GMC STUDENTS BLOG
          </Link>
        </h4>
        <div className="icon-container">
          <a href="#" title="facebook">
            <i class="fab fa-facebook-f" />
          </a>
          <a href="#" title="twitter">
            <i class="fab fa-twitter" />
          </a>
          <a href="#" title="linkedin">
            <i class="fab fa-linkedin-in" />
          </a>
          <a href="#" title="google">
            <i class="fab fa-google-plus-g" />
          </a>
          <a href="#" title="vimeo">
            <i class="fab fa-vimeo-v" />
          </a>
          <a href="#" title="dribbble">
            <i class="fab fa-dribbble" />
          </a>
        </div>
      </div>
    );
  }
}
