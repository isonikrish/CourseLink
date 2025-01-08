import { Link } from "react-router-dom";
function CourseCard({ course }: any) {
  return (
    <div className="w-[350px] border border-base-300 rounded-xl mx-5 my-2 bg-base-100">
      <div>
        <img
          src={course?.thumbnail || "https://via.placeholder.com/380x200"}
          className="rounded-t-xl"
        />
      </div>
      <div className="p-4 space-y-3">
        <h3 className="text-xl font-bold">{course?.title}</h3>
        <div className="flex items-center">
        <p className="text-sm">
            By{" "}
            <Link
              to={`/profile/${course?.tutor?.id}`}
              className="font-bold text-blue-500 hover:underline"
            >
              {course?.tutor?.firstName} {course?.tutor?.lastName}
            </Link>
          </p>
        </div>
        <span className="badge badge-outline border-gray-400 mt-3">
          {course?.category}
        </span>
        <div className="text-xl font-bold">₹ {course?.price}</div>
        <Link
          className="btn w-full rounded-full"
          to={`/course/${course?.id}/details`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;
