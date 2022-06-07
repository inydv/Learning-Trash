import React, { useEffect } from "react";
import Category from "../../Components/category/Category";
import Products from "../../Components/productList/Products";
import Slider from "../../Components/slider/Slider";
import Loading from "../../Components/loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  fetchingAllProducts,
} from "../../redux/product/productsApiCall";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchingAllProducts)
  }, [dispatch]);

  const { products, isFetching, error, productsCount } = useSelector(
    (state) => state.products
  );
  return (
    <div className="home">
      {isFetching ? (
        <Loading />
      ) : (
        <>
          <Slider />
          <Category />
          {products &&
            products
              // .slice(0, 8)
              .map((product) => (
                <Products product={product} key={product._id} />
              ))}
        </>
      )}
    </div>
  );
}

export default Home;
