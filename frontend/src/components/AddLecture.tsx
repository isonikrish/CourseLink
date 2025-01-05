import axios from "axios";
import { Plus } from "lucide-react";
import { BACKEND_URL } from "../utils/backend_url";
import { useState } from "react";
import toast from "react-hot-toast";

function AddLecture({ course }: any) {
    const [lectData, setLectData] = useState({
        title: ""
    })

  const addLecture = async () =>{
    if (!lectData.title || lectData.title.length < 5) {
        toast.error("Lecture title must be at least 5 characters long.");
        return;
    }
    try {
        if (course?.id) {
            const res = await axios.post(`${BACKEND_URL}/lecture/add/${course?.id}`, lectData, { withCredentials: true });
            if (res.status === 200) {
                toast.success("Lecture Added");
                setLectData({ title: "" }); 
            }
        }
        
    } catch (error) {
        toast.error("Error in adding lecture")
    }
  }
  return (
    <div className="px-10 py-5">
      
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Add Lecture</h1>
        </div>
        <div className="mt-10">
        <div className="form-control mb-10 ">
          <span className="label-text font-semibold mb-2">Lecture Title</span>
          <input
            type="text"
            placeholder="Lecture Title"
            className="input input-bordered w-full"
            value={lectData.title}
            onChange={(e:any)=>setLectData({...lectData, title: e.target.value})}
          />
          <p className="text-sm text-gray-500 mt-1">
            Title must be at least 5 characters long.
          </p>
        </div>
        <div className="form-control mb-5">
          <span className="label-text font-semibold mb-2">Lecture Video</span>
          <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs border border-base-300 rounded-md" />
        </div>

        <button className="btn border-base-300 mt-10" onClick={()=>addLecture()}><Plus /> Add Lecture</button>
      </div>
    </div>
  );
}

export default AddLecture;
