import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BlogCardWithId from "../UI/BlogCardWithId";
import Loading from "../UI/Loading";
function BlogWithId() {
  const [isLoading, setIsLoading] = useState(false);
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const getBlog = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlog();
  }, [id]);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <BlogCardWithId
          id={blog?._id}
          isUser={localStorage.getItem("userId") === blog?.user?._id}
          title={blog?.title}
          description={blog?.description}
          image={blog?.image}
          username={blog?.user?.username}
          time={blog.createdAt}
        />
      )}
    </>
  );
}
export default BlogWithId;
