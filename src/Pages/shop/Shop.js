import React, { useEffect, useState } from "react";
import Products from "../../Components/productList/Products";
import "./Shop.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  fetchingAllProducts,
} from "../../redux/product/productsApiCall";
import Loading from "../../Components/loading/Loading";
import Search from "../../Components/search/Search";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const categories = ["FootWear", "Bottom", "Tops"];

function Shop() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const keyword = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(
      fetchingAllProducts(keyword.keyword, currentPage, price, category, ratings)
    );
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  const { products, isFetching, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  return (
    <div className="shop">
      <div className="container-item">
        <h1 className="whichShop">Products</h1>
        <div className="search">
          <Search />
        </div>
        {/* <div className="filter">
          <span className="filterTitle">Sort:</span>
          <select className="select" onChange={(e) => setSort(e.target.value)}>
            <option className="option" value="newest">
              Newest
            </option>
            <option className="option" value="oldest">
              Oldest
            </option>
          </select>
        </div> */}
      </div>
      {isFetching ? (
        <Loading />
      ) : (
        <>
          {products &&
            products.map((product) => (
              <Products product={product} key={product._id} />
            ))}
        </>
      )}
      <div className="filterBox">
        <Typography>Price</Typography>
        <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={25000}
        />
        <Typography>Categories</Typography>
        <ul className="categoryBox">
          {categories.map((category) => (
            <li
              className="category-link"
              key={category}
              onClick={() => setCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
        <fieldset>
          <Typography component="legend">Ratings Above</Typography>
          <Slider
            value={ratings}
            onChange={(e, newRating) => {
              setRatings(newRating);
            }}
            aria-labelledby="continuous-slider"
            min={0}
            max={5}
          />
        </fieldset>
      </div>
      {resultPerPage < productsCount && (
        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="NEXT"
            prevPageText="PREV"
            firstPageText="1st"
            lastPageText="LAST"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </div>
  );
}

export default Shop;
