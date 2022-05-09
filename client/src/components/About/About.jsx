
import React from "react";
import linkedin from "../../assets/linkedin.png";
import github from "../../assets/github.png";
import { Link } from "react-router-dom";
import harshfood from  "../../assets/harshfood.png"
import "./About.css"

export default function About () {
  return (
      <div className="body">
    <div className="container">
      <main className="main">
        <Link to="/home">
          <button>Take me home</button>
        </Link>
        <h1>About me</h1>
        <p>Hello! I am sam, the web developer behind this SPA.</p>
        <p>
          This SPA was made as my personal project for Henry's fullstack web developer bootcamp.
        </p>
        <br></br>
        <p>
          I developed all of its backend, frontend and DB. <br></br>
          During this proccess, I worked with a stack of technollogies that included:<br></br>
          React, Redux, Nodejs, vanilla Javascript, Node Express, Sequelize <br></br>
          Jest, Postgre, SQL, Postman, among others.
        </p>
        <p>
         You can find my Social Media bellow:
        </p>
        <div className='images'>
          <a
            rel="noreferrer"
            href="https://www.linkedin.com/in/samuel-ricardo-centeno-21a4aa214/"
            target="_blank"
          >
            <img alt="linkedin" src={linkedin} />
          </a>
          <a
            rel="noreferrer"
            href="https://github.com/harshtiger"
            target="_blank"
          >
            <img alt="github" src={github} />
          </a>
        </div>
      </main>
      <aside className="harsh">
        <img alt="bone" src={harshfood} />
      </aside>
    </div>
    </div>
  );
};

