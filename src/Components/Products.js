import React from "react";
import "../Styles/Products.css";
import { popularProducts } from "../data";
import ProductsList from "./ProductsList";

function Products() {
  return (
    <div className="products">
      {popularProducts &&
        popularProducts.map((item) => (
          <ProductsList img={item.img} key={item.id} />
        ))}
    </div>
  );
}

export default Products;
