import React, { useEffect, useState } from "react";
import Products from "../../Components/productList/Products";
import "./Shop.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  fetchingAllProducts,
} from "../../redux/product/productsApiCall";
import SearchIcon from "@material-ui/icons/Search";
import Loading from "../../Components/loading/Loading";

function Shop() {
  // const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   dispatch(fetchingAllProducts(keyword));
  // }, [dispatch, keyword]);


  const { products, isFetching, error, productsCount } = useSelector(
    (state) => state.products
  );

    const searchSubmitHandler = () => {
      // if (keyword.trim()) { // remove space
      //   window.location.replace(`/shop/${keyword}`);
      // } else {
      //   window.location.replace("/shop");
      // }
    }

  return (
    <div className="shop">
      <div className="container-item">
        <h1 className="whichShop">Products</h1>
        <div className="search">
          <input
            type="text"
            className="searchInput"
            placeholder="Search Here..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <SearchIcon className="searchIcon" onClick={searchSubmitHandler} />
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
            products
              .slice(0, 8)
              .map((product) => <Products product={product} key={product._id} />)}
        </>
      )}
    </div>
  );
}

export default Shop;
