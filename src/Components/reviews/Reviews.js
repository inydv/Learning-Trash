import React from "react";
import { Rating } from 'react-simple-star-rating';
import "./Reviews.css";

function Reviews({ review }) {
  const options = {
    edit: false,
    color: "rgba(255, 255, 255,0.2)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };

  return (
    <div className="reviewCard">
      <img
        src="https://play-lh.googleusercontent.com/I-Yd5tJnxw7Ks8FUhUiFr8I4kohd9phv5sRFHG_-nSX9AAD6Rcy570NBZVFJBKpepmc=w240-h480-rw"
        alt="user"
      />
      <p>{review.name}</p>
      <Rating {...options} />
      <span>{review.comment}</span>
    </div>
  );
}

export default Reviews;
