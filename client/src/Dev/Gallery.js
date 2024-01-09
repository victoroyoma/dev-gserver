import React from "react";
import "./Gallery.css";

function Gallery({ images }) {
  return (
    <div className="gallery">
      {images.map((image) => (
        <div key={image.id} className="image-card">
          <img src={image.image_url} alt={image.title} />
          <h3>{image.title}</h3>
          <p>{image.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Gallery;
