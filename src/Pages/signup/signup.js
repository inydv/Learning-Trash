import React, { useEffect, useState } from "react";
import "../login/LogIn.css";
import { Link } from "react-router-dom";
import { publicRequest } from "../../requestMethods";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await publicRequest.post("/auth/signup", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/signin");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="logIn">
      <div className="bg"></div>
      <div className="wrapper">
        <div className="wraped">
          <form onSubmit={handleSubmit}>
            <div className="container">
              <h6 className="signIn">SIGN UP</h6>
              <input
                type="text"
                placeholder="Username"
                className="username"
                autoFocus={true}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="username"
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
              <button className="btn" type="submit">
                SIGNUP
              </button>
              {error && <span className="span">something went wrong!</span>}
              <Link to="/signin">
                <p className="forgotPW">Already Have Account?</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
