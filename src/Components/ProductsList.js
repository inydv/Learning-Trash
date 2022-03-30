import React from "react";
import { Link } from "react-router-dom";

function ProductsList({ item }) {
  return (
    <>
      <Link to={`/singlepage/${item._id}`}>
        <div className="productsList">
          <img src={item.img} alt="" className="image" />
        </div>
      </Link>
    </>
  );
}

export default ProductsList;
