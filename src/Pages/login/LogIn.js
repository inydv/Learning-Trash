import React, { useEffect, useState } from "react";
import "./LogIn.css";
import { login, reload } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function LogIn() {
  const { isFetching, error } = useSelector((state) => state.user);

  useEffect(() => {
    reload(dispatch);
    window.scrollTo(0, 0);
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <div className="logIn">
      <div className="bg"></div>
      <div className="wrapper">
        <div className="wraped">
          <form onSubmit={handleSubmit}>
            <div className="container">
              <h6 className="signIn">SIGN IN</h6>
              <input
                type="text"
                placeholder="Username"
                className="username"
                autoFocus={true}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="pw"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className="btn" type="submit" disabled={isFetching}>
                SIGN IN
              </button>
              {error && <span className="span">Wrong credentials...</span>}
              <Link to="/reset-password">
                <p className="forgotPW">RESET PASSWORD?</p>
              </Link>
              <Link to="/signup">
                <p className="forgotPW">SIGN UP?</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
