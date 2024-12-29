import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import useTheme from "./stores/useTheme";
import LandingPage from "./pages/LandingPage";
import Home from './pages/HomePage'
import { Footer } from "./components/Footer";
import Authentication from "./pages/Authentication";
import { Toaster } from "react-hot-toast";

import { useAuth } from "./stores/useAuth";
import { useEffect } from "react";
import CreateCourse from "./pages/CreateCourse";
import CourseDisplay from "./pages/CourseDisplay";

function App() {
  const { isDarkMode } = useTheme();
  const { fetchUser } = useAuth();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div data-theme={isDarkMode ? "black" : "light"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Authentication />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/course/:id" element={<CourseDisplay />}/>
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
