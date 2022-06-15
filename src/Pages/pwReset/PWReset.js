import React, { useEffect, useState } from "react";
import "./PWReset.css";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword } from "../../redux/auth/authApiCalls";
import { useNavigate, useParams } from "react-router-dom"
import Loading from "../../Components/loading/Loading"
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock"

function PWReset() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useParams();

  const { isUpdated, isFetching } = useSelector((state) => state.user);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
      e.preventDefault();

      const myForm = new FormData();

      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword);
      dispatch(ResetPassword(token.token,myForm));
  };

  useEffect(() => {
      // if (error) {
      //   dispatch(clearErrors());
      // }

      if (isUpdated) {
          navigate("/login");
      }
  }, [dispatch, navigate, isUpdated]);
  return (
    <div>
    {isFetching ? (
        <Loading />
    ) : (
        <div>
            <div className="resetPasswordContainer">
                <div className="resetPasswordBox">
                    <h2 className="resetPasswordHeading">Update Profile</h2>

                    <form
                        className="resetPasswordForm"
                        onSubmit={resetPasswordSubmit}
                    >
                        <div className="loginPassword">
                            <LockOpenIcon className="Icon" />
                            <input
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
