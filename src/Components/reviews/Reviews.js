import React from "react";
import { Rating } from 'react-simple-star-rating';
import "./Reviews.css";

function Reviews({ review }) {
  const options = {
    size: window.innerWidth < 600 ? 20 : 25,
    readonly: true,
    initialValue: review.rating,
    allowFraction: true
  };

  return (
    <div className="reviewCard">
      <img
        src={review.image}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = "https://play-lh.googleusercontent.com/I-Yd5tJnxw7Ks8FUhUiFr8I4kohd9phv5sRFHG_-nSX9AAD6Rcy570NBZVFJBKpepmc=w240-h480-rw";
        }}
        alt="User Image"
      />
      <p>{review.name}</p>
      <Rating {...options} />
      <span>{review.comment}</span>
    </div>
  );
}

export default Reviews;
