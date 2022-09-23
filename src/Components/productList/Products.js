import React from "react";
import "./Products.css";
import { Link } from "react-router-dom";

function Products({ product }) {
  return (
    <div key={product._id}>
      <Link to={`/product/${product._id}`}>
        <div className="productsList">
          <div className="product-card__promotion">
            <p>{`₹ ${product.price}`}</p>
          </div>

          <img src={product.img[0].url} alt="" className="image" />
        </div>
      </Link>
    </div>
  );
}

export default Products;
