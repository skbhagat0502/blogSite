import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
import classes from "../css/Navbar.module.css";
import Button from "../UI/Button";
import Overlay from "./Overlay";
import styles from "../css/Option.module.css";

function Navbar() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu((prevShowMenu) => !prevShowMenu);

  let isLogin =
    useSelector((state) => state.isLogin) || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleOverlayToggle = (message) => {
    setShowOverlay((prevShowOverlay) => !prevShowOverlay);
    setOverlayMessage(message);
  };
  const handleChange = (event) => {
    navigate(`/${event.target.value}`);
  };
  return (
    <nav className={`${classes.navbar} ${showMenu ? classes.showMenu : ""}`}>
      <>
        <ul className={classes.topnav}>
          <li className={classes.brand}>
            <NavLink to="/">SiteName</NavLink>
          </li>
          <div className={styles["option-container"]}>
            <select
              className={styles["option-input"]}
              name="category"
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option value="news">NEWS</option>
              <option value="politics">POLITICS</option>
              <option value="entertainment">ENTERTAINMENT</option>
              <option value="personal">PERSONAL</option>
              <option value="life">LIFE</option>
              <option value="voices">VOICES</option>
              <option value="shopping">SHOPPING</option>
              <option value="video">VIDEO</option>
            </select>
          </div>
          {!showMenu && (
            <span className={classes.box}>
              {isLogin ? (
                <NavLink to="/create-blog">
                  <Button className="lg">Create Blogs</Button>
                </NavLink>
              ) : (
                <NavLink to="/login">
                  <Button className="lg">Log in</Button>
                </NavLink>
              )}
              {isLogin ? (
                <Button
                  className="dark"
                  onClick={() => handleOverlayToggle("logout")}
                >
                  Logout
                </Button>
              ) : (
                <NavLink to="/register">
                  <Button className="dark">Sign up</Button>
                </NavLink>
              )}
            </span>
          )}
          <div className={classes.hamburger} onClick={toggleMenu}>
            <span className={classes.bar}></span>
            <span className={classes.bar}></span>
            <span className={classes.bar}></span>
          </div>
        </ul>
        <ul className={classes.mainnav}>
          <li>
            <NavLink to="/">All</NavLink>
          </li>
          <li>
            <NavLink to="../news">NEWS</NavLink>
          </li>
          <li>
            <NavLink to="../politics">POLITICS</NavLink>
          </li>
          <li>
            <NavLink to="../entertainment">ENTERTAINMENT</NavLink>
          </li>
          <li>
            <NavLink to="../personal">PERSONAL</NavLink>
          </li>
          <li>
            <NavLink to="../life">LIFE</NavLink>
          </li>
          <li>
            <NavLink to="../voices">VOICES</NavLink>
          </li>
          <li>
            <NavLink to="../shoping">SHOPPING</NavLink>
          </li>
          {isLogin && (
            <li>
              <NavLink to="../my-blogs">My Blogs</NavLink>
            </li>
          )}
          {showMenu && (
            <span className={classes.buttonbox}>
              {isLogin ? (
                <NavLink to="../create-blog">
                  <Button className="lg">Create Blogs</Button>
                </NavLink>
              ) : (
                <NavLink to="../login">
                  <Button className="lg">Log in</Button>
                </NavLink>
              )}
              {isLogin ? (
                <NavLink to="/">
                  <Button
                    className="dark"
                    onClick={() => handleOverlayToggle("logout")}
                  >
                    Logout
                  </Button>
                </NavLink>
              ) : (
                <NavLink to="/register">
                  <Button className="dark">Sign up</Button>
                </NavLink>
              )}
            </span>
          )}
        </ul>
      </>
      {showOverlay && (
        <Overlay
          handleLogout={handleLogout}
          handleOverlayToggle={handleOverlayToggle}
          message={overlayMessage}
        />
      )}
    </nav>
  );
}

export default Navbar;
