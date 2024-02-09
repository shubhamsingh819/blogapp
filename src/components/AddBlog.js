import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  create_blog,
  create_blog_text,
  blog_title,
  blog_description,
  blog_category,
  blog_slug,
  cancel_btn,
  create_btn,
} from "../constants/Constant";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addDescription } from "../utils/descriptionSlice";

const AddBlog = () => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const apiCall = async () => {
    try {
      // Making a POST request to create a new blog
      const response = await axios.post(`${apiBaseUrl}/createBlog`, {
        title: title,
        description: description,
        category: category,
      });
      console.log(response);
      if (response) {
        toast.success("blog created successfully");
        // If the request is successful, navigate to the blog list page
        setTimeout(() => {
          navigate("/blog/list");
        }, 1000);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      navigate("/blog/add", { replace: false });
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    // Calling  apiCall function to create a new blog
    dispatch(addDescription(description));
    apiCall();
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <section className="p-3 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <p className="h3 text-success fw-bold">{create_blog}</p>
              <p className="fst-italic">{create_blog_text}</p>
            </div>
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className="mb-2">
                  <label>{blog_title}</label>
                  <input
                    required={true}
                    name="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Title"
                  />
                </div>
                <div className="mb-2">
                  <label>{blog_description}</label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    cols="50"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description here..."
                  ></textarea>
                </div>
                <div className="mb-2">
                  <label>{blog_category}</label>
                  <input
                    required={true}
                    name="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    type="text-area"
                    className="form-control"
                    placeholder="Category"
                  />
                </div>
                <div className="mb-2">
                  <label>{blog_slug}</label>
                  <input
                    required={true}
                    name="Slug"
                    value={"blog/add"}
                    type="text"
                    className="form-control"
                    placeholder="Slug"
                  />
                </div>
                <div className="mb-2">
                  {" "}
                  <input
                    type="submit"
                    className="btn btn-success"
                    value={create_btn}
                  />
                  <Link to={"/blog/list"} className="btn btn-dark ms-2">
                    {cancel_btn}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddBlog;
