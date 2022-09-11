import React, { useEffect } from 'react'
import './ProductList.css';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from "react-redux";
import { ADMIN_ALL_PRODUCT, DELETE_PRODUCT } from '../../../redux/product/productsApiCall';
import { Link } from "react-router-dom";
import { Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "../sidebar/Sidebar";

export default function ProductList() {
  const dispatch = useDispatch();

  const { adminProducts: products, error, isFetching, deleteProduct } = useSelector((state) => state.products);

  useEffect(() => {
    // if (error) {
    //     dispatch(clearErrors())
    // }

    dispatch(ADMIN_ALL_PRODUCT());
  }, [dispatch, error, deleteProduct])

  const deleteProductHandler = (id) => {
    console.log("here")
    dispatch(DELETE_PRODUCT(id))
  }

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 250, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 300, flex: 1, },
    { field: "stock", headerName: "Stock", type: "number", minWidth: 100, flex: 0.3 },
    { field: "price", headerName: "Price", type: "number", minWidth: 100, flex: 0.5 },
    {
      field: "actions", headerName: "Actions", type: "action", minWidth: 100, flex: 0.3, sortable: false,
      renderCell: (params) => {
        return (
          <div className='tableIcon'>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}>
              <DeleteIcon />
            </Button>
          </div>
        )
      }
    }
  ]

  const rows = [];

  products && products.forEach((item) => {
    rows.push({
      id: item._id,
      stock: item.inStock,
      price: item.price,
      name: item.title,
    })
  })

  return (
    <div>
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
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
        </div>
      </div>

    </div>
  )
}
