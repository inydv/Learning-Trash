import React, { useEffect } from "react";
import "./Home.css"
import Category from "../../Components/category/Category";
import Products from "../../Components/productList/Products";
import Slider from "../../Components/slider/Slider";
import Loading from "../../Components/loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchingAllProducts } from "../../redux/product/productsApiCall";

function Home() {
  const dispatch = useDispatch();

  const { products, isFetching, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchingAllProducts)
  }, [dispatch]);

  console.log(error)
  return (
    <div className="home">
      {isFetching ? (
        <Loading />
      ) : (
        <>
          <Slider />
          <Category />
          <div className="product">
            {products &&
              products
                // .slice(0, 8) // why didn't use this?? becz we use pagination
                .map((product) => (
                  <Products product={product} key={product._id} />
                ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
