import React, { useEffect, useState } from "react";
// import "../login/LogIn.css";
import { useParams } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import axios from "axios";

function PWReset() {
  const [validUrl, setValidUrl] = useState(false);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const param = useParams();
  const url = `http://localhost:5000/password-reset/${param.id}/${param.token}`;

  useEffect(() => {
    const verifyUrl = async () => {
      try {
        await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [param, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFetching(true);
    try {
      const data = await publicRequest.post(
        `/password-reset/${param.id}/${param.token}`,
        { password }
      );
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
    <div>
      {validUrl ? (
        <div className="logIn">
          <div className="bg"></div>
          <div className="wrapper">
            <div className="wraped">
              <form onSubmit={handleSubmit}>
                <div className="container">
                  <h6 className="signIn">PASSWORD</h6>
                  <input
                    type="password"
                    placeholder="New PassWord"
                    className="username"
                    autoFocus={true}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button className="btn" type="submit" disabled={isFetching}>
                    CLICK
                  </button>
                  {error && <span className="span">{error}</span>}
                  {msg && <span className="span">{msg}</span>}
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            height: "100vh",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "red", fontSize: "100px" }}>404</span>
          <p style={{ fontSize: "50px" }}>Not Found</p>
        </div>
      )}
    </div>
  );
}

export default PWReset;
