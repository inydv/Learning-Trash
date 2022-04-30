import React, { useState } from "react";
import "./NewsLetter.css";

function NewsLetter() {
  const [TF, setTF] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTF(false);
  };

  return (
    <div className="newsLetter">
      {TF ? (
        <>
          <h1 className="heading">The Latest</h1>
          <p className="para">Sign up to receive news and updates.</p>
          <form onSubmit={handleSubmit}>
            <div className="inputContainer">
              <input
                type="email"
                placeholder="Email Address"
                className="mail"
              />
              <button className="btn" type="submit">
                Sign up
              </button>
            </div>
          </form>
        </>
      ) : (
        <h1>Already Signed up</h1>
      )}
    </div>
  );
}

export default NewsLetter;
