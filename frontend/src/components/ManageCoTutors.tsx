import { EllipsisVertical, Plus } from "lucide-react";
import { useState } from "react";
import SearchTutor from "./SearchTutor";

function ManageCoTutors({ course }: any) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAddTutor, setIsAddTutor] = useState(false);

  return (
    <div className="px-10 py-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Manage Co Tutors</h1>
        <div className="flex gap-3 relative ">
          <button className="btn rounded-lg flex items-center gap-2" onClick={()=>setIsAddTutor(!isAddTutor)}>
            <Plus /> Add Tutor
          </button>
        </div>
        {isAddTutor ? <div className="absolute right-20 top-40 z-10"><SearchTutor /></div>: ""}
      </div>

      <div>
        <div className="overflow-x-auto mt-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Tutor</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                    </div>
                  </div>
                </td>
                <td>
                  example@email.com
                  <br />
                </td>
                <td>
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <EllipsisVertical />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageCoTutors;
