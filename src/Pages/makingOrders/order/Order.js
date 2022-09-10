import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";  // make table auto, we have to pass row and column only
import "./Order.css";
import { useSelector, useDispatch } from "react-redux";
import { MY_ORDER } from "../../../redux/order/myOrderApiCall";
import { CLEAR_ERROR } from "../../../redux/order/myOrderRedux";
import Loading from "../../../Components/loading/Loading";
import { Link } from "react-router-dom";
import LaunchIcon from "@material-ui/icons/Launch";

const MyOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
},[]);

  const { isFetching, error, myOrders: orders } = useSelector((state) => state.myOrders);
  const { currentUser: user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", flex: 1, },

    {
      field: "status",
      headerName: "Status",
      // minWidth: 150,
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
      // minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      // minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      // minWidth: 150,
      type: "actions",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`} className="linkColor" >
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
      {isFetching ? (
        <Loading />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            autoHeight
            density="compact" // for making compact table
            sx={{ // for borders
              '.MuiDataGrid-columnSeparator': {
                display: 'none',
                border: 'none'
              },
              '.MuiDataGrid-rowSeparator': {
                display: 'none',
                border: 'none'
              },
              '&.MuiDataGrid-root': {
                border: 'none',
              },
              '.MuiDataGrid-cell': {
                border: 'none'
              },             
            }}
            className="myOrdersTable"
          />
          <h6 id="myOrdersHeading">{user && user.username}'s Orders</h6>
        </div>
      )}
    </div>
  );
};

export default MyOrders;