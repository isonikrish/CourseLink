import { BookOpenCheck, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCourse } from "../stores/useCourse";
import { useParams } from "react-router-dom";

function EditPage({ course }: any) {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: course?.title || "",
    description: course?.description || "",
    category: course?.category || "",
    price: course?.price || 0,
  });
  const { editCourse } = useCourse();

  async function saveChanges() {
    setIsLoading(true);

    if (id) {
      const parsedId = parseInt(id);
      await editCourse(parsedId, formData);
    }

    setIsLoading(false);
  }

  return (
    <div className="px-10 py-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Edit Course</h1>
        <div className="flex gap-3">
          <button className="btn btn-outline rounded-lg text-green-600 flex items-center gap-2">
            <BookOpenCheck /> Publish
          </button>
          <button className="btn rounded-lg text-red-600 flex items-center gap-2">
            <Trash2 /> Delete
          </button>
        </div>
      </div>

      <div className="mt-10">
        <div className="form-control w-full mb-5">
          <div className="label mb-2">
            <span className="label-text font-semibold">Title</span>
          </div>
          <input
            type="text"
            placeholder="Course Title"
            className="input input-bordered w-full py-3 px-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            value={formData.title}
            onChange={(e: any) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <p className="text-sm text-gray-500 mt-1">
            Title must be at least 5 characters long.
          </p>
        </div>

        <div className="form-control w-full mb-5">
          <div className="label mb-2">
            <span className="label-text font-semibold">Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered w-full py-3 px-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Write a detailed description for the course"
            value={formData.description}
            onChange={(e: any) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
        </div>

        <div className="flex justify-between gap-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Category</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option disabled selected>
                Select Category
              </option>
              <option>Technology & Programming</option>
              <option>Business & Management</option>
              <option>Creative Arts & Design</option>
              <option>Health & Wellness</option>
              <option>Career Development</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-semibold">Price (INR)</span>
            </label>
            <input
              type="number"
              min={0}
              placeholder="Enter price"
              className="input input-bordered w-full"
              onInput={(e: any) => {
                if (e.target.value < 0) {
                  e.target.value = 0;
                }
              }}
              value={formData.price}
              onChange={(e) => {
                const value = e.target.value;
                const numericValue = parseInt(value, 10);

                setFormData({
                  ...formData,
                  price: isNaN(numericValue) ? 0 : numericValue,
                });
              }}
            />
          </div>
        </div>
      </div>
      <button className="btn mt-10 rounded-md" onClick={() => saveChanges()}>
        {isLoading ? (
          <span className="loading loading-dots loading-md"></span>
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );
}

export default EditPage;
