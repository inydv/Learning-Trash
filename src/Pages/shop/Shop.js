import React, { useEffect, useState } from "react";
import Products from "../../Components/productList/Products";
import "./Shop.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  fetchingProducts,
} from "../../redux/product/productsApiCall";
import SearchIcon from '@material-ui/icons/Search';

function Shop() {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchingProducts(dispatch);
  }, [dispatch]);

  const [sort, setSort] = useState("newest");

  const { products, isFetching, error, productsCount } = useSelector(
    (state) => state.products
  );

  return (
    <div className="shop">
      <div className="container-item">
        <h1 className="whichShop">Products</h1>
        <div className="search">
          <input type="text" className="searchInput" placeholder="Search Here..." />
          <SearchIcon className="searchIcon" />
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
      <Products products={products} />
    </div>
  );
}

export default Shop;
