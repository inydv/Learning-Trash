import React, { useState, useEffect } from "react";
import "./UpdateProfile.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import profileImage from "../../../Images/profileImage.jpg";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PROFILE, LOAD_USER } from "../../../redux/user/userApiCall";
import { UPDATE_ISUPDATED } from '../../../redux/user/userRedux'
import { useNavigate } from "react-router-dom"
import Loading from "../../../Components/loading/Loading"

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    const user = useSelector((state) => state.user.currentUser);
    const { isUpdated, isFetching } = useSelector((state) => state.user);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(profileImage);

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("username", username);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(UPDATE_PROFILE(myForm));
    };

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        // if (error) {
        //   dispatch(clearErrors());
        // }

        if (isUpdated) {
            dispatch(LOAD_USER());

            navigate("/account");

            UPDATE_ISUPDATED(dispatch);
        }
    }, [dispatch, navigate, user, isUpdated]);

    return (
        <div>
            {isFetching ? (
                <Loading />
            ) : (
                <div>
                    <div className="updateProfileContainer">
                        <div className="updateProfileBox">
                            <h2 className="updateProfileHeading">Update Profile</h2>

                            <form
                                className="updateProfileForm"
                                encType="multipart/form-data"
                                onSubmit={updateProfileSubmit}
                            >
                                <div className="updateProfileName">
                                    <FaceIcon />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="updateProfileEmail">
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

                                <div id="updateProfileImage">
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={updateProfileDataChange}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Update"
                                    className="updateProfileBtn"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateProfile;