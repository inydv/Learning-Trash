import React from 'react'
import './OrderSuccess.css'
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

function OrderSuccess() {
    return (
        <div>
            <div className="orderSuccess">
            <CheckCircleIcon />

            <Typography>Your Order has been Placed successfully </Typography>
            <Link to="/MyOrders">View Orders</Link>
            </div>
        </div>
    )
}

export default OrderSuccess
