
import React from "react";
//"../styles/NotFound.css";
import { Link } from "react-router-dom";
//owo
export default function LandingPage() {
    return (
      <div className="notFound">
        <h1>Oh! seems we got lost</h1>
  
        <img src="https://i.ibb.co/VC2NbrX/404harsh.png" alt="404harsh" border="0" />
        
          <h2>Don't worry, click the button bellow and we'll be back home!</h2>
         
        
          <div>
          <Link to="./home" className="btnNF">
            <button>Here!</button>
          </Link>
        </div>
        
      </div>
    );
  }
  