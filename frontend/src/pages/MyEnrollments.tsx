import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../stores/useAuth";
import axios from "axios";
import { BACKEND_URL } from "../utils/backend_url";
import { Link, useNavigate } from "react-router-dom";
import { CirclePlay } from "lucide-react";

function MyEnrollments() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["my-enrollments", user?.id],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/enroll/my-enrollments`,
          {
            withCredentials: true,
          }
        );
        return response.data || [];
      } catch (error) {
        return [];
      }
    },
  });
  if (isLoading) {
    return (
      <div className="h-screen pt-24 px-10">
        <h1 className="text-3xl font-bold mb-6">My Enrollments</h1>
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }
  if (data.length === 0) {
    return (
      <div className="h-screen pt-24 px-10">
        <h1 className="text-3xl font-bold mb-4">My Enrollments</h1>
        <div className="flex items-center justify-center px-10">
          <p className="text-lg text-gray-500">No enrollments found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-10">
      <h1 className="text-3xl font-bold mb-6">My Enrollments</h1>

      <div className="grid grid-cols-4 pt-10">
        {data?.map((data: any) => {
          return (
            <div
              className="w-[350px] border border-base-300 rounded-xl mx-5 my-2 bg-base-100"
              key={data.id}
            >
              <div className="relative">
                <img
                  src={
                    data?.course?.thumbnail ||
                    "https://via.placeholder.com/380x200"
                  }
                  className="rounded-t-xl"
                />
              </div>
              <div className="p-4 space-y-3">
                <Link
                  to={`/course/${data?.course?.id}/details`}
                  className="underline"
                >
                  <h3 className="text-xl font-bold">{data?.course?.title}</h3>
                </Link>

                <div className="flex items-center">
                  <p className="text-sm">
                    By{" "}
                    <Link
                      to={`/profile/${data?.course?.tutor?.id}`}
                      className="font-bold text-blue-500 hover:underline"
                    >
                      {data?.course?.tutor?.firstName}{" "}
                      {data?.course?.tutor?.lastName}
                    </Link>
                  </p>
                </div>
                <span className="badge badge-outline border-gray-400 mt-3">
                  {data?.course?.category}
                </span>
                <div className="text-xl font-bold">₹ {data?.course?.price}</div>
                <button
                  className="btn w-full rounded-md"
                  onClick={() => navigate(`/course/${data?.course?.id}`)}
                >
                  <CirclePlay /> View Course
                </button>
                <button
                  className="btn btn-outline w-full rounded-md"
                  onClick={() => navigate(`/certificate/${data?.course?.id}`)}
                >
                  Claim Certificate
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyEnrollments;
