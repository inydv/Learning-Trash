import React, { useEffect, useState } from "react";
import "./SinglePage.css";
import Reviews from "../../../Components/reviews/Reviews";
import Loading from "../../../Components/loading/Loading";
// import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GET_PRODUCT_DETAIL } from "../../../redux/product/productsApiCall";
import { ADD_ITEMS_TO_CART } from "../../../redux/cart/cartApiCall";
import { NEW_REVIEW, RESET_NEW_REVIEW } from '../../../redux/product/reviewApiCall';
import { CLEAR_ERRORS } from '../../../redux/product/reviewRedux';
import Carousel from "react-material-ui-carousel";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@material-ui/core";
import { Rating } from 'react-simple-star-rating';
import { sanitize } from 'dompurify';

function SinglePage() {
  const dispatch = useDispatch();
  const id = useParams();

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  }

  const { singleproduct: product, isFetching, error } = useSelector(
    (state) => state.products
  );

  const { error: reviewError, newReview } = useSelector(
    (state) => state.review
  )

  useEffect(() => {
    window.scrollTo(0, 0);

    if (reviewError) {
      dispatch(CLEAR_ERRORS());
    }

    if (newReview) {
      dispatch(RESET_NEW_REVIEW())
    }

    dispatch(GET_PRODUCT_DETAIL(id.id));
  }, [dispatch, id.id, reviewError, newReview]);

  // const location = useLocation();
  // const id = location.pathname.split("/")[2];


  const [quantity, setQuantity] = useState(1);

  const inc = () => {
    if (product.inStock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const dec = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    dispatch(ADD_ITEMS_TO_CART(id.id, quantity));
  }

  const options1 = {
    size: window.innerWidth < 600 ? 20 : 25,
    readonly: true,
    allowFraction: true
  };

  const options2 = {
    size: window.innerWidth < 600 ? 20 : 25,
  };

  const handleRating = (rate) => setRating(rate);

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating / 20);
    myForm.set("comment", comment);
    myForm.set("productId", id.id);

    dispatch(NEW_REVIEW(myForm));

    setOpen(false);
  }

  return (
    <div className="singlePage-head">
      {product ? (
        <>
          {
            error ? (

              <div>
                <h1 className="error">Error : {error}</h1>
              </div>

            ) : (<>
              {

                isFetching ? (

                  <Loading />

                ) : (
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
                          <Rating {...options1} initialValue={product.ratings} />
                          <span> ({product.numofReviews} Reviews)</span>
                        </div>

                        <div className="detailsBlock-3">
                          <h1>{`₹ ${product.price}`}</h1>
                        </div>

                        <div className="detailsBlock-4">
                          <b>Description:</b>
                          <p dangerouslySetInnerHTML={{ __html: sanitize(product.desc) }} ></p>
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
                          <button onClick={dec}>-</button>
                          <input type="number" defaultValue={quantity} />
                          <button onClick={inc}>+</button>
                        </div>

                        <div className="addToCart">
                          <button disabled={product.inStock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                        </div>

                        <div className="addReview">
                          <button onClick={
                            submitReviewToggle
                          }>Wanna Add Review?</button>
                        </div>

                      </div>
                    </div>

                    <h1 className="reviewsHeading">REVIEWS</h1>

                    <Dialog aria-labelledby="simple-dialog-title"
                      open={open}
                      onClose={submitReviewToggle} >
                      <DialogTitle>Submit Review</DialogTitle>

                      <DialogContent className="submitDialog">
                        <Rating {...options2} onClick={handleRating} />

                        <textarea
                          className="submitDialogTextArea"
                          cols="30"
                          rows="5"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </DialogContent>

                      <DialogActions>
                        <Button onClick={submitReviewToggle}>Cancel</Button>
                        <Button onClick={reviewSubmitHandler}>Submit</Button>
                      </DialogActions>
                    </Dialog>

                    <div className="review">
                      {product.reviews && product.reviews[0] ?
                        (<div className="reviews">
                          {
                            product.reviews && product.reviews.map((review) => <Reviews key={review._id} review={review} />)
                          }
                        </div>) : (
                          <p className="noReviews">No Reviews Yet</p>
                        )}
                    </div>

                  </>
                )
              }

            </>)
          }
        </>
      ) : <div>
        <h1 className="error">Oops!! Seems To Be Offline</h1>
      </div>}
    </div>
  );
}

export default SinglePage;
