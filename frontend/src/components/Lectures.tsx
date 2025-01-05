import { Plus, X, Eye, Trash } from "lucide-react";
import AddLecture from "./AddLecture";
import axios from "axios";
import { BACKEND_URL } from "../utils/backend_url";
import { useAuth } from "../stores/useAuth";
import toast from "react-hot-toast";

function Lectures({ course }: any) {
  const openModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
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
          <button
            className="btn flex items-center gap-2 border border-base-300"
            onClick={() => openModal()}
          >
            <Plus />
            Add Lecture
          </button>

          <dialog id="my_modal_1" className="modal">
            <div className="modal-box border border-base-300 rounded-lg relative">
              <form method="dialog">
                <button className="btn btn-md btn-circle absolute top-2 right-2">
                  <X />
                </button>
                <AddLecture />
              </form>
            </div>
          </dialog>
        </div>
      </div>

      <div className="overflow-x-auto mt-8">
        <table className="table">
          <thead>
            <tr>
              <th>Lecture Title</th>
              <th>Added By</th>

              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {course?.Lecture?.map((lecture: any, index: any) => (
              <tr key={index}>
                <td>
                  <div className="font-bold">{lecture?.title}</div>
                </td>
                <td>
                  <span className="text-sm opacity-75">
                    {lecture?.tutor.firstName} {lecture?.tutor.lastName}
                  </span>
                </td>
                <td>
                  {/* <span className="text-sm opacity-75">{lecture.duration}</span> */}
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <button className="btn flex items-center gap-2 rounded-lg">
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    <button className="btn rounded-lg text-red-600 flex items-center gap-2" onClick={()=>removeLecture(lecture?.id)}>
                      <Trash /> Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {(!course?.Lecture || course.Lecture.length === 0) && (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-4">
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
