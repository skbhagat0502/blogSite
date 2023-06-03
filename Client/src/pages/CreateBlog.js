import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../css/CreateBlog.module.css";
import classes from "../css/Option.module.css";
import Loading from "../UI/Loading";
import toast from "react-hot-toast";
import { Editor } from "@tinymce/tinymce-react";

const CreateBlog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => setSelectedOption(event.target.value);
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    category: "",
    title: "",
    displayContent: "",
    description: "",
    image: "",
  });
  const displayContentRef = useRef();
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
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        category: inputs.category,
        title: inputs.title,
        displayContent: inputs.displayContent,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        setIsLoading(false);
        toast.success("Blog Created");
        navigate("/my-blogs");
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
              <h2 className={styles.blogFormTitle}>Share Your Experience</h2>
              <div className={styles.blogFormInput}>
                <div className={classes["option-container"]}>
                  <select
                    className={classes["option-input"]}
                    name="category"
                    value={inputs.category}
                    onChange={handleChange}
                  >
                    <option value="">Select category</option>
                    <option value="news">NEWS</option>
                    <option value="politics">POLITICS</option>
                    <option value="entertainment">ENTERTAINMENT</option>
                    <option value="personal">PERSONAL</option>
                    <option value="life">LIFE</option>
                    <option value="voices">VOICES</option>
                    <option value="shopping">SHOPPING</option>
                    <option value="video">VIDEO</option>
                  </select>
                </div>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  value={inputs.title}
                  onChange={handleChange}
                  required
                  max={50}
                />
                <label htmlFor="mainContent">Important Content</label>
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
                  initialValue="write your blog here..."
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
                PUBLISH
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateBlog;
