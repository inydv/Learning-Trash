import React, { useEffect, useState } from "react";
import "./PWReset.css";
import { useDispatch, useSelector } from "react-redux";
import { RESET_PW, RESET_MESSAGE } from "../../../redux/user/userApiCall";
import { CLEAR_ERROR } from "../../../redux/user/userRedux";
import { useNavigate, useParams } from "react-router-dom"
import Loading from "../../../Components/loading/Loading"
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock"
import CryptoJS from "crypto-js";

function PWReset() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useParams();

    const { isUpdated, isFetching, error, currentUser } = useSelector((state) => state.user);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const hashedPW = CryptoJS.AES.encrypt(password, process.env.REACT_APP_CRYPTO_KEY).toString();
        const hashedCPW = CryptoJS.AES.encrypt(confirmPassword, process.env.REACT_APP_CRYPTO_KEY).toString();

        const myForm = new FormData();
        myForm.set("password", hashedPW);
        myForm.set("confirmPassword", hashedCPW);
        dispatch(RESET_PW(token.token, myForm));
    };

    useEffect(() => {
        if (currentUser) {
            navigate(`/`)
        }

        dispatch(CLEAR_ERROR());

        if (isUpdated) {
            navigate("/login");
        }

        dispatch(RESET_MESSAGE());
    }, [dispatch, navigate, isUpdated, currentUser]);

    return (
        <div>
            {isFetching ? (
                <Loading />
            ) : (
                <div>
                    <div className="resetPasswordContainer">
                        <div className="resetPasswordBox">
                            <h2 className="resetPasswordHeading">Update Password</h2>

                            <form
                                className="resetPasswordForm"
                                onSubmit={resetPasswordSubmit}
                            >
                                <div className="loginPassword">
                                    <LockOpenIcon className="Icon" />
                                    <input
                                        autoFocus={true}
                                        type="password"
                                        placeholder="New Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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

                                {error && (<p className="authError">{error}</p>)}

                                <input
                                    type="submit"
                                    value="Update"
                                    className="resetPasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PWReset;
