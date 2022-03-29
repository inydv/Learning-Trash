import React, { useEffect } from "react";
import "../Styles/Shop.css";

function Shop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="shop">
      <h1 className="whichShop">mens</h1>
    </div>
  );
}

export default Shop;
