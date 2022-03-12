import React from "react";
import "../Styles/SinglePage.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import NewsLetter from "../Components/NewsLetter";
import { imagesLoop } from "../data";

function SinglePage() {
  return (
    <div className="singlePage">
      <Navbar />
      <div className="page">
        <div className="imageContainer">
          {imagesLoop &&
            imagesLoop.map((item) => (
              <img
                src={item.img}
                alt=""
                className="image"
              />
            ))}
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
            <input defaultValue='1' min='1' max='5' type="number" required/>
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
