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
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import BlogWithCategory from "./pages/BlogWithCategory";

function App() {
  let isLogin =
    useSelector((state) => state.isLogin) || localStorage.getItem("userId");
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Navbar />
              <Toaster />
              <HomePage />
              <Blogs />
              <Footer />
            </>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <>
              <Navbar />
              <Toaster />
              <BlogWithId />
              <Footer />
            </>
          }
        />
        {isLogin && (
          <Route
            path="/my-blogs"
            element={
              <>
                <Navbar />
                <Toaster />
                <UserBlogs />
                <Footer />
              </>
            }
          />
        )}
        {isLogin && (
          <Route
            path="/blog-details/:id"
            element={
              <>
                <Navbar />
                <Toaster />
                <BlogDetails />
                <Footer />
              </>
            }
          />
        )}
        {isLogin && (
          <Route
            path="/create-blog"
            element={
              <>
                <Navbar />
                <Toaster />
                <CreateBlog />
                <Footer />
              </>
            }
          />
        )}
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Toaster />
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Toaster />
              <Register />
              <Footer />
            </>
          }
        />
        <Route
          path="/:category"
          element={
            <>
              <Navbar />
              <Toaster />
              <BlogWithCategory />
              <Footer />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
