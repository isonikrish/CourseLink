import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Overview from "../components/Overview";
import EditPage from "../components/EditPage";
import { useCourse } from "../stores/useCourse";
import { useParams } from "react-router-dom";
import { useAuth } from "../stores/useAuth";
import ManageCoTutors from "../components/ManageCoTutors";

function EditCourse() {
  const [menu, setMenu] = useState("overview");
  const { id } = useParams();
  const {user} = useAuth()
  const [course, setCourse] = useState(null);
  const { fetchCourse } = useCourse();
  useEffect(() => {
    async function handleFetchCourse() {
      if (id) {
        const courseId = parseInt(id);
        if (!isNaN(courseId)) {
          const response = await fetchCourse(courseId);
          //@ts-ignore
          setCourse(response);
        }
      }
    }

    handleFetchCourse()
  }, [id, user]);
  return (
    <div className="flex w-full">
      <Sidebar setMenu={setMenu} />
      <div className="pt-16 w-full">
        {menu === "overview" && <Overview />}
        {menu === "edit" && <EditPage course={course}/>}
        {menu === "manage" && <ManageCoTutors course={course} />}
      </div>
    </div>
  );
}

export default EditCourse;
