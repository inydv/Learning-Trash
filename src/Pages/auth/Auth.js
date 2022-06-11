import React, { useEffect, useState, useRef } from "react";
import "./Auth.css";
import profileImage from "../../Images/profileImage.jpg";
import { Link } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { login, Register, clearErrors } from "../../redux/auth/authApiCalls";
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Signup() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("")

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(profileImage);


  const dispatch = useDispatch();

  const loginSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword))
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("username", username);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(Register(myForm))
  }

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {  // 0: initial, 1: processing, 2: done
          setAvatarPreview(reader.result);
          setAvatar(reader.result)
        }
      }

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <div className="LoginSignUpContainer">
      <div className="bg"></div>
      <div className="forFlex">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>

          <form className="loginForm" ref={loginTab}
            onSubmit={loginSubmit}
          >

            <div className="loginEmail">
              <MailIcon className="Icon" />
              <input
              autoFocus
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>

            <div className="loginPassword">
              <LockIcon className="Icon" />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>

            <Link to="/password/forgot">Forget Password ?</Link>

            <input type="submit" value="Login" className="loginBtn" />
          </form>

          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >

            <div className="signUpName">
              <AccountCircleIcon className="Icon" />
              <input
                type="text"
                placeholder="Name"
                required
                name="username"
                value={username}
                onChange={registerDataChange}
              />
            </div>

            <div className="signUpEmail">
              <MailIcon className="Icon" />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>

            <div className="signUpPassword">
              <LockIcon className="Icon" />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>

            <div id="registerImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>

            <input type="submit" value="Register" className="signUpBtn" />
          </form>
        </div>
      </div>

    </div>

    // <div className="logIn">
    //   
    //   <div className="wrapper">
    //     <div className="wraped">
    //       <form className="signUpForm"
    //         encType="multipart/form-data"
    //         onSubmit={registerSubmit}>
    //         <div className="container">
    //           <h6 className="signIn">SIGN UP</h6>
    //           <input
    //             type="text"
    //             placeholder="Username"
    //             className="username"
    //             name="username"
    //             value={username}
    //             autoFocus={true}
    //             onChange={registerDataChange}
    //             required
    //           />
    //           <input
    //             type="email"
    //             placeholder="Email"
    //             className="username"
    //             name="email"
    //             value={email}
    //             onChange={registerDataChange}
    //             required
    //           />
    //           <input
    //             type="password"
    //             placeholder="Password"
    //             className="pw"
    //             name="password"
    //             value={password}
    //             onChange={registerDataChange}
    //             required
    //           />
    //           <div id="registerImage">
    //             <img src={avatarPreview} alt="Avatar Preview" />
    //             <input type="file"
    //               name="avatar"
    //               accept="image/*"  // image of all type
    //               onChange={registerDataChange} />
    //           </div>
    //           <button className="btn" type="submit" disabled={isFetching}>
    //             SIGNUP
    //           </button>
    //           {error && <span className="span">something went wrong!</span>}
    //           <Link to="/signin">
    //             <p className="forgotPW">Already Have Account?</p>
    //           </Link>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Signup;
