import React from "react";
import Category from "../Components/Category";
import Products from "../Components/Products";
import Slider from "../Components/Slider";
import Navbar from "../Components/Navbar";
import NewsLetter from "../Components/NewsLetter";
import Footer from "../Components/Footer";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <Slider />
      <Category />
      <Products />
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default Home;
