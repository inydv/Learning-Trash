import React, { useEffect } from "react";
import "./Home.css"
import Category from "../../../Components/category/Category";
import Products from "../../../Components/productList/Products";
import Slider from "../../../Components/slider/Slider";
import Loading from "../../../Components/loading/Loading";
import Navbar from "../../../Components/navbar/Navbar";
import Footer from "../../../Components/footer/Footer";
import NewsLetter from "../../../Components/newsLetter/NewsLetter";
import { useDispatch, useSelector } from "react-redux";
import { FETCHING_ALL_PRODUCT } from "../../../redux/product/productsApiCall"

function Home() {
  const dispatch = useDispatch();

  const { products, isFetching, error } = useSelector(
    (state) => state.products
  );

  const show = useSelector((state) => state.newsLetter.show);

  useEffect(() => {
    const keyword = ""
    const currentPage = 1
    const price = [0, 25000]
    const category = ""
    const ratings = 0
    const sort = "oldest"
    dispatch(FETCHING_ALL_PRODUCT(keyword, currentPage, price, category, ratings, sort))
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="home">
        {isFetching ? (
          <Loading />
        ) : (
          <>
            <Slider />
            <Category />{
              error ? (<div>
                <h1 className="error">Error : {error}</h1>
              </div>) : (
                <div className="product">
                  {products &&
                    products
                      // .slice(0, 8) // why didn't use this?? becz we use pagination
                      .map((product) => (
                        <Products product={product} key={product._id} />
                      ))}
                </div>
              )
            }
          </>
        )}
      </div>
      {show === true ? <NewsLetter /> : ""}
      <Footer />
    </>
  );
}

export default Home;
