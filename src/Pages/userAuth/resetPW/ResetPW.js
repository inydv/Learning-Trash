import React, { useEffect, useState } from "react";
import "./ResetPW.css"
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { FORGOT_PW, RESET_MESSAGE } from "../../../redux/user/userApiCall";
import { CLEAR_ERROR } from "../../../redux/user/userRedux";
import { Link, useNavigate } from "react-router-dom"
import Loading from "../../../Components/loading/Loading"

function ResetPW() {
  const dispatch = useDispatch();

  const { error, isFetching, message, currentUser } = useSelector((state) => state.user);

  const [email, setEmail] = useState("")

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(FORGOT_PW(myForm));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate(`/`)
    }

    dispatch(CLEAR_ERROR());

    dispatch(RESET_MESSAGE());
  }, [dispatch, currentUser, navigate]);

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
                    autoFocus={true}
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <Link to="/register">Back To LogIn ?</Link>

                {error && (<p className="authError">{error}</p>)}
                {message && (<p className="authError">{message}</p>)}

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
