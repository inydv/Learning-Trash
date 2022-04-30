import React, { useEffect, useState } from "react";
import "./SinglePage.css";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { addProduct } from "../../redux/cartRedux";
import { useDispatch } from "react-redux";
import Navbar from "../../Components/navbar/Navbar";
import NewsLetter from "../../Components/newsLetter/NewsLetter";
import Footer from "../../Components/footer/Footer";

function SinglePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [singlePageProduct, setSinglePageProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/" + id);
        setSinglePageProduct(res.data);
      } catch (err) {}
    };
    getProduct();
  }, [id]);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({ ...singlePageProduct, quantity }));
  };

  const inc = () => {
    setQuantity(quantity + 1);
  };

  const dec = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="singlePage">
      <Navbar />
      <div className="page">
        <div className="imageContainer">
          {/* {singlePageProduct &&
            singlePageProduct.map((item) => (
              <img src={item.img} alt="" className="image" />
            ))} */}
          <img src={singlePageProduct.img} alt="" className="image" />
        </div>
        <div className="info">
          <h2 className="name">{singlePageProduct.title}</h2>
          <p className="price">{singlePageProduct.price}</p>
          <p className="desc">{singlePageProduct.desc}</p>
          <div className="quantity">
            <p className="dec" onClick={dec}>
              -
            </p>
            <p className="num">{quantity}</p>
            <p className="inc" onClick={inc}>
              +
            </p>
          </div>
          <button className="btn" onClick={handleClick}>
            Add To Cart
          </button>
        </div>
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default SinglePage;
