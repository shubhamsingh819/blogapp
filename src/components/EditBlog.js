import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  blog_category,
  blog_description,
  blog_edit,
  blog_slug,
  blog_title,
  cancel_btn,
  edit_blog_message,
  update_btn,
} from "../constants/Constant";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateDescription } from "../utils/descriptionSlice";

const EditBlog = () => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  let navigate = useNavigate();
  let { blogId } = useParams();
  const dispatch = useDispatch();

  const [contact, setContact] = useState({
    title: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/getBlogBy/${blogId}`);
        setContact(response.data.blog);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [blogId]);

  const updateInput = (event) => {
    const { name, value } = event.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${apiBaseUrl}/updateBlog/${blogId}`, contact);
      dispatch(
        updateDescription({
          id: contact._id,
          newDescription: contact.description,
        })
      );

      toast.success("Blog updated successfully");
      setTimeout(() => {
        navigate("/blog/list");
      }, 1000);
    } catch (error) {
      console.error("Error updating blog:", error);
      // Handle error and display appropriate message
      toast.error("Failed to update blog");
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <section className="add-contact p-3 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <p className="h3 text-primary fw-bold">{blog_edit}</p>
              <p>
                {" "}
                <b>{edit_blog_message}</b>
              </p>
            </div>
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className="mb-2">
                  <label>{blog_title}</label>
                  <input
                    required
                    name="title"
                    value={contact.title}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="title"
                  />
                </div>
                <div className="mb-2">
                  <label>{blog_description}</label>

                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="4"
                    cols="50"
                    value={contact.description}
                    onChange={updateInput}
                    placeholder="description"
                  ></textarea>
                </div>
                <div className="mb-2">
                  <label>{blog_category}</label>
                  <input
                    required
                    name="category"
                    value={contact.category}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="category"
                  />
                </div>
                <div className="mb-2">
                  <label>{blog_slug}</label>
                  <input
                    required
                    name="slug"
                    value="/blog/edit"
                    type="text"
                    className="form-control"
                    placeholder="Slug"
                    disabled
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value={update_btn}
                  />
                  <Link to="/blog/list" className="btn btn-dark ms-2">
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

export default EditBlog;
