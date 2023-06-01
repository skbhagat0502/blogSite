import Blogs from "./pages/Blogs";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import { Toaster } from "react-hot-toast";
import BlogWithId from "./pages/BlogWithId";

function App() {
  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <HomePage />
              <Blogs />
            </>
          }
        />
        <Route path="/blog/:id" element={<BlogWithId />} />
        <Route path="/my-blogs" element={<UserBlogs />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
