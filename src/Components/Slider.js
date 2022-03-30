import React, { useState, useEffect } from "react";
import "../Styles/Slider.css";
import { sliderItems } from "../data";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";

function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);

  function handleClick(direction) {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else if (direction === "right") {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  }

  useEffect(() => {
    const time = setTimeout(() => {
      handleClick("right");
    }, 5000);
    return () => clearInterval(time);
  });

  return (
    <div className="slider">
      <div className="arrow leftArrow" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </div>
      <div
        className="wrapper"
        style={{ transform: `translate(${slideIndex * -100}vw)` }}
      >
        {sliderItems &&
          sliderItems.map((item) => (
            <div
              className="slide"
              key={item.id}
              style={{ backgroundColor: `#${item.bg}` }}
            >
              <div className="imageContainer">
                <img src={item.img} alt="" className="image" />
              </div>
              <div className="info">
                <h1 className="title">{item.title}</h1>
                <p className="desc">{item.desc}</p>
                <Link to="/shop">
                  <button className="btn">SHOP NOW</button>
                </Link>
              </div>
            </div>
          ))}
      </div>
      <div className="arrow rightArrow" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </div>
    </div>
  );
}

export default Slider;
