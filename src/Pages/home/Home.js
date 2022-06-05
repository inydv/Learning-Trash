import React, { useEffect } from "react";
import Category from "../../Components/category/Category";
import Products from "../../Components/productList/Products";
import Slider from "../../Components/slider/Slider";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  fetchingProducts,
} from "../../redux/product/productsApiCall";

function Home() {
  const dispatch = useDispatch();

  const { products, isFetching, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    fetchingProducts(dispatch);
  }, [dispatch]);

  return (
    <div className="home">
      <Slider />
      <Category />
      <Products products={products} />
    </div>
  );
}

export default Home;
