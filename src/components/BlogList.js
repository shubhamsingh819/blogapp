import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  blog_text,
  click_to_add_blog,
  blog_sort_text,
  blog_title,
  blog_category,
  blog_description,
  blog_slug,
  view_blog,
  edit_blog,
  delete_blog,
  created_at_btn,
} from "../constants/Constant";
import Spinner from "./Spinner";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByDate, setSortByDate] = useState(false);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchBlogs();
  }, []);

  console.log("blogs", blogs);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/getAllBlog`);
      setBlogs(response.data.blog);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      const result = window.confirm(
        "Are you sure you want to delete this blog?"
      );
      if (result) {
        await axios.delete(`${apiBaseUrl}/deleteBlog/${blogId}`);
        toast.success("blog deleted successfully");
        // Updating the list of blogs after deletion
        fetchBlogs();
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBlogs = sortByDate
    ? filteredBlogs.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : filteredBlogs;

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3">
                  Blog List
                  <Link to="/blog/add" className="btn btn-primary ms-2">
                    <i className="fa fa-plus-circle me-2" />
                    {click_to_add_blog}
                  </Link>
                </p>
                <p className="fst italic">{blog_text}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Search by title or Category"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label d-block">{blog_sort_text}</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={sortByDate}
                  onChange={() => setSortByDate(!sortByDate)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {blogs.length === 0 ? (
        <>
          <Spinner />
        </>
      ) : (
        <section className="contact-list">
          <div className="container">
            <div className="row">
              {sortedBlogs.map((blog) => (
                <div className="col-md-6" key={blog._id}>
                  <div className="card my-2">
                    <div className="card-body">
                      <ul className="list-group">
                        <li className="list-group-item list-group-item-section">
                          {blog_title}:{" "}
                          <span className="fw-bold">{blog.title}</span>
                        </li>
                        <li className="list-group-item list-group-item-section">
                          {blog_category}:{" "}
                          <span className="fw-bold">{blog.category}</span>
                        </li>
                        <li className="list-group-item list-group-item-section">
                          {blog_description}:{" "}
                          <span className="fw-bold">{blog.description}</span>
                        </li>
                        <li className="list-group-item list-group-item-section">
                          {created_at_btn}:{" "}
                          <span className="fw-bold">{blog.createdAt}</span>
                        </li>
                        <li className="list-group-item list-group-item-section">
                          {blog_slug}:{" "}
                          <span className="fw-bold">/blog/list</span>
                        </li>
                      </ul>
                      <div className="mt-3">
                        <Link
                          to={`/blog/view/${blog._id}`}
                          className="btn btn-warning me-2"
                        >
                          {view_blog}
                        </Link>
                        <Link
                          to={`/blog/edit/${blog._id}`}
                          className="btn btn-primary me-2"
                        >
                          {edit_blog}
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(blog._id)}
                        >
                          {delete_blog}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BlogList;
