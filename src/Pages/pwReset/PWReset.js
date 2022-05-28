import React, { useEffect, useState } from "react";
import "../login/LogIn.css";
import { useParams } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import axios from "axios";

function PWReset() {
  const [validUrl, setValidUrl] = useState(false);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
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
    try {
      const data = await publicRequest.post(
        `/password-reset/${param.id}/${param.token}`,
        { password }
      );
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
                  <button className="btn" type="submit">
                    CLICK
                  </button>
                </div>
              </form>
              {error && <div>{error}</div>}
              {msg && <div>{msg}</div>}
            </div>
          </div>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </div>
  );
}

export default PWReset;
