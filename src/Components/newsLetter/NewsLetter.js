import React from "react";
import "./NewsLetter.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CHANGE_STATE } from "../../redux/newsLetter/newsLetterRedux";

function NewsLetter() {
  const TF = useSelector((state) => state.newsLetter.show);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(CHANGE_STATE());
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
                required
              />
              <button className="btn" type="submit">
                SIGN UP
              </button>
            </div>
          </form>
        </>
      ) : (
        <h1>Already Signed up...</h1>
      )}
    </div>
  );
}

export default NewsLetter;
