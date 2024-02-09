import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BlogList from "./components/BlogList";
import AddBlog from "./components/AddBlog";
import EditBlog from "./components/EditBlog";
import ViewBlog from "./components/ViewBlog";
import { Provider } from "react-redux";
import store from "./utils/store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            {" "}
            <Route path="/" element={<BlogList />} />
            <Route path="/blog/list" element={<BlogList />} />
            <Route path="/blog/add" element={<AddBlog />} />
            <Route path="/blog/edit/:blogId" element={<EditBlog />} />
            <Route path="/blog/view/:blogId" element={<ViewBlog />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
