import React, { useEffect, useState } from "react";
import "./LogIn.css";
import { login, clearErrors } from "../../redux/auth/authApiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../Components/loading/Loading";

function LogIn() {
  const { isFetching, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    clearErrors(dispatch);
    window.scrollTo(0, 0);
  }, [dispatch]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };

  return (
    <div className="logIn">
      {isFetching ? (
        <Loading />
      ) : (
        <>
          <div className="bg"></div>
          <div className="wrapper">
            <div className="wraped">
              <form onSubmit={handleSubmit}>
                <div className="container">
                  <h6 className="signIn">SIGN IN</h6>
                  <input
                    type="text"
                    placeholder="Email"
                    className="username"
                    autoFocus={true}
                    onChange={(e) => setEmail(e.target.value)}
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
        </>
      )}
    </div>
  );
}

export default LogIn;
