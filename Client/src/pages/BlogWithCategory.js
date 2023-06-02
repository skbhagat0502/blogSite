import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BlogCard from "../UI/BlogCardWithId";
import Loading from "../UI/Loading";
import classes from "../css/Blogs.module.css";

function BlogWithCategory() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const category = useParams().category;

  const getBlogs = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/blog/${category}`);
      if (data?.success) {
        setBlogs(data?.categoryBlogs);
        setUser(data?.categoryBlogs.user);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [category]);
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className={classes.blogSection}>
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                id={blog?._id}
                isUser={localStorage.getItem("userId") === blog?.user?._id}
                title={blog?.title}
                description={blog?.description}
                image={blog?.image}
                username={blog?.user?.username}
                time={blog.createdAt}
              />
            ))
          ) : (
            <h2 className={classes.h}>No blogs found in this category.</h2>
          )}
        </div>
      )}
    </>
  );
}

export default BlogWithCategory;
