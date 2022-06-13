import React, { useEffect, useState } from "react";
import "./ResetPW.css"
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearErrors } from "../../redux/auth/authApiCalls";
import { useNavigate } from "react-router-dom"
import Loading from "../../Components/loading/Loading"

function ResetPW() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isFetching, message } = useSelector((state) => state.user);

  const [email, setEmail] = useState("")

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <div>
      {isFetching ? (
        <Loading />
      ) : (
        <div>
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResetPW;
