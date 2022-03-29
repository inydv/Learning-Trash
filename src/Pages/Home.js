import React from "react";
import Category from "../Components/Category";
import Products from "../Components/Products";
import Slider from "../Components/Slider";

function Home() {
  return (
    <div className="home">
      <Slider />
      <Category />
      <Products />
    </div>
  );
}

export default Home;
