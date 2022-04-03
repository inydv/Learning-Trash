import React, { useEffect, useState } from "react";
import { login } from "../redux/apiCalls";
import "../Styles/LogIn.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function LogIn() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { isFetching, error } = useSelector((state) => state.user);

  const handleclick = () => {
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
            <button className="btn" onClick={handleclick} disabled={isFetching}>
              SIGN IN
            </button>
            {error && <span className="span">Something Went Wrong...</span>}
            <a href="#" className="forgotPW">
              FORGOTTEN PASSWORD?
            </a>
            <Link to="/signup">
              <p className="forgotPW">SIGN UP?</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
