import React, { useState, useEffect } from "react";
import UploadForm from "./Dev/UploadForm";
import Gallery from "./Dev/Gallery";
import axios from "axios";

const GalleryPage = () => {
  const [images, setImages] = useState([]);

  // Define fetchImages outside of useEffect
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

  // Use useEffect to call fetchImages on component mount
  useEffect(() => {
    fetchImages();
  }, []);

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
};

export default GalleryPage;
