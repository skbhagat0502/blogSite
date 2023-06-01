import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Button from "../UI/Button";
import classes from "../css/LoginSignup.module.css";
import loginImage from "../assets/login.jpg";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import validator from "validator";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("User Register Successfully");
        navigate("/");
      } else {
        if (data.message === "This email address is already registered") {
          setError("This email address is already registered");
        } else if (!validator.isEmail(inputs.email)) {
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
        <img src={loginImage} alt="Register" className={classes.loginImage} />
      </div>
      <div className={classes.formSection}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div>
            <h3 className={classes.h3}>Register</h3>
            <input
              placeholder="name"
              value={inputs.name}
              onChange={handleChange}
              name="name"
              htmlFor="text"
              required
              className={classes.input}
            />
            <input
              placeholder="email"
              value={inputs.email}
              onChange={handleChange}
              name="email"
              htmlFor="email"
              required
              minLength="8"
              className={classes.input}
              type="email"
            />
            <input
              placeholder="password"
              value={inputs.password}
              onChange={handleChange}
              name="password"
              htmlFor="password"
              required
              minLength="8"
              className={classes.input}
              type="password"
            />
            {error && <p className={classes.errorMessage}>{error}</p>}
            <span className={classes.buttonGroup}>
              <Button type="submit" className="dark mrb">
                Submit
              </Button>
              <Button onClick={() => navigate("/login")} className="lg">
                Already Registered? Please Login
              </Button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
