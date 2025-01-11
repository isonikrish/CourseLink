import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../utils/backend_url";
import axios from "axios";
import toast from "react-hot-toast";
import Plyr from "plyr";
import { useEffect, useState } from "react";
import { MoveLeft } from "lucide-react";

import "plyr/dist/plyr.css";

function Lecture() {
  const navigate = useNavigate();
  const { id, lectureId }: any = useParams();
  const courseId = parseInt(id);
  const parsedLectureId = parseInt(lectureId);

  const [userProgress, setUserProgress] = useState<any>(null);

  // Fetching lecture details
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

  // Fetching user progress on component mount
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/lecture/progress/${parsedLectureId}`,
          { withCredentials: true }
        );
        if (res.status === 200) {
          setUserProgress(res.data);
        }
      } catch (error) {
        console.error(error);
        
      }
    };

    fetchProgress();
  }, []);

  // Player setup and time update logic
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

      if (userProgress?.currentTime) {
        player.currentTime = userProgress.currentTime;
      }

      let lastMilestone = 0;

      const handleTimeUpdate = async () => {
        const currentTime = player.currentTime;
        const duration = player.duration;

        if (duration > 0) {
          const percentage = Math.floor((currentTime / duration) * 100);

          if (percentage >= lastMilestone + 10) {
            lastMilestone = Math.floor(percentage / 10) * 10;
            await axios.post(
              `${BACKEND_URL}/lecture/progress/${parsedLectureId}`,
              { currentTime, duration },
              { withCredentials: true }
            );
          }
        }
      };

      player.on("timeupdate", handleTimeUpdate);

      return () => {
        player.off("timeupdate", handleTimeUpdate);
        player.destroy();
      };
    }
  }, [data, userProgress]);

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
