import { Facebook, Mail, PhoneAndroidOutlined } from "@material-ui/icons";
import React from "react";
import "../Styles/LogIn.css";

function LogIn() {
  return (
    <div className="logIn">
      <div className="bg"></div>
      <div className="wrapper">
        <div className="wraped">
          <div className="container">
            <h6 className="signIn">SIGN IN</h6>
            <input type="text" placeholder="Username" className="username" />
            <input type="text" placeholder="Password" className="pw" />
            <button className="btn">LOGIN</button>
            <a href="#" className="forgotPW">
              FORGOTTEN PASSWORD?
            </a>
          </div>
          <div className="partition">
            <div className="line"></div>
            <div className="or">OR</div>
            <div className="line"></div>
          </div>
          <div className="signUp">
            <div className="phone">
              <PhoneAndroidOutlined className="icon" />
              CONTINUE WITH PHONE NUMBER
            </div>
            <div className="mail">
              <Mail className="icon" />
              MAIL
            </div>
            <div className="facebook">
              <Facebook className="icon" />
              FACEBOOK
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
