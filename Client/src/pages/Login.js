import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Button from "../UI/Button";
import classes from "../css/LoginSignup.module.css";
import loginImage from "../assets/login.jpg";

import { authActions } from "../redux/store";
import validator from "validator";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  //handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("Login Successfull");
        navigate("/");
      } else {
        if (!validator.isEmail(inputs.email)) {
          setError("Invalid email");
        } else if (data.message === "Invalid password") {
          setError("Invalid password");
        } else {
          setError(data.message);
        }
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className={classes.container}>
      <div className={classes.welcomeSection}>
        <h2 className={classes.welcomeMessage}>Welcome to Our Website!</h2>
        <img src={loginImage} alt="Login" className={classes.loginImage} />
      </div>
      <div className={classes.formSection}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div>
            <h3 className={classes.h3}>Login</h3>

            <input
              placeholder="Email"
              value={inputs.email}
              name="email"
              htmlFor="email"
              required
              onChange={handleChange}
              className={classes.input}
            />
            <input
              placeholder="Password"
              value={inputs.password}
              name="password"
              margin="normal"
              htmlFor="password"
              required
              onChange={handleChange}
              className={classes.input}
              type="password"
            />
            {error && <p className={classes.errorMessage}>{error}</p>}
            <div className={classes.buttonGroup}>
              <Button type="submit" className="dark">
                Submit
              </Button>
              <Button onClick={() => navigate("/register")} className="lg">
                Not a user? Please Register
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
