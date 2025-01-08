import { Link, useNavigate } from "react-router-dom";
import {
  Link as Lifetime,
  MonitorPlay,
  Trophy,
  CirclePlay,
} from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../utils/backend_url";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAuth } from "../stores/useAuth";

function PurchaseCard({ course }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleEnroll = async () => {
    if (!user) {
      toast.error("You must be logged in to enroll.");
      return navigate("/login");
    }
    if (isLoading) return;
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${BACKEND_URL}/enroll/course/${course?.id}`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Enrolled");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const isEnrolled = course?.enrollments.some(
    (enroll: any) => enroll.userId === user?.id
  );
  return (
    <div className="w-[350px] border border-base-300 rounded-xl mx-5 my-5 bg-base-100">
      <div>
        <img
          src={course?.thumbnail || "https://via.placeholder.com/380x200"}
          className="rounded-t-xl"
        />
      </div>
      <div className="p-4">
        <div className="space-y-3">
          <h3 className="text-xl font-bold">{course?.title}</h3>
          <div>
            <p className="text-sm">
              By{" "}
              <Link
                to={`/profile/${course?.tutor?.id}`}
                className="font-bold text-blue-500 hover:underline"
              >
                {course?.tutor?.firstName} {course?.tutor?.lastName}
              </Link>
            </p>

            <span className="badge badge-outline border-gray-400 mt-3">
              {course?.category}
            </span>
          </div>

          <div className="text-xl font-bold">₹ {course?.price}</div>
          {isEnrolled ? (
            <button className="btn w-full rounded-full">
              <CirclePlay /> View Course
            </button>
          ) : (
            <button
              className="btn w-full rounded-full"
              onClick={() => handleEnroll()}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-md"></span>{" "}
                  Enrolling
                </>
              ) : (
                "Enroll Now"
              )}
            </button>
          )}
        </div>
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">This course includes:</h4>
          <ul className="space-y-2">
            <li className="flex items-center text-sm">
              <MonitorPlay className="text-green-500 mr-2" />
              3.5 hours on-demand video
            </li>
            <li className="flex items-center text-sm">
              <Lifetime className="text-green-500 mr-2" />
              Full lifetime access
            </li>
            <li className="flex items-center text-sm">
              <Trophy className="text-green-500 mr-2" />
              Certificate of completion
            </li>
          </ul>
        </div>

        <div className="join mt-7 flex justify-center">
          <input
            className="input input-bordered join-item"
            placeholder="Enter Coupon"
          />
          <button className="btn join-item">Apply</button>
        </div>
      </div>
    </div>
  );
}

export default PurchaseCard;
