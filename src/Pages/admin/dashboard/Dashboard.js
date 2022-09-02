import React, { useEffect } from 'react';
import "./Dashboard.css";
import Navbar from '../../../Components/navbar/Navbar';
import Footer from '../../../Components/footer/Footer';
import Sidebar from '../sidebar/Sidebar';
import { useSelector, useDispatch } from "react-redux";
import { ADMIN_ALL_PRODUCT } from '../../../redux/product/productsApiCall';
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function Dashboard() {

  const dispatch = useDispatch();

  let outOfStock = 0;

  useEffect(() => {
    dispatch(ADMIN_ALL_PRODUCT());
  }, [dispatch])

  const { products } = useSelector((state) => state.products);

  products && products.forEach((item) => {
    if (item.Stock === 0) {
      outOfStock += 1;
    }
  })

  const lineState = {
    labels: ["initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49"],
        data: [0, 4000],
      }
    ]
  }

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "$6800B4"],
        hoverBackgroundColor: ['#4B5000', '#35014F'],
        data: [outOfStock, products && products.length - outOfStock],
      }
    ]
  }

  return (
    <div>
      <Navbar />

      <div className="dashboard">
        <Sidebar />

        <div className="dashboardContainer">
          <h1>Dashboard</h1>

          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> ₹2000
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Products</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>4</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>2</p>
              </Link>
            </div>
          </div>

          <div className="lineChart">
            <Line data={lineState} />
          </div>

          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>

        </div>
      </div>

      {/* <Footer /> */}
    </div>
  )
}
