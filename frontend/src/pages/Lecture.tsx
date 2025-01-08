import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../utils/backend_url";
import axios from "axios";
import toast from "react-hot-toast";
import Plyr from "plyr";

import "plyr/dist/plyr.css";
import { useEffect } from "react";
import { MoveLeft } from "lucide-react";
function Lecture() {
  const navigate = useNavigate();
  const { id, lectureId }: any = useParams();
  const courseId = parseInt(id);
  const parsedLectureId = parseInt(lectureId);

  const { data, isLoading, error } = useQuery({
    queryKey: ["lecture", parsedLectureId],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/lecture/get-lecture/${courseId}/${parsedLectureId}`,
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
  useEffect(() => {
    if (data?.video) {
      const player = new Plyr("#player", {
        controls: [
          "play-large",
          "play",
          "rewind",
          "fast-forward",
          "progress",
          "current-time",
          "mute",
          "volume",
          "captions",
          "settings",
          "fullscreen",
        ],
      });
      return () => {
        player.destroy();
      };
    }
  }, [data]);
  if (isLoading) {
    return (
      <div className="pt-24 px-10">
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }
  return (
    <div className="pt-20 px-10">
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 p-2 mb-6 cursor-pointer bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-200 w-28"
      >
        <MoveLeft className="w-6 h-6" />
        <span className="text-lg font-semibold">Back</span>
      </div>

      {data?.video && (
        <div>
          <video id="player" controls className="w-full h-auto">
            <source src={data?.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}

export default Lecture;
