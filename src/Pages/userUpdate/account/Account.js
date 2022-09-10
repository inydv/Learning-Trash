import React, { useEffect } from 'react'
import "./Account.css"
import Loading from "../../../Components/loading/Loading";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Account() {
    const { currentUser, isFetching } = useSelector((state) => state.user);

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    return (
        <div>
            {isFetching ? (
                <Loading />
            ) : (
                <div>
                    <div className="profileContainer">
                        <div>
                            <img src={currentUser && currentUser.avatar.url} alt={currentUser && currentUser.name} />
                            <Link to="/me/update">Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{currentUser && currentUser.username}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{currentUser && currentUser.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{String(currentUser && currentUser.createdAt).substr(0, 10)}</p>
                            </div>

                            <div>
                                <Link to="/MyOrders">My Orders</Link>
                                <Link to="/password/update">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </div>)}
        </div>
    )
}

export default Account
