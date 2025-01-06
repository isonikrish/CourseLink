import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import { useAuth } from "../stores/useAuth";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_URL } from "../utils/backend_url";
import { course } from "../utils/types";
import { useNavigate } from "react-router-dom";

function MyCourses() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    data: courses = [],
    isLoading,
    isError,
  } = useQuery<course[]>({
    queryKey: ["courses", user?.id],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/my-courses`, {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching courses:", error);
        return [];
      }
    },
  });

  const [pageCount, setPageCount] = useState(1);
  const itemsPerPage = 3;
  const startIndex = (pageCount - 1) * itemsPerPage;
  const paginatedCourses = courses.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  if (isError) return <p>Failed to load courses.</p>;

  return (
    <div className="p-6 pt-28 h-full">
      <header className="mb-8">
        <h1 className="text-5xl font-bold">
          Hello, {user?.firstName} {user?.lastName}
        </h1>
        <p className="text-2xl mt-5 font-medium">Your Courses</p>
      </header>
      {!isLoading ? (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedCourses.map((course: course) => (
              <div
                // @ts-ignore
                key={course?.id}
                className="card w-full bg-base-100 shadow-md border-base-300 border rounded-md"
                onClick={() => navigate(`/course/${course?.id}/edit`)}
              >
                <figure>
                  <img
                    src={course?.thumbnail || "https://via.placeholder.com/350x200"}
                    alt="Placeholder"
                    className="w-full h-52 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{course?.title}</h2>
                  <div className="card-actions justify-end">
                    <button className="btn gap-2 rounded-lg">
                      <Pencil className="w-3 h-3" />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-20">
          <div className="flex w-[530px] h-[300px] flex-col gap-4">
            <div className="skeleton h-full w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-[530px] h-[300px] flex-col gap-4">
            <div className="skeleton h-full w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-[530px] h-[300px] flex-col gap-4">
            <div className="skeleton h-full w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        </div>
      )}
      <div className="join grid grid-cols-2 mt-6">
        <button
          className="join-item btn border border-base-300"
          onClick={() => setPageCount(pageCount - 1)}
          disabled={pageCount === 1}
        >
          <ChevronLeft />
          Previous
        </button>
        <button
          className="join-item btn border border-base-300"
          disabled={pageCount === totalPages}
          onClick={() => setPageCount(pageCount + 1)}
        >
          Next
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default MyCourses;
