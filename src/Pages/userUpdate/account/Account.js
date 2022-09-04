import React from 'react'
import "./Account.css"
import Loading from "../../../Components/loading/Loading";
import Navbar from "../../../Components/navbar/Navbar";
import Footer from "../../../Components/footer/Footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Account() {
    const { currentUser, isFetching } = useSelector((state) => state.user);

    return (
        <div>
            <Navbar />
            {isFetching ? (
                <Loading />
            ) : (
                <div>
                    <div className="profileContainer">
                        <div>
                            <h1>My Profile</h1>
                            <img src={currentUser.avatar.url} alt={currentUser.name} />
                            <Link to="/me/update">Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{currentUser.username}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{currentUser.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{String(currentUser.createdAt).substr(0, 10)}</p>
                            </div>

                            <div>
                                <Link to="/orders">My Orders</Link>
                                <Link to="/password/update">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </div>)}
                <Footer />
        </div>
    )
}

export default Account
