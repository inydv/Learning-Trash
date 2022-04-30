import React, { useEffect } from "react";
import "../login/LogIn.css";
import { Link } from "react-router-dom";

function Signup() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="logIn">
      <div className="bg"></div>
      <div className="wrapper">
        <div className="wraped">
          <div className="container">
            <h6 className="signIn">SIGN UP</h6>
            <input type="text" placeholder="Username" className="username" />
            <input type="text" placeholder="Email" className="username" />
            <input type="password" placeholder="Password" className="pw" />
            <button className="btn">SIGNUP</button>
            <Link to="/signin">
              <p className="forgotPW">Already Have Account?</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
