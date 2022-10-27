import React, { useEffect, useState } from 'react'
import './ProcessOrder.css';
import { Link, useParams } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { GETTING_ORDER, UPDATE_ORDER, RESET_UPDATE_ORDER } from "../../../redux/order/myOrderApiCall";
import { CLEAR_ERROR } from "../../../redux/order/myOrderRedux";
import { useSelector, useDispatch } from "react-redux";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import Loading from '../../../Components/loading/Loading';

export default function ProcessOrder() {
  const { singleOrder: order, error, isFetching, updateOrder } = useSelector((state) => state.myOrders);

  const params = useParams();

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(UPDATE_ORDER(params.id, myForm));
  };

  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      dispatch(CLEAR_ERROR());
    }

    if (updateOrder) {
      dispatch(RESET_UPDATE_ORDER());
    }

    dispatch(GETTING_ORDER(params.id));
  }, [dispatch, error, params.id, updateOrder]);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="newProductContainer">
        {isFetching ? (
          <Loading />
        ) : (
          <div
            className="confirmOrderPage"
            style={{
              display: order && order.orderStatus === "Delivered" ? "block" : "grid",
            }}
          >
            <div>
              <div className="confirmshippingArea">
                <h1>Shipping Info</h1>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Name:</p>
                    <span>{order && order.user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>
                      {order && order.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>
                      {order &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                </div>

                <h1>Payment</h1>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order &&
                          order.paymentInfo.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order &&
                        order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>

                  <div>
                    <p>Amount:</p>
                    <span>{order && order.totalPrice}</span>
                  </div>
                </div>

                <h1>Order Status</h1>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order && order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order && order.orderStatus}
                    </p>
                  </div>
                </div>
              </div>
              <div className="confirmCartItems">
                <h2>Your Cart Items:</h2>
                <div className="confirmCartItemsContainer">
                  {order &&
                    order.orderItems.map((item) => (
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
            {/*  */}
            <div
              style={{
                display: order && order.orderStatus === "Delivered" ? "none" : "block",
              }}
            >
              <form
                className="updateOrderForm"
                onSubmit={updateOrderSubmitHandler}
              >
                <h1>Process Order</h1>

                <div>
                  <AccountTreeIcon />
                  <select onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Choose Category</option>
                    {order && order.orderStatus === "Processing" && (
                      <option value="Shipped">Shipped</option>
                    )}

                    {order && order.orderStatus === "Shipped" && (
                      <option value="Delivered">Delivered</option>
                    )}
                  </select>
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={
                    isFetching ? true : false || status === "" ? true : false
                  }
                >
                  Process
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
