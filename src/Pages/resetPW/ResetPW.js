import React, { useEffect, useState } from "react";
import "../login/LogIn.css";
import { Link } from "react-router-dom";
import { publicRequest } from "../../requestMethods";

function ResetPW() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await publicRequest.post("/password-reset", { email });
      setMsg(data.message);
      setError("");
      window.location.replace("/signin");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
    }
  };

  return (
    <div className="logIn">
      <div className="bg"></div>
      <div className="wrapper">
        <div className="wraped">
          <form onSubmit={handleSubmit}>
            <div className="container">
              <h6 className="signIn">RESET PASSWORD</h6>
              <input
                type="email"
                placeholder="Email"
                className="username"
                autoFocus={true}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="btn" type="submit">
                RESET
              </button>
              <Link to="/signin">
                <p className="forgotPW">LOGIN?</p>
              </Link>
              <Link to="/signup">
                <p className="forgotPW">SIGN UP?</p>
              </Link>
            </div>
          </form>
          {error && <div>{error}</div>}
          {msg && <div>{msg}</div>}
        </div>
      </div>
    </div>
  );
}

export default ResetPW;
