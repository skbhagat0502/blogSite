import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../UI/BlogCard";
import classes from "../css/Blogs.module.css";
import Loading from "../UI/Loading";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Get user blogs
  const getUserBlogs = async () => {
    setIsLoading(true);
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
        setUser(data?.userBlog);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className={classes.blogSection}>
          {blogs.length > 0 ? (
            blogs
              .slice()
              .reverse()
              .map((blog) => (
                <BlogCard
                  key={blog._id}
                  id={blog._id}
                  isUser={true}
                  title={blog.title}
                  description={blog.description}
                  image={blog.image}
                  username={user.username}
                  time={blog.createdAt}
                />
              ))
          ) : (
            <h1 className={classes.h}>You have not created any blogs.</h1>
          )}
        </div>
      )}
    </>
  );
};

export default UserBlogs;
