import React, { useEffect } from 'react'
import "../productList/ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "../sidebar/Sidebar";
import { GET_ALL_USER, DELETE_USER } from "../../../redux/user/userApiCall";
import { CLEAR_ERROR } from "../../../redux/user/userRedux";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom"

export default function UsersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, allUser: users, isFetching, deleteUser } = useSelector((state) => state.user);

  const deleteUserHandler = (id) => {
    dispatch(DELETE_USER(id));
  };

  useEffect(() => {
    if (error) {
      dispatch(CLEAR_ERROR());
    }

    dispatch(GET_ALL_USER());
  }, [dispatch, error, deleteUser]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 250, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 100,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
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
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
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

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.username,
      });
    });
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="productListContainer">
        <h1 id="productListHeading">ALL USERS</h1>

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
  )
}
