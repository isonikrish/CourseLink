import { MoveRight } from "lucide-react";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../stores/useAuth";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);
  return (
    <div>
      <div className="hero h-screen">
        <div className="hero-content text-center flex flex-col items-center justify-center space-y-6 px-6">
          <div className="w-full">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
              Learn Together, Teach Together With{" "}
              <span className="inline-block relative px-2 py-1 border-4 border-transparent bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 text-transparent bg-clip-text">
                CourseLink
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mt-9 max-w-3xl mx-auto">
              A platform to collaborate, create, and sell amazing courses
              together. Be a passionate learner and educator today.
            </p>

            <button className="w-44 btn text-lg font-medium rounded-full px-4 py-2 shadow-[0px_-1px_0px_0px_#FFFFFF40_inset,_0px_2px_2px_0px_#FFFFFF40_inset] mt-10">
              Get Started <MoveRight />
            </button>
          </div>
        </div>
      </div>

      <div className="h-[3px] bg-gradient-to-r from-gray-400 via-gray-200 to-gray-600 my-10"></div>

      <Features />
      <div className="h-[3px] bg-gradient-to-r from-gray-400 via-gray-200 to-gray-600 my-10"></div>

      <Pricing />
      
    </div>
  );
}

export default Home;
