import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BlogCardWithId from "../components/BlogCardWithId";
function BlogWithId() {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const getBlog = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlog();
  }, [id]);

  return (
    <BlogCardWithId
      id={blog?._id}
      isUser={localStorage.getItem("userId") === blog?.user?._id}
      title={blog?.title}
      description={blog?.description}
      image={blog?.image}
      username={blog?.user?.username}
      time={blog.createdAt}
    />
  );
}
export default BlogWithId;
