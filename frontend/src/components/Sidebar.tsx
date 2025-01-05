import { Users, Edit, FileText, Library } from "lucide-react";
import { GrOverview } from "react-icons/gr";

type sidebarProp = {
  setMenu: (menu: string) => void;
  menu: string;
};

const Sidebar = ({ setMenu, menu }: sidebarProp) => {
  return (
    <aside className="flex flex-col w-64 h-screen overflow-y-auto border-r border-base-300 pt-16">
      <div className="flex flex-col justify-between flex-1">
        <nav>
          <div
            className={`flex items-center px-4 py-6 ${
              menu === "overview" ? "bg-base-200" : ""
            } hover:rounded-lg cursor-pointer border-b border-base-300 hover:bg-base-200`}
            onClick={() => setMenu("overview")}
          >
            <GrOverview className="w-5 h-5" />
            <span className="mx-4 font-medium">Overview</span>
          </div>

          <div
            className={`flex items-center px-4 py-6 ${
              menu === "edit" ? "bg-base-200" : ""
            } hover:rounded-lg cursor-pointer border-b border-base-300`}
            onClick={() => setMenu("edit")}
          >
            <Edit className="w-5 h-5" />
            <span className="mx-4 font-medium">Edit Course</span>
          </div>

          <div
            className={`flex items-center px-4 py-6 ${
              menu === "manage" ? "bg-base-200" : ""
            } hover:rounded-lg cursor-pointer border-b border-base-300`}
            onClick={() => setMenu("manage")}
          >
            <Users className="w-5 h-5" />
            <span className="mx-4 font-medium">Manage Co-Tutors</span>
          </div>

          <div
            className={`flex items-center px-4 py-6 ${
              menu === "lectures" ? "bg-base-200" : ""
            } hover:rounded-lg cursor-pointer border-b border-base-300`}
            onClick={() => setMenu("lectures")}
          >
            <Library className="w-5 h-5" />
            <span className="mx-4 font-medium">Lectures</span>
          </div>

          <div
            className={`flex items-center px-4 py-6 ${
              menu === "enrollments" ? "bg-base-200" : ""
            } hover:rounded-lg cursor-pointer border-b border-base-300`}
            onClick={() => setMenu("enrollments")}
          >
            <FileText className="w-5 h-5" />
            <span className="mx-4 font-medium">Enrollments</span>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
