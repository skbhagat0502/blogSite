import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../css/CreateBlog.module.css";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  const descriptionRef = useRef();

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.CreateBlog}>
      <form onSubmit={handleSubmit}>
        <div className={styles.blogForm}>
          <h2 className={styles.blogFormTitle}>Create A Blog</h2>
          <div className={styles.blogFormInput}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={inputs.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.blogFormInput}>
            <label htmlFor="description">Description</label>
            <textarea
              ref={descriptionRef}
              name="description"
              value={inputs.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.blogFormInput}>
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              name="image"
              value={inputs.image}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.blogFormSubmit}>
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
