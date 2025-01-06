import { Plus, X, Eye, Trash } from "lucide-react";
import AddLecture from "./AddLecture";
import axios from "axios";
import { BACKEND_URL } from "../utils/backend_url";
import { useAuth } from "../stores/useAuth";
import toast from "react-hot-toast";
import PreviewVideo from "./PreviewVideo";

function Lectures({ course }: any) {
  const openModal = (num: number) => {
    const modal = document.getElementById(`my_modal_${num}`) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };
  const { user } = useAuth();

  const removeLecture = async (id: any) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/lecture/remove/${id}`,
        { courseId: course?.id, tutorId: user?.id },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        toast.success("Removed the lecture");
      }
    } catch (error) {
      toast.error("Error in removing lecture");
    }
  };

  return (
    <div className="px-10 py-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Lectures</h1>

        <div className="flex gap-3">
          <div
            className="btn flex items-center gap-2 border border-base-300"
            onClick={() => openModal(1)}
          >
            <Plus />
            Add Lecture
          </div>

          <dialog id="my_modal_1" className="modal">
            <div className="modal-box border border-base-300 rounded-lg relative">
              <button
                className="btn btn-md btn-circle absolute top-2 right-2"
                onClick={(e) => {
                  e.preventDefault();
                  const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
                  modal?.close();
                }}
              >
                <X />
              </button>

              <AddLecture course={course} />
            </div>
          </dialog>
        </div>
      </div>

      <div className="overflow-x-auto mt-8">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="w-1/3">Lecture Title</th>
              <th className="w-1/3">Added By</th>
              <th className="w-1/3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {course?.Lecture?.map((lecture: any, index: any) => (
              <tr key={index}>
                <td className="w-1/3">
                  <div className="font-bold">{lecture?.title}</div>
                </td>
                <td className="w-1/3">
                  <span className="text-sm opacity-75">
                    {lecture?.tutor.firstName} {lecture?.tutor.lastName}
                  </span>
                </td>
                <td className="w-1/3">
                  <div className="flex items-center gap-3">
                    <button className="btn flex items-center gap-2 rounded-lg" onClick={() => openModal(2)}>
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>

                    <dialog id="my_modal_2" className="modal">
                      <div className="modal-box border border-base-300 rounded-lg relative">
                        <button
                          className="btn btn-md btn-circle absolute top-2 right-2"
                          onClick={(e) => {
                            e.preventDefault();
                            const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
                            modal?.close();
                          }}
                        >
                          <X />
                        </button>

                        <PreviewVideo video={lecture?.video} thumbnailTitle={lecture?.title} />
                      </div>
                    </dialog>

                    <button
                      className="btn rounded-lg text-red-600 flex items-center gap-2"
                      onClick={() => removeLecture(lecture?.id)}
                    >
                      <Trash /> Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {(!course?.Lecture || course.Lecture.length === 0) && (
              <tr>
                <td colSpan={3} className="text-center text-gray-500 py-4">
                  No lectures available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Lectures;
