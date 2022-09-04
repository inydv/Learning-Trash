import React, {useState, useEffect} from 'react';
import './UpdateUser.css';
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Sidebar from "../sidebar/Sidebar";
import { GET_USER_DETAILS, UPDATE_USER } from "../../../redux/user/userApiCall";
import { CLEAR_ERROR } from "../../../redux/user/userRedux";
import Loading from "../../../Components/loading/Loading";
import {useNavigate, useParams} from "react-router-dom";

export default function UpdateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { isFetching, error, singleUser: user, updateUser } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(GET_USER_DETAILS(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      dispatch(CLEAR_ERROR());
    }

    if (updateUser) {
      navigate("/admin/users");
      // dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, updateUser, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(UPDATE_USER(userId, myForm));
  };

  return (
    <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {isFetching ? (
            <Loading />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  isFetching ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
  )
}
