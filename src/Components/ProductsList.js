import React from "react";

function ProductsList({ img }) {
  return (
    <div className="productsList">
        <img src={img} alt="" className="image" />
    </div>
  );
}

export default ProductsList;
