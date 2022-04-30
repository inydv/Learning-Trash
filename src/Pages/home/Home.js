import React from "react";
import Category from "../../Components/category/Category";
import Products from "../../Components/productList/Products";
import Slider from "../../Components/slider/Slider";
import Navbar from "../../Components/navbar/Navbar";
import NewsLetter from "../../Components/newsLetter/NewsLetter";
import Footer from "../../Components/footer/Footer";

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
