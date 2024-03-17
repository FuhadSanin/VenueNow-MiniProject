import React from "react";
import "./SignUp.css";

function SignUp() {
  return (
    <div className="signup-container">
      <div className="wrapper">
        <h1>Sign Up</h1>
        <form action="#">
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
        </form>
        <button>Sign Up</button>
        <div className="member">
          <a href="#">Forget password?</a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
