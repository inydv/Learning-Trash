import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Products from "../Components/Products";
import "../Styles/Shop.css";
import Navbar from "../Components/Navbar";
import NewsLetter from "../Components/NewsLetter";
import Footer from "../Components/Footer";

function Shop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const cat = location.pathname.split("/")[2].toLowerCase();

  const [sort, setSort] = useState("newest");

  return (
    <div className="shop">
      <Navbar />
      <div className="container-item">
        <h1 className="whichShop">{cat.toUpperCase()}</h1>
        <div className="filter">
          <span className="filterTitle">Sort:</span>
          <select className="select" onChange={(e) => setSort(e.target.value)}>
            <option className="option" value="newest">
              Newest
            </option>
            <option className="option" value="oldest">
              Oldest
            </option>
            <option className="option" value="asc">
              Price (asc)
            </option>
            <option className="option" value="desc">
              Price (desc)
            </option>
          </select>
        </div>
      </div>
      <Products cat={cat} sort={sort} />
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default Shop;
