import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";  // make table auto, wehave to pass row and column only
import "./Order.css";
import Navbar from "../../../Components/navbar/Navbar";
import Footer from "../../../Components/footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { MY_ORDER } from "../../../redux/order/myOrderApiCall";
import { CLEAR_ERROR } from "../../../redux/order/myOrderRedux";
import Loading from "../../../Components/loading/Loading";
import { Link } from "react-router-dom";
import LaunchIcon from "@material-ui/icons/Launch";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { isFetching, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user.currentUser);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      dispatch(CLEAR_ERROR());
    }

    dispatch(MY_ORDER());
  }, [dispatch, error]);

  return (
    <div>
      <Navbar />

      {isFetching ? (
        <Loading />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <h1 id="myOrdersHeading">{user.username}'s Orders</h1>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MyOrders;