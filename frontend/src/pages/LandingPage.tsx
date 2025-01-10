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
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-tight">
              Collaborate, create, and sell your courses with
              <span className="inline-block relative px-2 py-1 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 text-transparent bg-clip-text font-bold">
                CourseLink
              </span>
            </h1>

            <button className="w-44 btn text-lg font-medium rounded-full px-4 py-2 mt-10 border border-base-300">
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
