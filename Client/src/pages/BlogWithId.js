import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BlogCardWithId from "../UI/BlogCardWithId";
import Loading from "../UI/Loading";

function BlogWithId() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [blog, setBlog] = useState(null);

  const { id } = useParams();

  const getBlog = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setUser(data?.blog.user || {});
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlog();
  }, [id]);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && blog && (
        <BlogCardWithId
          id={blog._id}
          isUser={localStorage.getItem("userId") === blog?.user?._id}
          title={blog.title}
          description={blog.description}
          image={blog.image}
          username={user.username}
          time={blog.createdAt}
        />
      )}
    </>
  );
}

export default BlogWithId;
