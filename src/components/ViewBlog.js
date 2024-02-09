import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  back_btn,
  blog_category,
  blog_description,
  blog_slug,
  blog_title,
  view_blog_message,
  view_blog_text,
} from "../constants/Constant";

const ViewBlog = () => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  let { blogId } = useParams();
  const [blogData, setBlogData] = useState(null); // Initialize as null to indicate loading state

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/getBlogBy/${blogId}`);
        setBlogData(response.data.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    getBlog();
  }, [blogId]);

  if (!blogData) {
    // Data is still loading
    return <p>Loading...</p>;
  }

  return (
    <>
      <section className="p-3 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <p className="h3 text-primary fw-bold">{view_blog_text}</p>
              <p>
                {" "}
                <b>{view_blog_message}</b>
              </p>
            </div>
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-md-4">
              <form>
                <div className="mb-2">
                  <label>{blog_title}</label>
                  <input
                    required
                    name="title"
                    value={blogData.title}
                    type="text"
                    disabled
                    className="form-control"
                    placeholder="Title"
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
                    value={blogData.description}
                    disabled
                    placeholder="Description"
                  ></textarea>
                </div>
                <div className="mb-2">
                  <label>{blog_category}</label>
                  <input
                    required
                    name="category"
                    value={blogData.category}
                    type="text"
                    className="form-control"
                    disabled
                    placeholder="Category"
                  />
                </div>
                <div className="mb-2">
                  <label>{blog_slug}</label>
                  <input
                    required
                    name="slug"
                    value={"/blog/view"}
                    type="text"
                    disabled
                    className="form-control"
                    placeholder="Slug"
                  />
                </div>
                <div className="mb-2">
                  <Link to={"/blog/list"} className="btn btn-warning">
                    {back_btn}
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

export default ViewBlog;
