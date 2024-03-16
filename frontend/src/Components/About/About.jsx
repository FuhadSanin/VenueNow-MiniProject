import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  return (
      <div className="content">
        <Link to={"/sign"}>
          <button>SignUp</button>
        </Link>
        <Link to={"/"}>
          <button>Calender</button>
        </Link>
      </div>
  );
};

export default About;
