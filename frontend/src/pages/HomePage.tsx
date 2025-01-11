import { useState } from "react";
import CourseCard from "../components/CourseCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BACKEND_URL } from "../utils/backend_url";

function HomePage() {
  const [category, setCategory] = useState("Technology & Programming");

  const fetchCourses = async (category: string) => {
    const response = await axios.get(
      `${BACKEND_URL}/course/get-courses/${category}`,
      { withCredentials: true }
    );
    return response.data || [];
  };

  const { data } = useQuery({
    queryKey: ["courses", category],
    queryFn: () => fetchCourses(category),
    staleTime: 1000 * 60 * 5,
  });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  return (
    <div className="pt-28">
      <div>
        <div className="flex justify-between px-20">
          <h1 className="text-3xl font-bold">Explore Courses</h1>

          <select
            className="select select-bordered max-w-xs"
            value={category}
            onChange={handleCategoryChange}
          >
            <option disabled>Select Category</option>
            <option>Technology & Programming</option>
            <option>Business & Management</option>
            <option>Creative Arts & Design</option>
            <option>Health & Wellness</option>
            <option>Career Development</option>
            <option>Other</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-4 px-20 py-10">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((course: any) => (
              <CourseCard key={course?.id} course={course} />
            ))
          ) : (
            <div className="flex justify-center items-center w-full h-64">
              <p className="text-center text-lg text-gray-500">
                No courses available in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
