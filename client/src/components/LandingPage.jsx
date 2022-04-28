import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";
import "../assets/harshfood.png"

export default function LandingPage() {
  return (
    <div className="landing">
      <h1>Dinner time! <img src="https://i.ibb.co/FV56Lkx/harshfood.png" alt="harshfood" border="0" /> </h1>

      
      
        
       
      
      
      <div>
        <Link to="./home" className="btnLan">
          <button>Let's go!</button>
        </Link>
      </div>
      
    </div>
  );
}
