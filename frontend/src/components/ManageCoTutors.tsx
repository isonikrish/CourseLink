import { Plus} from "lucide-react";
import { useState } from "react";
import SearchTutor from "./SearchTutor";
import CoTutor from "./CoTutor";

function ManageCoTutors({ course }: any) {
  const [isAddTutor, setIsAddTutor] = useState(false);

  
  

  return (
    <div className="px-10 py-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Manage Co Tutors</h1>
        <div className="flex gap-3 relative">
          <button
            className="btn rounded-lg flex items-center gap-2"
            onClick={() => setIsAddTutor(!isAddTutor)}
          >
            <Plus /> Add Tutor
          </button>
        </div>
        {isAddTutor && (
          <div className="absolute right-20 top-40 z-10">
            <SearchTutor courseId={course.id} />
          </div>
        )}
      </div>

      <div className="mt-10">
        <table className="table">
          <thead>
            <tr>
              <th>Tutor</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {course?.coTutors.map((coTutor: any) => {
              return (
                <CoTutor firstName={coTutor?.tutor.firstName} lastName={coTutor?.tutor.lastName} email={coTutor?.tutor.email} id={coTutor?.id} permissions={coTutor?.permissions}/>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageCoTutors;
