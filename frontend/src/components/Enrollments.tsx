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

  // Function to calculate progress
  const calculateProgress = (lectures: any[], progress: any[]) => {
    const completedLectures = lectures.filter((lecture) => {
      const userProgress = progress.find((p: any) => p.lectureId === lecture.id);
      return userProgress && userProgress.currentTime > 0;
    }).length;

    const totalLectures = lectures.length;

    const progressPercentage =
      totalLectures > 0 ? Math.round((completedLectures / totalLectures) * 100) : 0;

    return { completedLectures, totalLectures, progressPercentage };
  };

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

  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <div className="h-screen pt-24 px-10 flex justify-center items-center">
        <p className="text-gray-500 text-xl">No enrollments found.</p>
      </div>
    );
  }

  return (
    <div className="px-10 py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Enrollments</h1>
      </div>

      <div>
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
            {data.map((enrollment: any, index: number) => {
              const progress = enrollment.course.Lecture.flatMap((lecture: any) =>
                lecture.progress ? [{ ...lecture.progress, lectureId: lecture.id }] : []
              );

              const { completedLectures, totalLectures, progressPercentage } =
                calculateProgress(enrollment.course.Lecture, progress);

              return (
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
                    <div className="card w-60 bg-base-100 shadow-xl border border-base-300 rounded">
                      <div className="card-body">
                        <p>
                          Completed {completedLectures} of {totalLectures} lectures
                        </p>
                        <progress
                          className="progress progress-accent w-full"
                          value={progressPercentage}
                          max="100"
                        ></progress>
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>{progressPercentage}%</span>
                          <span>
                            {completedLectures}/{totalLectures} Lectures
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Enrollments;
