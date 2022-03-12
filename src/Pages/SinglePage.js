import React from "react";
import "../Styles/SinglePage.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import NewsLetter from "../Components/NewsLetter";

function SinglePage() {
  return (
    <div className="singlePage">
      <Navbar />
      <div className="page">
        <div className="imageContainer">
          <img
            src="https://www.burdastyle.com/pub/media/catalog/product/cache/7bd3727382ce0a860b68816435d76e26/107/BUS-PAT-BURTE-1320516/1170x1470_BS_2016_05_132_front.png"
            alt=""
            className="image"
          />
        </div>
        <div className="info">
          <h2 className="name">Envelope Clutch Tan</h2>
          <p className="price">$200.00</p>
          <p className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
            non? Voluptates at quam expedita dolores incidunt illum repudiandae,
            culpa corrupti aspernatur dolore doloribus suscipit aperiam,
            sapiente voluptatum voluptatem? Explicabo, necessitatibus!
          </p>
          <div className="quantity">
            <p>Quantity :</p>
            <input type="number" />
          </div>
          <button className="btn">Add To Cart</button>
        </div>
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default SinglePage;
