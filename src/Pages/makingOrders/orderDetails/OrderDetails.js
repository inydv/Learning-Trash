import React, {useEffect} from 'react'
import './OrderDetails.css'
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GETTING_ORDER } from "../../../redux/order/myOrderApiCall";
import { CLEAR_ERROR } from "../../../redux/order/myOrderRedux";
import Loading from "../../../Components/loading/Loading";

function OrderDetails() {
  const { singleOrder, error, isFetching } = useSelector((state) => state.myOrders);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (error) {
      dispatch(CLEAR_ERROR());
    }

    dispatch(GETTING_ORDER(params.id));
  }, [dispatch, error, params.id]);

  return (
    <div>
      {isFetching ? (
        <Loading />
      ) : (
        <div>
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <h1 component="h1">
                Order #{singleOrder && singleOrder._id}
              </h1>
              <h1>Shipping Info</h1>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name: </p>
                  <span>{singleOrder && singleOrder.user.username}</span>
                </div>
                <div>
                  <p>Phone: </p>
                  <span>
                    {singleOrder && singleOrder.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address: </p>
                  <span>
                    {`${singleOrder && singleOrder.shippingInfo.address}, ${singleOrder && singleOrder.shippingInfo.city}, ${singleOrder && singleOrder.shippingInfo.state}, ${singleOrder && singleOrder.shippingInfo.pinCode}, ${singleOrder && singleOrder.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <h1>Payment</h1>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      singleOrder &&
                      singleOrder.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {singleOrder &&
                    singleOrder.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount: </p>
                  <span>{singleOrder && singleOrder.totalPrice}</span>
                </div>
              </div>

              <h1>Order Status</h1>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      singleOrder && singleOrder.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {singleOrder && singleOrder.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <h1>Order Items</h1>
              <div className="orderDetailsCartItemsContainer">
                {singleOrder &&
                  singleOrder.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderDetails
