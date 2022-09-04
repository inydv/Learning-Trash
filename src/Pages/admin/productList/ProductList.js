import React, {useEffect} from 'react'
import './ProductList.css';
import '../dashboard/Dashboard.css'
import {DataGrid} from '@material-ui/data-grid';
import {useSelector, useDispatch} from "react-redux";
import {ADMIN_ALL_PRODUCT, DELETE_PRODUCT} from '../../../redux/product/productsApiCall';
import {Link} from "react-router-dom";
import { Button } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "../sidebar/Sidebar";

export default function ProductList() {
    const dispatch = useDispatch();

    useEffect(() => {
        // if (error) {
        //     dispatch(clearErrors())
        // }

        dispatch(ADMIN_ALL_PRODUCT());
    }, [dispatch])

    const {adminProducts: products, error, isFetching} = useSelector((state) => state.products);

    const deleteProductHandler = (id) => {
        dispatch(DELETE_PRODUCT(id))
    }

    const columns =[
        {field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5},
        {field: "name", headerName: "Name", minWidth: 350, flex: 1,},
        {field: "stock", headerName: "Stock", type: "number", minWidth: 150, flex: 0.3},
        {field: "price", headerName: "Price", type: "number", minWidth: 270, flex: 0.5},
        {field: "actions", headerName: "Actions", type: "number", minWidth: 150, flex: 0.3, sortable: false,
        renderCell: (params) => {
            return (
                <div>
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
            stock: item.Stock,
            price: item.price,
            name: item.name,
        })
    })

  return (
    <div>

        <div className="dashboard">
            <Sidebar />
            <div className="productListContainer">
                <h1 className="productListHeading">ALL PRODUCTS</h1>

                <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
                 />
            </div>
        </div>
      
    </div>
  )
}
