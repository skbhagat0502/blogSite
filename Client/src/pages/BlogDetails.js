import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../css/CreateBlog.module.css";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const descriptionRef = useRef(null);

  // get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

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
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(blog);

  return (
    <div className={styles.CreateBlog}>
      <form onSubmit={handleSubmit}>
        <div className={styles.blogForm}>
          <h2 className={styles.blogFormTitle}>Update A Post</h2>
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
            UPDATE
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogDetails;
