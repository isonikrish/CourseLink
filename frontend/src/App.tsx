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
import CourseDetails from "./pages/CourseDetails";
import Profile from "./pages/Profile";
import MyCourses from "./pages/MyCourses";
import EditCourse from "./pages/EditCourse";
import Notifications from "./pages/Notifications";
import MyEnrollments from "./pages/MyEnrollments";
import Course from "./pages/Course";
import Lecture from "./pages/Lecture";
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
          <Route path="/course/:id/details" element={<CourseDetails />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/my-enrollments" element={<MyEnrollments />}/>
          <Route path="/course/:id" element={<Course />}/>
          <Route path="/course/:id/lecture/:lectureId" element={<Lecture />}/>
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}


export default App;
