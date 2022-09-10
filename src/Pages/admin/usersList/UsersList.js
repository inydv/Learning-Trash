import React, {useEffect} from 'react'
import './UsersList.css'
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "../sidebar/Sidebar";
import { GET_ALL_USER, DELETE_USER } from "../../../redux/user/userApiCall";
import { CLEAR_ERROR } from "../../../redux/user/userRedux";
import { DataGrid } from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom"

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

    if (deleteUser) {
      navigate.push("/admin/users");
      // dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(GET_ALL_USER());
  }, [dispatch, alert, error, deleteUser]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

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
      minWidth: 150,
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
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
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
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
  )
}
