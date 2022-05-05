import React from "react";
import "./Card.css";



export default function Card({ title, image, diets, vegetarian, score }) {
  return (
    <div className="cardComp">
      <h3>{title}</h3>
      <img
        src={image}
        alt="delicious food"
        width="150px"
        height="150px"
      />
      <h5 className="typeOfD">Type of Diet:</h5>  
      
      <h5 className="diets">
        {diets}
        {vegetarian}
      </h5>
      <h5 className="typeOfD">Score:</h5>
      <h5 className="diets">
        
        {score}
      </h5>
    </div>
  );
}


