import React, { useEffect } from "react";
import "./Cart.css";
import CartList from "../../../Components/cartList/CartList";
import { useSelector, useDispatch } from "react-redux";
import { ADD_ITEMS_TO_CART, REMOVE_ITEMS_FROM_CART } from "../../../redux/cart/cartApiCall";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(ADD_ITEMS_TO_CART(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(ADD_ITEMS_TO_CART(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(REMOVE_ITEMS_FROM_CART(id));
  };

  const checkoutHandler = () => {
    navigate("/register?redirect=shipping");
  };

  return (
    <>
    <div className="cart">
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/shop">View Products</Link>
        </div>
      ) : (
        <>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartList item={item}
                    deleteCartItems={deleteCartItems}
                  />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${item.price * item.quantity
                    }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button
                  onClick={checkoutHandler}
                >Check Out</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    </>
  );
}

export default Cart;
