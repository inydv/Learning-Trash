import React from "react";
import "../Styles/Category.css";
import MensCollection from "../Images/MensCollection.jpg";
import WomenCollection from "../Images/WomenCollection.jpg";
import { Link } from "react-router-dom";

function Category() {
  return (
    <div className="category">
      <div className="men">
        <Link exact to="/shop">
          <div className="imageContainer">
            <img src={MensCollection} alt="" className="image" />
          </div>
          <h1 className="info">MEN COLLECTION</h1>
        </Link>
      </div>
      <div className="women">
        <Link exact to="/shop">
          <div className="imageContainer">
            <img src={WomenCollection} alt="" className="image" />
          </div>
          <h1 className="info">WOMEN COLLECTION</h1>
        </Link>
      </div>
    </div>
  );
}

export default Category;
