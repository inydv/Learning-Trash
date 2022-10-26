import React, { useEffect } from 'react';
import "./Dashboard.css";
import Sidebar from '../sidebar/Sidebar';
import { ADMIN_ALL_PRODUCT } from '../../../redux/product/productsApiCall';
import { ALL_ORDER } from '../../../redux/order/myOrderApiCall';
import { GET_ALL_USER } from '../../../redux/user/userApiCall';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ADMIN_ALL_PRODUCT());
    dispatch(ALL_ORDER());
    dispatch(GET_ALL_USER());
  }, [dispatch])

  const { adminProducts } = useSelector((state) => state.products);
  const { allUser } = useSelector((state) => state.user);
  const { allOrders } = useSelector((state) => state.myOrders);

  let outOfStock = 0;

  adminProducts && adminProducts.forEach((item) => {
    if (item.Stock === 0) {
      outOfStock += 1;
    }
  })

  let totalAmount = 0;

  allOrders &&
    allOrders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["red"],
        hoverBackgroundColor: ["rgb(197, 72, 49"],
        data: [0, totalAmount],
        borderColor: "white",
        fill: true,
      }
    ]
  }

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["red", "blue"],
        hoverBackgroundColor: ['red', 'blue'],
        data: [outOfStock, adminProducts && adminProducts.length - outOfStock],
      }
    ]
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboardContainer">
        <h1>Dashboard</h1>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Products</p>
              <p>{adminProducts && adminProducts.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{allOrders && allOrders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{allUser && allUser.length}</p>
            </Link>
          </div>
        </div>

        <div className="charts">
          <div className="lineChart">
            <Line data={lineState} />
          </div>

          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </div>
  )
}
