import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEnvelope,
  faProjectDiagram,
  faSignIn,
  faRegistered,
  faImage,
  faComputer,
} from "@fortawesome/free-solid-svg-icons";
import "./NavigationBar.css";

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
          <FontAwesomeIcon icon={faProjectDiagram} /> Task Manager
        </Link>
        <Link to="/devices">
          <FontAwesomeIcon icon={faComputer} /> Device Logs
        </Link>
        <Link to="/UploadForm">
          <FontAwesomeIcon icon={faImage} /> Dev Gallery
        </Link>
      </div>
      <div className="nav-auth">
        <Link to="/Login">
          <FontAwesomeIcon icon={faSignIn} />
          Login
        </Link>
        <Link to="/Register">
          <FontAwesomeIcon icon={faRegistered} />
          Register
        </Link>
      </div>
    </nav>
  );
};

export default NavigationBar;
