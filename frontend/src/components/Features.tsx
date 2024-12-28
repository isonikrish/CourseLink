import { useState } from "react";
import { Users, BarChart, ShieldCheck, IndianRupee } from "lucide-react";

function Features() {
  const [activeSlide, setActiveSlide] = useState(0);

  const features = [
    {
      id: 0,
      icon: <Users className="text-white w-12 h-12 mb-4" />,
      title: "Collaborative Course Creation",
      description:
        "Enable tutors and co-tutors to work together, building engaging courses with ease.",
    },
    {
      id: 1,
      icon: <BarChart className="text-white w-12 h-12 mb-4" />,
      title: "Analytics",
      description:
        "Gain actionable insights into course performance and student progress with detailed analytics.",
    },
    {
      id: 2,
      icon: <ShieldCheck className="text-white w-12 h-12 mb-4" />,
      title: "Integrated Certification",
      description:
        "Award professional certificates upon course completion to recognize student achievements.",
    },
    {
      id: 3,
      icon: <IndianRupee className="text-white w-12 h-12 mb-4" />,
      title: "Revenue Sharing & Payout Management",
      description:
        "Seamlessly manage payouts and share earnings between tutors and co-tutors.",
    },
  ];

  return (
    <div className="py-12 px-6">
      <h2 className="text-center text-4xl font-bold mb-6">Features</h2>
      <p className="text-center text-lg mb-10 max-w-3xl mx-auto">
        From collaborative course creation to monetizing your knowledge, CourseLink provides the ultimate platform to empower educators and students alike.
      </p>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${activeSlide * 100}%)`,
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.id}
              className="carousel-item flex-shrink-0 w-full flex justify-center"
            >
              <div className="relative h-[300px] rounded-lg shadow-lg flex items-center justify-center overflow-hidden w-3/4">
                <div className="absolute inset-0 rounded-lg border border-transparent bg-gradient-to-r from-gray-400 via-gray-200 to-gray-600"></div>
                <div className="absolute inset-[2px] bg-base-100 rounded-lg flex flex-col items-center justify-center p-4 text-center">
                  {feature.icon}
                  <h3 className="text-3xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full justify-center gap-2 py-4">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => setActiveSlide(feature.id)}
            className={`btn btn-xs ${
              activeSlide === feature.id ? "btn-active" : ""
            }`}
          >
            {feature.id + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Features;
