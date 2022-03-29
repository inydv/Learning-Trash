import React, { useEffect } from "react";
import "../Styles/SinglePage.css";
import {imagesLoop} from '../data';

function SinglePage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="singlePage">
      <div className="page" key={props.singlePageInfo[0].id}>
        <div className="imageContainer">
          {imagesLoop &&
            imagesLoop.map((item) => (
              <img src={item.img} alt="" className="image" />
            ))}
        </div>
        <div className="info">
          <h2 className="name">tshirt</h2>
          <p className="price">
            500
          </p>
          <p
          
            className="desc"
          >qwertyuiopasdfghjklzxcvbnm</p>
          <button
            className="btn"
           
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
