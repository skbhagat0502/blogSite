import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../css/CreateBlog.module.css";
import Loading from "../UI/Loading";
import Overlay from "../components/Overlay";
import { Editor } from "@tinymce/tinymce-react";
const BlogDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const descriptionRef = useRef(null);
  const displayContentRef = useRef(null);

  // get blog details
  const getBlogDetail = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          displayContent: data?.blog.displayContent,
          description: data?.blog.description,
          image: data?.blog.image,
        });
        setIsLoading(false);
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
    setIsLoading(true);
    try {
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        displayContent: inputs.displayContent,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
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
                <label htmlFor="displayContent">Important Content</label>
                <textarea
                  type="text"
                  ref={displayContentRef}
                  name="displayContent"
                  value={inputs.displayContent}
                  onChange={handleChange}
                  max={300}
                  min={200}
                  required
                />
              </div>
              <div className={styles.blogFormInput}>
                <label htmlFor="description">Description</label>
                <Editor
                  apiKey="m60ptnnd82affrzam6d8y0w947f6ji628xdtqw4y07bqkqya"
                  ref={descriptionRef}
                  name="description"
                  value={inputs.description}
                  required
                  onEditorChange={(content) =>
                    setInputs((prevState) => ({
                      ...prevState,
                      description: content,
                    }))
                  }
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | " +
                      "bold italic backcolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
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
      )}
    </>
  );
};

export default BlogDetails;
