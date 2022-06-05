import React from "react";
import "./Products.css";
import { Link } from "react-router-dom";

function Products({ products }) {
  return (
    <div className="products">
      {products &&
        products
          // .slice(0, 8)
          .map((item) => (
            <Link to={`/singlepage/${item._id}`}>
              <div className="productsList">
                <img src={item.img[0].url} alt="" className="image" />
              </div>
            </Link>
          ))}
    </div>
  );
}

export default Products;
