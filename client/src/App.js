import React, { useState } from "react";
import UploadForm from "./UploadForm";
import Gallery from "./Gallery";
import axios from "axios";
import "./index.css";

function App() {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:3000/gallery");
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images", error);
    }
  };

  return (
    <div className="container">
      <h1>Dev Gallery</h1>
      <UploadForm />
      <button onClick={fetchImages} className="fetch-images-btn">
        Retrieve Images
      </button>
      <Gallery images={images} />
    </div>
  );
}

export default App;
