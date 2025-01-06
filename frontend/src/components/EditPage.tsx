import { BookOpenCheck, Trash2, X } from "lucide-react";
import { useRef, useState } from "react";
import { useCourse } from "../stores/useCourse";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditPage({ course }: any) {
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewThumbnail, setPreviewThumbnail] = useState(
    course?.thumbnail || "https://via.placeholder.com/350x200"
  );

  const [formData, setFormData] = useState({
    title: course?.title || "",
    description: course?.description || "",
    category: course?.category || "",
    price: course?.price || 0,
    thumbnail: course?.thumbnail || "",
  });

  const { editCourse } = useCourse();

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, thumbnail: file });
      setPreviewThumbnail(URL.createObjectURL(file));
    }
  };

  const clearThumbnail = () => {
    setFormData({ ...formData, thumbnail: "" });
    setPreviewThumbnail("https://via.placeholder.com/350x200");
  };

  const saveChanges = async () => {
    setIsLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", formData.price);


    if (formData.thumbnail instanceof File) {
      data.append("thumbnail", formData.thumbnail);
    }

    try {
      if (id) await editCourse(parseInt(id), data);
    } catch (error) {
      console.error("Failed to save changes:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="form-control mb-5">
          <span className="label-text font-semibold mb-2">Thumbnail</span>

          <div className="relative max-w-sm">
            <img
              src={previewThumbnail}
              alt="Thumbnail Preview"
              className="rounded-lg shadow-lg w-full"
            />
            {previewThumbnail !== "https://via.placeholder.com/350x200" && (
              <button
                onClick={clearThumbnail}
                className="absolute top-2 right-2 rounded-full p-2 shadow-md bg-black text-white"
                aria-label="Clear Thumbnail"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="mt-4">
            <input
              type="file"
              className="file-input w-full max-w-xs border border-base-300 rounded-lg"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleThumbnailChange}
            />
          </div>
        </div>

        <div className="form-control mb-5">
          <span className="label-text font-semibold mb-2">Title</span>
          <input
            type="text"
            placeholder="Course Title"
            className="input input-bordered w-full"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        <div className="form-control mb-5">
          <span className="label-text font-semibold mb-2">Description</span>
          <ReactQuill
            value={formData.description}
            onChange={(content) =>
              setFormData({ ...formData, description: content })
            }
            className="quill-border"
            placeholder="Write a detailed description"
          />
        </div>

        <div className="flex gap-6">
          <div className="form-control w-full">
            <span className="label-text font-semibold">Category</span>
            <select
              className="select select-bordered w-full"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option disabled value="">
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
            <span className="label-text font-semibold">Price (INR)</span>
            <input
              type="number"
              min={0}
              placeholder="Enter price"
              className="input input-bordered w-full"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: Math.max(0, parseInt(e.target.value, 10) || 0),
                })
              }
            />
          </div>
        </div>
      </div>

      <button className="btn mt-10 rounded-md" onClick={saveChanges}>
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
