import React from 'react'
import "./CartList.css"
import { Link } from "react-router-dom"

function CartList({ item, deleteCartItems }) {
  return (
    <div className='cartList'>
      <img src={item.image} alt="" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  )
}

export default CartList
