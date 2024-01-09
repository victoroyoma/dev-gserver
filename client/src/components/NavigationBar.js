// NavigationBar.js
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEnvelope,
  faProjectDiagram,
  faMobileAlt,
  faCode,
  faSignIn,
  faRegistered,
} from "@fortawesome/free-solid-svg-icons";
import "./NavigationBar.css"; // Make sure to create this CSS file for styling

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <Link className="nav-logo" to="/">
        DevGServer
      </Link>
      <div className="nav-links">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} /> Home
        </Link>
        <Link to="/messaging">
          <FontAwesomeIcon icon={faEnvelope} /> Messaging
        </Link>
        <Link to="/project">
          <FontAwesomeIcon icon={faProjectDiagram} /> Project
        </Link>
        <Link to="/devices">
          <FontAwesomeIcon icon={faMobileAlt} /> Devices
        </Link>
        <Link to="/dev">
          <FontAwesomeIcon icon={faCode} /> Dev
        </Link>
      </div>
      <div className="nav-auth">
        <Link to="/login">
          <FontAwesomeIcon icon={faSignIn} />
          Login
        </Link>
        <Link to="/register">
          <FontAwesomeIcon icon={faRegistered} />
          Register
        </Link>
      </div>
    </nav>
  );
};

export default NavigationBar;
