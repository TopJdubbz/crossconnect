import React from "react";
import "./ListBox.css";

function Card({ image, title, description }) {
  return (
    <div className="box-card">
      <img src={image} alt={title} className="box-image" />

      <div className="box-content">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}

export default Card;