import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../stores/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_URL } from "../utils/backend_url";
import Thumbnail from "../components/Thumbnail";
import toast from "react-hot-toast";
import { MoveLeft, Play } from "lucide-react";

function Course() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { id } = useParams<{ id: string }>();
  const parsedId = id ? parseInt(id, 10) : NaN;

  const { data, isLoading, error } = useQuery({
    queryKey: ["lectures", parsedId],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/lecture/get-lectures/${parsedId}`,
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          return res.data;
        } else if (res.status === 403) {
          toast.error("You must enroll in the course to access its lectures.");
        } else {
          console.log(error);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.msg || "Failed to fetch lectures.");
      }
    },
    staleTime: 120000,
  });

  if (!user) {
    toast.error("You must be logged in to view this course.");
    navigate("/login");
  }

  if (isLoading) {
    return (
      <div className="h-screen pt-24 px-10">
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  if (!data?.Lecture || data.Lecture.length === 0) {
    return (
      <div className="py-20 px-10">
        <h2 className="text-lg font-bold">
          No lectures available for this course.
        </h2>
      </div>
    );
  }

  return (
    <div className="py-20 px-10">
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 p-2 mb-6 cursor-pointer bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-200 w-28"
      >
        <MoveLeft className="w-6 h-6" />
        <span className="text-lg font-semibold">Back</span>
      </div>
      <div className="grid grid-cols-4 gap-6 justify-center">
        {data.Lecture.map((lecture: any, index: number) => {
          const userProgress = lecture?.userProgress?.[0];
          const progressPercentage = userProgress
            ? Math.floor(
                (userProgress.currentTime / userProgress.duration) * 100
              )
            : 0;
          return (
            <div key={index} className="w-[400px] border rounded-lg p-0">
              <div className="w-full mb-5">
                <div className="h-40">
                  <Thumbnail title={lecture?.title} />
                </div>

                <div className="w-full bg-gray-300 h-2 rounded-full">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold mb-2">{lecture?.title}</h3>

                <div className="flex justify-between items-center">
                  <button
                    className="flex items-center justify-center w-10 h-10 rounded-full"
                    title="Play Lecture"
                    onClick={() =>
                      navigate(`/course/${parsedId}/lecture/${lecture?.id}`)
                    }
                  >
                    <Play className="w-8 h-8" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Course;
