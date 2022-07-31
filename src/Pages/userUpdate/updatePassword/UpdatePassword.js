import React, { useState, useEffect } from "react";
import "./UpdatePassword.css"
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PW, ISUPDATED } from "../../../redux/user/userApiCall";
import { useNavigate } from "react-router-dom"
import Loading from "../../../Components/loading/Loading"
import Navbar from "../../../Components/navbar/Navbar";
import Footer from "../../../Components/footer/Footer";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock"
import VpnKeyIcon from "@material-ui/icons/VpnKey"

function UpdatePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isUpdated, isFetching } = useSelector((state) => state.user);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(UPDATE_PW(myForm));
    };

    useEffect(() => {
        // if (error) {
        //   dispatch(clearErrors());
        // }

        if (isUpdated) {
            navigate("/account");
            ISUPDATED(dispatch);
        }
    }, [dispatch, navigate, isUpdated]);
    return (
        <div>
            <Navbar />
            {isFetching ? (
                <Loading />
            ) : (
                <div>
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className="updatePasswordHeading">Update Profile</h2>

                            <form
                                className="updatePasswordForm"
                                onSubmit={updatePasswordSubmit}
                            >
                                <div className="loginPassword">
                                    <VpnKeyIcon className="Icon" />
                                    <input
                                        type="password"
                                        placeholder="Old Password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <LockOpenIcon className="Icon" />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <LockIcon className="Icon" />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="change"
                                    className="updatePasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    )
}

export default UpdatePassword
