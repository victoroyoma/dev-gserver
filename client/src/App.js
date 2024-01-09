import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar"; // Import the NavigationBar component
import "./index.css";
import GalleryPage from "./GalleryPage"; // Import GalleryPage
import HomePage from "./HomePage"; // Import HomePage
import Devices from "./Devices/Devices";
import Project from "./Project/Project";
import Profile from "./Profile/Profile";
import Messaging from "./Messaging/Messaging";
import LoginPage from "./Auth/LoginPage";
import Register from "./Auth/Register";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/GalleryPage" element={<GalleryPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
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
