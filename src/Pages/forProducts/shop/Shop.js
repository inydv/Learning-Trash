import React, { useEffect, useState } from "react";
import "./Shop.css";
import Products from "../../../Components/productList/Products";
import Loading from "../../../Components/loading/Loading";
import Search from "../../../Components/search/Search";
import Navbar from "../../../Components/navbar/Navbar";
import Footer from "../../../Components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { FETCHING_ALL_PRODUCT } from "../../../redux/product/productsApiCall";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const categories = ["FootWear", "Bottom", "Tops"];

function Shop() {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [sort, setSort] = useState("oldest")

  const dispatch = useDispatch();
  const keyword = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(
      FETCHING_ALL_PRODUCT(keyword.keyword, currentPage, price, category, ratings, sort)
    );
  }, [dispatch, keyword, currentPage, price, category, ratings, sort]);

  const { products, isFetching, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (newPrice) => {
    setPrice(newPrice);
  };

  return (
    <>
      <Navbar />
      <div className="shop">
        <div className="container-item">
          {error ? (
            <div>
              <h1 className="error">Error : {error}</h1>
            </div>
          ) : (
            <>
              <div className="topThings">
                <h1 className="shopTitle">Products</h1>

                <div className="search">
                  <Search />
                </div>
              </div>
            </>
          )}

        </div>

        {isFetching ? (
          <Loading />
        ) : (
          <div className="products">
            {products &&
              products.map((product) => (
                <Products product={product} key={product._id} />
              ))}
          </div>
        )}

        {resultPerPage < productsCount && (
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="NEXT"
              prevPageText="PREV"
              firstPageText="FIRST"
              lastPageText="LAST"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        )}

        {!error && (<>
          <div className="lineSketch"></div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
              style={{ "backgroundColor": "black" }}
            />

            <div className="forCategories">
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
            </div>

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

            <div className="sort">
              <Typography component="legend">Sort</Typography>
              <select className="select" onChange={(e) => setSort(e.target.value)}>
                <option className="option" value="oldest">
                  Oldest
                </option>
                <option className="option" value="newest">
                  Newest
                </option>
              </select>
            </div>
          </div>
          <div className="lineSketch"></div>
        </>
        )}

      </div>
      <Footer />
    </>
  );
}

export default Shop;
