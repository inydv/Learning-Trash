import React from "react";
import { Link } from "react-router-dom";

function ProductsList({ img }) {
  return (
    <>
      <Link exact to="/singlepage">
        <div component={Link} to="/singlepage" className="productsList">
          <img src={img} alt="" className="image" />
        </div>
      </Link>
    </>
  );
}

export default ProductsList;
