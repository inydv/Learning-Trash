import React from 'react'
import './OrderSuccess.css'
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Navbar from "../../../Components/navbar/Navbar";
import Footer from "../../../Components/footer/Footer";

function OrderSuccess() {
    return (
        <div>
            <Navbar />
            <CheckCircleIcon className="orderSuccess" />

            <Typography>Your Order has been Placed successfully </Typography>
            <Link to="/orders">View Orders</Link>
            <Footer />
        </div>
    )
}

export default OrderSuccess
