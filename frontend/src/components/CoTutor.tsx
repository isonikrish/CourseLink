import { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../utils/backend_url";
import toast from "react-hot-toast";

function CoTutor({ firstName, lastName, email, permissions, id }: any) {
  const [selectedPermissions, setSelectedPermissions] = useState(permissions);

  const handlePermissionChange = (permission: string) => {
    setSelectedPermissions((prev: any) =>
      prev.includes(permission)
        ? prev.filter((p: any) => p !== permission)
        : [...prev, permission]
    );
  };
  const handleChangePermissions = async () => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/course/change-permissions`,
        {
          id,
          permissions: selectedPermissions,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Updated Permissions");
      }
    } catch (error) {
      toast.error("Error in updating permissions");
    }
  };

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">
                {firstName[0]?.toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <div className="font-bold">
              {firstName} {lastName}
            </div>
          </div>
        </div>
      </td>
      <td>
        {email}
        <br />
      </td>
      <td className="relative">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 p-2 rounded-full transition ease-in-out"
          >
            <EllipsisVertical />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-md shadow-lg w-52 p-3 space-y-2 z-[1] border-base-300 border bg-base-100"
          >
            {/* Edit Permission */}
            <li className="cursor-pointer transition w-full">
              <div className="form-control">
                <label className="label cursor-pointer flex justify-between items-center">
                  <span className="label-text">Edit</span>
                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes("edit")}
                    onChange={() => handlePermissionChange("edit")}
                    className="checkbox ml-5"
                  />
                </label>
              </div>
            </li>
            {/* Add Permission */}
            <li className="cursor-pointer transition">
              <div className="form-control w-full">
                <label className="label cursor-pointer flex justify-between items-center">
                  <span className="label-text">Add</span>
                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes("add")}
                    onChange={() => handlePermissionChange("add")}
                    className="checkbox ml-5"
                  />
                </label>
              </div>
            </li>
            {/* Status Permission */}
            <li className="cursor-pointer transition">
              <div className="form-control w-full">
                <label className="label cursor-pointer flex justify-between items-center">
                  <span className="label-text">Status</span>
                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes("status")}
                    onChange={() => handlePermissionChange("status")}
                    className="checkbox ml-5"
                  />
                </label>
              </div>
            </li>
            <button
              className="btn border border-gray-500"
              onClick={() => handleChangePermissions()}
            >
              Save Changes
            </button>
          </ul>
        </div>
      </td>
    </tr>
  );
}

export default CoTutor;
