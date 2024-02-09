import React from "react";
import { Link } from "react-router-dom";
import { blog_app_text } from "../constants/Constant";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
        <div className="container">
          <Link to={"/"} className="navbar-brand">
            <i className="fa fa-mobile text-warning" />
            {blog_app_text}
            <span className="text-warning"></span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
