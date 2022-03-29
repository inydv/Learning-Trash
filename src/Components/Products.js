import React from "react";
import "../Styles/Products.css";
import ProductsList from "./ProductsList";
import { popularProducts } from "../data";

function Products() {
  return (
    <div className="products">
      {popularProducts &&
        popularProducts.map((item) => (
          <ProductsList item={item} key={item.id} />
        ))}
    </div>
  );
}

export default Products;
