import React from "react";
import { Link } from "react-router-dom";

function ProductsList({ item }) {
  return (
    <>
      <Link exact to="/singlepage">
        <div className="productsList">
          <img src={item.img} alt="" className="image" />
        </div>
      </Link>
    </>
  );
}

export default ProductsList;
