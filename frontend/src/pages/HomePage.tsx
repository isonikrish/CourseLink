import { useState } from "react";
import CourseCard from "../components/CourseCard";
import { useAuth } from "../stores/useAuth";

function HomePage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([1, 2, 3, 4]);

  return (
    <div className="pt-28">
      <div>
        <div className="flex justify-between px-20">
          <h1 className="text-3xl font-bold">Explore Courses</h1>

          <select className="select select-bordered max-w-xs">
            <option disabled selected>
              Category
            </option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {courses.map((course) => (
            <CourseCard key={course} id={course} />
          ))}
        </div>
      </div>

      <div className="flex justify-between px-20 my-10">
        <h1 className="text-3xl font-bold">Continue Watching</h1>
      </div>
    </div>
  );
}

export default HomePage;
