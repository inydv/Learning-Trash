import { Facebook, Mail, PhoneAndroidOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { login } from "../redux/apiCalls";
import "../Styles/LogIn.css";
import { useDispatch, useSelector } from "react-redux";

function LogIn() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { isFetching, error } = useSelector((state) => state.user);

  const handleclick = (e) => {
    login(dispatch, { username, password });
  };

  return (
    <div className="logIn">
      <div className="bg"></div>
      <div className="wrapper">
        <div className="wraped">
          <div className="container">
            <h6 className="signIn">SIGN IN</h6>
            <input
              type="text"
              placeholder="Username"
              className="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="pw"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn" onClick={handleClick} disabled={isFetching}>
              LOGIN
            </button>
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
