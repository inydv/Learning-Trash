import React, { useEffect, useRef, useState } from 'react'
import './Payment.css'
import CheckoutSteps from "../../../Components/checkoutSteps/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { CREATE_ORDER, CLEAR_ERRORS } from "../../../redux/order/newOrderApiCall";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { axiosJWT } from '../../../requestMethods';
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CLEAR_CART } from "../../../redux/cart/cartApiCall";
import Loading from "../../../Components/loading/Loading"

const Wrapper = ({ stripeApiKey }) => (
  <Elements stripe={loadStripe(stripeApiKey)}>
    <Payment />
  </Elements>
);

function Payment() {
  const navigate = useNavigate();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { currentUser, isFetching } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const [err, setErr] = useState(null);
  const [btnLoad, setBtnLoad] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;
    setBtnLoad(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axiosJWT.post(
        "/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: currentUser.name,
            email: currentUser.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        setBtnLoad(false);

        setErr(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(CREATE_ORDER(order));

          dispatch(CLEAR_CART());

          navigate("/success");
        } else {
          setErr("There's Some Issue While Processing Payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      setBtnLoad(false);
      setErr(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(CLEAR_ERRORS());
    }
  }, [dispatch, error]);

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <div>
          <CheckoutSteps activeStep={2} />
          <div className="paymentContainer">
            <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
              <Typography>Card Info</Typography>
              <div>
                <CreditCardIcon />
                <CardNumberElement className="paymentInput" />
              </div>
              <div>
                <EventIcon />
                <CardExpiryElement className="paymentInput" />
              </div>
              <div>
                <VpnKeyIcon />
                <CardCvcElement className="paymentInput" />
              </div>

              {err && <p className='err'>{err}</p>}

              <input
                type="submit"
                value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                ref={payBtn}
                className={btnLoad ? "btnLoading btnSpinner" : "paymentFormBtn"}
              />
            </form>
          </div>
        </div>)}
    </>
  )
}

export default Wrapper
