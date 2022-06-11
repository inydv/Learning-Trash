import React, { useEffect, useState } from "react";
// import "../login/LogIn.css";
import { Link } from "react-router-dom";
import { publicRequest } from "../../requestMethods";

function ResetPW() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFetching(true);
    try {
      const data = await publicRequest.post("/password-reset", { email });
      setMsg(data.message);
      setError("");
      setTimeout(function () {
        window.location.replace("/signin");
      }, 2000);
    } catch (error) {
      setIsFetching(false);
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
              <button className="btn" type="submit" disabled={isFetching}>
                RESET
              </button>
              {error && <span className="span">{error}</span>}
              {msg && <span className="span">{msg}</span>}
              <Link to="/signin">
                <p className="forgotPW">LOGIN?</p>
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

export default ResetPW;
