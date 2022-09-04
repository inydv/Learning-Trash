import React, {useEffect} from 'react'
import './OrderDetails.css'
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GETTING_ORDER } from "../../../redux/order/myOrderApiCall";
import { CLEAR_ERROR } from "../../../redux/order/myOrderRedux";
import Loading from "../../../Components/loading/Loading";

function OrderDetails() {
  const { myOrder, error, isFetching } = useSelector((state) => state.myOrders);

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
                Order #{myOrder && myOrder._id}
              </h1>
              <h1>Shipping Info</h1>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{myOrder.user && myOrder.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {myOrder.shippingInfo && myOrder.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {myOrder.shippingInfo &&
                      `${myOrder.shippingInfo.address}, ${myOrder.shippingInfo.city}, ${myOrder.shippingInfo.state}, ${myOrder.shippingInfo.pinCode}, ${myOrder.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <h1>Payment</h1>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      myOrder.paymentInfo &&
                      myOrder.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {myOrder.paymentInfo &&
                    myOrder.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{myOrder.totalPrice && myOrder.totalPrice}</span>
                </div>
              </div>

              <h1>Order Status</h1>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      myOrder.orderStatus && myOrder.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {myOrder.orderStatus && myOrder.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <h1>Order Items:</h1>
              <div className="orderDetailsCartItemsContainer">
                {myOrder.orderItems &&
                  myOrder.orderItems.map((item) => (
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
