import React, { useEffect } from 'react';
import "../productList/ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "../sidebar/Sidebar";
import { DELETE_ORDER, ALL_ORDER, RESET_DELETE_ORDER } from "../../../redux/order/myOrderApiCall";
import { CLEAR_ERROR } from "../../../redux/order/myOrderRedux";
import Loading from "../../../Components/loading/Loading";

export default function OrderList() {
  const dispatch = useDispatch();

  const { error, allOrders: orders, isFetching, deleteOrder } = useSelector((state) => state.myOrders);

  const deleteOrderHandler = (id) => {
    dispatch(DELETE_ORDER(id));
  };

  useEffect(() => {
    if (error) {
      dispatch(CLEAR_ERROR());
    }

    if (deleteOrder) {
      dispatch(RESET_DELETE_ORDER())
    }

    dispatch(ALL_ORDER());
  }, [dispatch, error, deleteOrder]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 250, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
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
      minWidth: 100,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 100,
      type: "action",
      sortable: false,
      renderCell: (params) => {
        return (
          <div className='tableIcon'>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <div className="dashboard">
      <Sidebar />

      {isFetching ? (
        <Loading />
      ) : (
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            className="productListTable"
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
          />
        </div>)}
    </div>
  )
}
