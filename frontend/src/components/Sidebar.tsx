import { Users, Edit, Plus, FileText } from 'lucide-react';
import { GrOverview } from 'react-icons/gr';

type sidebarProp = {
    setMenu: (menu: string) => void;
}
const Sidebar = ({ setMenu }: sidebarProp) => {
  return (
    <aside className="flex flex-col w-64 h-screen py-8 overflow-y-auto border-r border-base-300 pt-20">
      <div className="flex flex-col justify-between flex-1">
        <nav>
          <div
            className="flex items-center px-4 py-4 hover:bg-base-200 hover:rounded-lg cursor-pointer border-b border-base-300"
            onClick={() => setMenu("overview")}
          >
            <GrOverview className="w-5 h-5" />
            <span className="mx-4 font-medium">Overview</span>
          </div>

          <div
            className="flex items-center px-4 py-4 mt-5 hover:bg-base-200 hover:rounded-lg cursor-pointer border-b border-base-300"
            onClick={() => setMenu("edit")}
          >
            <Edit className="w-5 h-5" />
            <span className="mx-4 font-medium">Edit Course</span>
          </div>

          <div
            className="flex items-center px-4 py-4 mt-5 hover:bg-base-200 hover:rounded-lg cursor-pointer border-b border-base-300"
            onClick={() => setMenu("manage")}
          >
            <Users className="w-5 h-5" />
            <span className="mx-4 font-medium">Manage Co-Tutors</span>
          </div>

          <div
            className="flex items-center px-4 py-4 mt-5 hover:bg-base-200 hover:rounded-lg cursor-pointer border-b border-base-300"
            onClick={() => setMenu("addlecture")}
          >
            <Plus className="w-5 h-5" />
            <span className="mx-4 font-medium">Add Lecture</span>
          </div>

          <div
            className="flex items-center px-4 py-4 mt-5 hover:bg-base-200 hover:rounded-lg cursor-pointer border-b border-base-300"
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
