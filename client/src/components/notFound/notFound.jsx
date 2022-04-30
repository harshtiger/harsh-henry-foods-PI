
import React from "react";

import { Link } from "react-router-dom";
import "./NotFound.css";





export default function NotFound() {
  return (
    <div className="notf">
      <h1>Oh... looks like we're lost...  </h1>

      
      <img src="https://i.ibb.co/VC2NbrX/404harsh.png" alt="404harsh" border="0"/>
        
       <h2>But no worries... I know the way back home! just click the button bellow!</h2>
      
      
      <div>
        <Link to="./home" className="btnLan">
          <button>Let's go!</button>
        </Link>
      </div>
      
    </div>
  );
}
