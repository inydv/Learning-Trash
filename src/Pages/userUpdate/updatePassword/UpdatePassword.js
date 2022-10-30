import React, { useState, useEffect } from "react";
import "./UpdatePassword.css"
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PW } from "../../../redux/user/userApiCall";
import { UPDATE_ISUPDATED } from '../../../redux/user/userRedux'
import { CLEAR_ERRORS } from "../../../redux/user/userApiCall";
import { useNavigate } from "react-router-dom"
import Loading from "../../../Components/loading/Loading"
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import CryptoJS from "crypto-js";

function UpdatePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isUpdated, isFetching, error } = useSelector((state) => state.user);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const hashedOPW = CryptoJS.AES.encrypt(oldPassword, process.env.REACT_APP_CRYPTO_KEY).toString();
        const hashedNPW = CryptoJS.AES.encrypt(newPassword, process.env.REACT_APP_CRYPTO_KEY).toString();
        const hashedCPW = CryptoJS.AES.encrypt(confirmPassword, process.env.REACT_APP_CRYPTO_KEY).toString();

        const myForm = new FormData();
        myForm.set("oldPassword", hashedOPW);
        myForm.set("newPassword", hashedNPW);
        myForm.set("confirmPassword", hashedCPW);
        dispatch(UPDATE_PW(myForm));
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        if (error) {
            dispatch(CLEAR_ERRORS());
        }

        if (isUpdated) {
            navigate("/account");
            UPDATE_ISUPDATED(dispatch);
        }
    }, [dispatch, navigate, isUpdated, error]);

    return (
        <div>
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
                                    value="UPDATE"
                                    className="updatePasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UpdatePassword
