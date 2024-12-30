import { useState } from "react";
import { courseFromData } from "../utils/types";
import { useCourse } from "../stores/useCourse";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../stores/useAuth";

function CreateCourse() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<courseFromData>({
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { createCourse } = useCourse();
  const { user } = useAuth();
  const handleCreateCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await createCourse(formData);
      if (response?.status === 200) {
        queryClient.invalidateQueries<any>(["courses", user?.id]);
        navigate(`/course/${response.data.id}`);

        toast.success("Course Created");
      } else {
        toast.error("Failed to create course.");
      }
    } catch (error) {
      toast.error("Error creating course. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center px-4">
      <form
        className="space-y-6 w-full max-w-4xl p-6 border-2 border-base-300 rounded-lg shadow-lg"
        onSubmit={handleCreateCourse}
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Create a New Course
        </h2>

        <div className="form-control w-full">
          <div className="label mb-2">
            <span className="label-text font-semibold">Enter Title</span>
          </div>
          <input
            type="text"
            placeholder="Course Title"
            className="input input-bordered w-full py-3 px-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <p className="text-sm text-gray-500 mt-1">
            Title must be at least 5 characters long.
          </p>
        </div>

        <div className="form-control w-full">
          <div className="label mb-2">
            <span className="label-text font-semibold">Enter Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered w-full py-3 px-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Write a detailed description for the course"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
        </div>

        <button className="btn btn-wide text-lg font-semibold shadow-md hover:shadow-lg transition duration-300 rounded-lg">
          {isLoading ? (
            <>
              Creating <span className="loading loading-dots loading-md"></span>
            </>
          ) : (
            "Create"
          )}
        </button>
      </form>
    </div>
  );
}

export default CreateCourse;
