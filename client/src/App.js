import React, { useState } from "react";
import UploadForm from "./Dev/UploadForm";
import Gallery from "./Dev/Gallery";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEnvelope,
  faProjectDiagram,
  faMobileAlt,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import Devices from "./Devices/Devices";
import Project from "./Project/Project";
import Profile from "./Profile/Profile";
import Messaging from "./Messaging/Messaging";

function App() {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        "https://dev-gallery-qwds.onrender.com/gallery"
      );
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images", error);
    }
  };

  return (
    <Router>
      <div className="app">
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
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/UploadForm" exact>
            <div className="container">
              <h1>Dev Gallery</h1>
              <UploadForm />
              <button onClick={fetchImages} className="fetch-images-btn">
                Retrieve Images
              </button>
              <Gallery images={images} />
            </div>
          </Route>
          {/* Add routes*/}
          {<Route path="/Messaging" component={Messaging} />}
          {<Route path="/Devices" component={Devices} />}
          {<Route path="/Project" component={Project} />}
          {<Route path="/messaging" component={Profile} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
