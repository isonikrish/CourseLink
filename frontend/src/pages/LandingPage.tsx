import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../stores/useAuth";
import photo from "/CL_PHOTO1.png";
import {
  GraduationCap,
  MoveRight,
  BarChart,
  Trophy,
  User,
  Monitor,
  Gamepad,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";

function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  return (
    <div>
      {/* Hero Section */}
      <div className="flex justify-center items-center px-6 pt-16 md:py-24 lg:pt-48">
        <div className="text-center">
          <h1 className="text-4xl sm:text-4xl lg:text-5xl font-semibold mb-6">
            Collaborate, Create, and Sell Courses
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">
            with{" "}
            <span className="bg-gradient-to-r from-purple-500 to-purple-700 text-transparent bg-clip-text font-extrabold">
              CourseLink
            </span>{" "}
            <span className="inline-block text-purple-700">🤝</span>
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-500">
            A platform that brings tutors and students together to create
            impactful learning experiences.
          </p>
          <div className="flex flex-wrap justify-center mt-8 gap-6">
            <Link
              className="btn bg-purple-500 text-white rounded-lg hover:bg-purple-400 px-7 text-lg md:text-xl"
              to={"/login"}
            >
              Get started for free <MoveRight />
            </Link>
            <Link
              className="btn btn-outline rounded-lg px-10 py-3 hover:border-purple-700 text-lg"
              to={"/home"}
            >
              Explore Courses <GraduationCap />
            </Link>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex justify-center mt-12 p-4 rounded-2xl w-full">
        <img
          src={photo}
          className="w-full md:w-3/4 lg:w-1/2 h-auto rounded-2xl border-4 border-purple-500"
        />
      </div>

      {/* Features Section */}
      <div className="text-center my-16 lg:my-44 border-t py-10 lg:py-20 border-base-300">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Features</h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 font-medium mb-12">
          From collaborative course creation to student management, CourseLink
          offers everything you need to deliver impactful learning experiences.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {[{ icon: <GraduationCap />, title: "Collaborative Course Creation", description: "Work together with tutors to design and refine courses that engage students." },
            { icon: <BarChart />, title: "Analytics", description: "Gain valuable insights with analytics on student progress and course performance." },
            { icon: <Trophy />, title: "Certifiable Learning", description: "Offer students the opportunity to earn certificates upon successful course completion." },
            { icon: <User />, title: "Student Management", description: "Easily manage and track student progress and performance throughout their learning journey." },
            { icon: <Monitor />, title: "Multi-Device Access", description: "Access your courses and materials from any device, anytime, ensuring flexible learning experiences." },
            { icon: <Gamepad />, title: "Interactive Learning", description: "Engage students with interactive quizzes, discussions, and multimedia content for a hands-on learning experience." },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-base-300"
            >
              <div className="text-4xl text-purple-500 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Free Plan Section */}
      <div className="mx-6 sm:mx-10 lg:mx-20 rounded-xl lg:flex lg:flex-nowrap border border-base-300">
        <div className="p-8 sm:p-10 lg:flex-auto">
          <h3 className="text-2xl font-semibold tracking-tight">Free</h3>
          <p className="mt-6 text-base leading-7 text-muted-foreground">
            Get all goodies for free, no credit card required.
          </p>
          <div className="mt-12 flex items-center gap-x-4">
            <h4 className="flex-none text-sm font-semibold leading-6 text-muted-foreground/80">
              Included features
            </h4>
            <div
              data-orientation="horizontal"
              role="none"
              className="bg-border w-full h-px flex-auto"
            ></div>
          </div>
          <ul className="mt-10 grid gap-4 text-sm leading-6 md:grid-cols-2">
            <li className="flex items-center gap-x-2">
              <Check /> Up to 2 course creation
            </li>
            <li className="flex items-center gap-x-2">
              <Check /> Up to 2 videos
            </li>
            <li className="flex items-center gap-x-2">
              <Check /> Basic analytics
            </li>
            <li className="flex items-center gap-x-2">
              <Check /> Unlimited student enrollment
            </li>
          </ul>
        </div>
        <div className="w-full p-2 lg:max-w-md lg:flex-shrink-0 lg:py-6 lg:pr-6">
          <div className="fancyGlass h-full rounded-xl py-10 text-center ring-1 ring-inset ring-gray-300/50 dark:ring-gray-800/50 lg:flex lg:flex-col lg:justify-center lg:py-16">
            <div className="mx-auto max-w-xs px-8">
              <p className="mt-6 flex items-baseline justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight">₹0</span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-gray-700">
                  /mon
                </span>
              </p>
              <Link
                className="btn bg-purple-500 text-white rounded-lg hover:bg-purple-400 px-3 text-lg mt-3"
                to={"/login"}
              >
                Get started
              </Link>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Get started with our free plan, no credit card required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
