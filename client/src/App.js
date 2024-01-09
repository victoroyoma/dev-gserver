import React, { useState } from "react";
import UploadForm from "./Dev/UploadForm";
import Gallery from "./Dev/Gallery";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar"; // Import the NavigationBar component
import "./index.css";
import Devices from "./Devices/Devices";
import Project from "./Project/Project";
import Profile from "./Profile/Profile";
import Messaging from "./Messaging/Messaging";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

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
      <NavigationBar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <h1>Dev Gallery</h1>
              <UploadForm />
              <button onClick={fetchImages} className="fetch-images-btn">
                Retrieve Images
              </button>
              <Gallery images={images} />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/messaging" element={<Messaging />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/project" element={<Project />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
