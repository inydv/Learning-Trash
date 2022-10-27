import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

export default function ProtectedRoute_User() {
    const { isFetching, currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    return (
        isFetching === false && !currentUser ? navigate("/register") : <Outlet />
    )
}
