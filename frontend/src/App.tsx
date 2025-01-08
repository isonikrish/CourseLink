import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import useTheme from "./stores/useTheme";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/HomePage";
import { Footer } from "./components/Footer";
import Authentication from "./pages/Authentication";
import { Toaster } from "react-hot-toast";

import { useAuth } from "./stores/useAuth";
import { useEffect } from "react";
import CreateCourse from "./pages/CreateCourse";
import CourseDisplay from "./pages/CourseDisplay";
import Profile from "./pages/Profile";
import MyCourses from "./pages/MyCourses";
import EditCourse from "./pages/EditCourse";
import Notifications from "./pages/Notifications";
function App() {
  const { isDarkMode } = useTheme();
  const { fetchUser } = useAuth();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div
      className={`flex flex-col min-h-screen`}
      data-theme={isDarkMode ? "black" : "light"}
    >
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Authentication />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/course/:id/edit" element={<EditCourse />} />
          <Route path="/course/:id/details" element={<CourseDisplay />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}


export default App;
