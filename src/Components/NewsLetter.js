import React from "react";
import "../Styles/NewsLetter.css";

function NewsLetter() {
  return (
    <div className="newsLetter">
      <h1 className="heading">The Latest</h1>
      <p className="para">Sign up to receive news and updates.</p>
      <div className="inputContainer">
        <input type="email" placeholder="Email Address" className="mail" />
        <button className="btn">Sign up</button>
      </div>
    </div>
  );
}

export default NewsLetter;
