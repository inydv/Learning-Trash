import React from 'react'
import "./Account.css"
import Loading from "../../../Components/loading/Loading";
import Navbar from "../../../Components/navbar/Navbar";
import Footer from "../../../Components/footer/Footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Account() {
    const { user, loading } = useSelector((state) => state.user.currentUser);

    return (
        <div>
            <Navbar />
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <div className="profileContainer">
                        <div>
                            <h1>My Profile</h1>
                            <img src={user.avatar.url} alt={user.name} />
                            <Link to="/me/update">Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.username}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{String(user.createdAt).substr(0, 10)}</p>
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
