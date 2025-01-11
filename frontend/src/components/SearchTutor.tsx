import axios from "axios";
import { Search, Send } from "lucide-react";
import { useState } from "react";
import { User } from "../utils/types";
import { BACKEND_URL } from "../utils/backend_url";
import toast from "react-hot-toast";

function SearchTutor({courseId}: any) {
  const [tutors, setTutors] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const searchTutor = async () => {
    try {
      setIsloading(true);
      const response = await axios.get(
        `${BACKEND_URL}/course/get-tutor?email=${query}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setTutors(response.data);
      } else {
        setTutors([]);
      }
    } catch (error) {
      console.log(error);
      setTutors([]);
    } finally {
      setIsloading(false);
    }
  };

  const sendRequest = async (id: Number | null, courseId: Number | null) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/send-request/${id}`,
        {courseId},
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Sent Request");
      }
    } catch (error) {
      toast.error("Error in sending request");
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl border border-base-300">
      <div className="card-body">
        <h2 className="card-title mb-4">Search Tutor</h2>
        <div className="join">
          <label className="input input-bordered flex items-center gap-2 w-full">
            <input
              type="text"
              className="grow"
              placeholder="Enter email"
              required
              onChange={(e) => setQuery(e.target.value)}
            />
            <div
              className="flex items-center bg-base-200 p-2 rounded cursor-pointer gap-2"
              onClick={() => searchTutor()}
            >
              <Search className="w-5 h-5" />
            </div>
          </label>
        </div>
      </div>
      <div>
        <ul className="overflow-y-auto max-h-60">
          <div className="flex justify-center items-center w-full h-full">
            {isLoading && (
              <span className="loading loading-spinner loading-md"></span>
            )}
          </div>

          {tutors?.length === 0 && <div className="m-10">No tutors found.</div>}
          {tutors?.map((tutor: User, index) => (
            <li className="py-2" key={index}>
              <div className="card bg-base-100 shadow-sm">
                <div className="card-body">
                  <h4 className="text-xl">
                    {tutor?.firstName} {tutor?.lastName}
                  </h4>
                  <p className="text-gray-400">{tutor?.email}</p>
                  <button
                    className="btn flex items-center gap-2"
                    onClick={() => sendRequest(tutor?.id,courseId )}
                  >
                    <Send className="w-4 h-4" />
                    Send Request
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchTutor;
