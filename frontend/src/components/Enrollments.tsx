import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_URL } from "../utils/backend_url";
import { Link } from "react-router-dom";

function Enrollments({ course }: any) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["enrollments", course?.id],
    queryFn: async () => {
      const res = await axios.get(
        `${BACKEND_URL}/enroll/course/${parseInt(course?.id)}`,
        { withCredentials: true }
      );
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="h-screen pt-24 px-10">
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }
  if (isError) return <div>Failed to fetch enrollments. Please try again.</div>;

  return (
    <div className="px-10 py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Enrollments</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Full Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Progress</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((enrollment: any, index: number) => (
              <tr key={enrollment.id} className="border-t">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">
                  <Link
                    to={`/profile/${enrollment?.user.id}`}
                    className="hover:underline"
                  >
                    {enrollment.user?.firstName} {enrollment.user?.lastName}
                  </Link>
                </td>
                <td className="py-2 px-4">{enrollment.user?.email}</td>
                <td className="py-2 px-4">
                  <div
                    className="radial-progress text-green-500 "
                    style={
                      {
                        "--value": enrollment.progress || 100,
                        "--size": "50px",
                      } as React.CSSProperties
                    }
                    role="progressbar"
                  >
                    <p className="text-[12px]">{enrollment.progress || 100}%</p>
                  </div>
                </td>
              </tr>
            ))}
            {data?.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No enrollments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Enrollments;
