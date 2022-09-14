import React, { useState } from "react";
import "./Navbar.css";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PersonIcon from "@material-ui/icons/Person";
import Backdrop from "@material-ui/core/Backdrop";
import { LOGOUT } from "../../redux/user/userApiCall";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";

function Navbar() {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const option = [
  ];

  if (!user) {
    option.unshift(
      { icon: <ExitToAppIcon />, name: "Register", func: logoutUser }
    )
  }

  if (user) {
    option.unshift(
      { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser }
    )
    option.unshift({
      icon: <ListAltIcon />,
      name: "My Orders",
      func: orders,
    });
    option.unshift({
      icon: <PersonIcon />,
      name: "Profile",
      func: account,
    });
  }

  if (user && user.role === "admin") {
    option.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/MyOrders");
  }

  function account() {
    navigate("/account");
  }

  const dispatch = useDispatch();

  function logoutUser() {
    dispatch(LOGOUT());
    navigate("/register");
  }

  return (
    <div className="navbar">
      <div className="left">
        <h1 className="title">TLT</h1>
        <p className="name">
          THE<span className="little"> LITTLE </span> THING
        </p>
      </div>

      <div className="center">
        <div className="home">
          <Link to="/">Home</Link>
        </div>
        <div className="shop">
          <div className="name">
            <Link to="/shop">Shop</Link>
          </div>
        </div>
        <div className="about">
          <Link to="/about">About</Link>
        </div>
        <div className="contact">
          <Link to="/contact">Contact</Link>
        </div>
      </div>

      <div className="right">
        {user ? <div className="userImage">
          <Backdrop open={open} style={{ zIndex: "9" }} />

          <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            // onClose={() => setOpen(false)}
            // onOpen={() => setOpen(true)}
            open={open}
            onClick={handleOpen}
            direction="down"
            FabProps={{ style: { backgroundColor: "black", zIndex: "10" } }}
            icon={<img
              src={user.avatar.url}
              className="speedDialIcon"
              alt="Profile"
            />
            }
          >
            {option.map((item) => (
              <SpeedDialAction
                FabProps={{ style: { backgroundColor: "black", zIndex: "10" } }}
                key={item.name}
                icon={item.icon}
                tooltipTitle={item.name}
                onClick={item.func}
              /> // tooltipOpen -- usefull in phones
            ))}
          </SpeedDial>
        </div> : <div className="userIcon">
          <Backdrop open={open} style={{ zIndex: "9" }} />

          <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            // onClose={() => setOpen(false)}
            // onOpen={() => setOpen(true)}
            open={open}
            onClick={handleOpen}
            direction="down"
            FabProps={{ style: { backgroundColor: "black", zIndex: "10" } }}
            icon={
              <AccountCircleIcon className="icon" />
            }
          >
            {option.map((item) => (
              <SpeedDialAction
                FabProps={{ style: { backgroundColor: "black", zIndex: "10" } }}
                key={item.name}
                icon={item.icon}
                tooltipTitle={item.name}
                onClick={item.func}
              /> // tooltipOpen -- usefull in phones
            ))}
          </SpeedDial>
        </div>}

        <div className="cart">
          <Link to="/cart">
            <Badge badgeContent={cart.length} overlap="rectangular" color="primary">
              <ShoppingCartIcon />
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
