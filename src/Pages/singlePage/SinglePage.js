import React, { useEffect, useState } from "react";
import "./SinglePage.css";
// import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { getProductDetails } from "../../redux/product/productsApiCall";
import ReactStars from "react-rating-stars-component";
import Reviews from "../../Components/reviews/Reviews";

function SinglePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();

  // const location = useLocation();
  // const id = location.pathname.split("/")[2];

  const id = useParams();

  useEffect(() => {
    dispatch(getProductDetails(id.id));
  }, [dispatch]);

  const { product, isFetching, error } = useSelector(
    (state) => state.product.product
  );

  const [quantity, setQuantity] = useState(1);

  const inc = () => {
    setQuantity(quantity + 1);
  };

  const dec = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const options = {
    edit: false,
    color: "rgba(255, 255, 255,0.2)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <>
    <div className="singlePage">
      <div>
        <Carousel>
          {product.img &&
            product.img.map((item, i) => (
              <img
                className="CarouselImage"
                key={item._id}
                src={item.url}
                alt={`${i} Slide`}
              />
            ))}
        </Carousel>
      </div>
      <div className="detailsBlock">
        <div className="detailsBlock-1">
          <h2>{product.title}</h2>
          <p>Product #{product._id}</p>
        </div>
        <div className="detailsBlock-2">
          <ReactStars {...options} />
          <span> ({product.numOfReviews} Reviews)</span>
        </div>
        <div className="detailsBlock-3">
          <h1>{`₹ ${product.price}`}</h1>
        </div>
        <div className="detailsBlock-4">
          <b>Description:</b>
          <p dangerouslySetInnerHTML={{ __html: `${product.desc}` }}></p>
        </div>
        <div className="detailsBlock-5">
          <p>
            Status :
            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
              {product.Stock < 1 ? " OutOfStock" : " InStock"}
            </b>
          </p>
        </div>
        <div className="detailsBlock-6">
          <button>-</button>
          <input type="number" value="1" />
          <button>+</button>
        </div>
        <div className="addToCart">
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
      <h1 className="reviewsHeading">REVIEWS</h1>
    <div className="review">
      {product.reviews && product.reviews[0] ? 
      (<div className="reviews">
        {
          product.reviews && product.reviews.map((review) => <Reviews review={review} />)
        }
      </div>) : (
        <p className="noReviews">No Reviews Yet</p>
      )}
    </div>
    </>
  );
}

export default SinglePage;
