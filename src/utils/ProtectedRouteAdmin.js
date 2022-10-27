import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { LOGOUT } from "../redux/user/userApiCall";

export default function ProtectedRouteAdmin() {
    const { isFetching, currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function not_admin_func() {
        dispatch(LOGOUT());
        navigate("/register")
    }

    return (
        isFetching === false && !currentUser ? navigate("/register") : currentUser.role !== "admin" ? not_admin_func() : <Outlet />
    )
}
