import { BookOpenCheck, Camera, Trash2, X } from "lucide-react";
import { useRef, useState } from "react";
import { useCourse } from "../stores/useCourse";
import { useParams } from "react-router-dom";

function EditPage({ course }: any) {
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewThumbnail, setPreviewThumbnail] = useState(
    course?.thumbnail || "https://via.placeholder.com/150"
  );
  const [formData, setFormData] = useState({
    title: course?.title || "",
    description: course?.description || "",
    category: course?.category || "",
    price: course?.price || 0,
    thumbnail: course?.thumbnail || "https://via.placeholder.com/150",
  });
  
  const { editCourse } = useCourse();
  const handleThumbnailChange = (e: any) => {
    if (e.target.name === "thumbnail") {
      const file = e.target.files[0];
      if (file) {
        setFormData({ ...formData, thumbnail: file });
        setPreviewThumbnail(URL.createObjectURL(file));
      }
    }
  };
  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };
  const clearThumbnail = () => {
    setFormData({ ...formData, thumbnail: "" });
    setPreviewThumbnail(course?.thumbnail || "https://via.placeholder.com/150");
  };

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
            <span className="label-text font-semibold">Thumbnail</span>
          </div>
          <div className="relative">
            {previewThumbnail && (
              <figure>
                <img
                  src={previewThumbnail}
                  alt="Placeholder"
                  className="h-72 w-1/2 object-cover"
                />

                <div className="absolute top-0 left-0 w-1/2 h-full bg-black bg-opacity-60"></div>
                <div className="text-2xl">
                  <X
                    size={32}
                    className="absolute z-10 top-2 left-2 transform cursor-pointer bg-base-200 rounded-full p-2 flex items-center justify-center"
                    onClick={() => clearThumbnail()}
                  />
                </div>
              </figure>
            )}
            <input
              type="file"
              name="thumbnail"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hidden"
              onChange={handleThumbnailChange}
              accept="image/*"
              id="thumbnailInput"
              ref={fileInputRef}
            />
            <Camera
              className="absolute top-1/2 left-80 cursor-pointer text-base-300"
              size={30}
              onClick={handleCameraClick}
            />
          </div>
        </div>
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
              <option disabled value={""}>
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
