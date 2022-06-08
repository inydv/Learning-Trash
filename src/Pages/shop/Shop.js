import React, { useEffect } from "react";
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

function Shop() {
  const dispatch = useDispatch();
  const keyword = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchingAllProducts(keyword.keyword));
  }, [dispatch, keyword]);

  const { products, isFetching, error, productsCount } = useSelector(
    (state) => state.products
  );

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
            products
              .map((product) => (
                <Products product={product} key={product._id} />
              ))}
        </>
      )}
    </div>
  );
}

export default Shop;
