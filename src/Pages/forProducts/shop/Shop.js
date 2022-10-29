import React, { useEffect, useState } from "react";
import "./Shop.css";
import Products from "../../../Components/productList/Products";
import Loading from "../../../Components/loading/Loading";
import Search from "../../../Components/search/Search";
import { useDispatch, useSelector } from "react-redux";
import { FETCHING_ALL_PRODUCT } from "../../../redux/product/productsApiCall";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const categories = ["men", "women"];

function Shop() {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(5);
  const [sort, setSort] = useState("oldest")

  const dispatch = useDispatch();
  const keyword = useParams();
  const query = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (query.search) {
      setCategory(query.search.split("=")[1]);
    }

    dispatch(
      FETCHING_ALL_PRODUCT(keyword.keyword, currentPage, price, category, ratings, sort)
    );

  }, [dispatch, keyword, currentPage, price, category, ratings, sort, query.search]);

  const { products, isFetching, error, productsCount, resultPerPage, filteredProductsCount } =
    useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const setCategoryFunc = (value) => {
    if (keyword.keyword) {
      navigate(`/shop/${keyword.keyword}?category=${value}`)
    } else {
      navigate(`/shop?category=${value}`)
    }
  }

  return (
    <>
      <div className="shop">
        <div className="container-item">
          <div className="topThings">
            <h1 className="shopTitle">Products</h1>
            <div className="search">
              <Search />
            </div>
          </div>
        </div>

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
          />

          <div className="forCategories">
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategoryFunc(category)}
                  style={{
                    color: query.search.split("=")[1] === category ? "red" : "white"
                  }}
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

        {isFetching ? (
          <Loading />
        ) : error ? (
          <div>
            <h1 className="error">Error : {error}</h1>
          </div>
        ) : (
          <div className="products">
            {products.length === 0 ? <h1 style={{ color: "red" }}>Oops! Not Any Related Products</h1> : products &&
              products.map((product) => (
                <Products product={product} key={product._id} />
              ))}
          </div>
        )}

        {resultPerPage < filteredProductsCount && (
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

      </div>
    </>
  );
}

export default Shop;
