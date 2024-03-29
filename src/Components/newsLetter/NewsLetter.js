import React from "react";
import "./NewsLetter.css";

function NewsLetter() {

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="newsLetter">
      <h1 className="heading">The Latest</h1>
      <p className="para">Sign up to receive news and updates.</p>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <input
            type="email"
            placeholder="Email Address"
            className="mail"
            required
          />
          <button className="btn">
            SIGN UP
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewsLetter;
