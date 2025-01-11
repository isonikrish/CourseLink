import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Overview from "../components/Overview";
import EditPage from "../components/EditPage";
import { useCourse } from "../stores/useCourse";
import { useParams } from "react-router-dom";
import { useAuth } from "../stores/useAuth";
import ManageCoTutors from "../components/ManageCoTutors";
import NoAccess from "../components/NoAccess";
import Lectures from "../components/Lectures";
import Enrollments from "../components/Enrollments";

function EditCourse() {
  const [menu, setMenu] = useState("overview");
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { fetchCourse } = useCourse();

  async function handleFetchCourse() {
    if (id) {
      const courseId = parseInt(id);
      if (!isNaN(courseId)) {
        const response = await fetchCourse(courseId);
        setCourse(response);
        setLoading(false);
      }
    }
  }
  useEffect(() => {
    handleFetchCourse();
  }, [id, user]);

  const hasEditPermission: any = course?.coTutors?.some(
    (coTutor: any) =>
      coTutor.tutor.id === user?.id && coTutor.permissions.includes("edit")
  );
  // const hasAddPermission: any = course?.coTutors?.some(
  //   (coTutor: any) =>
  //     coTutor.tutor.id === user?.id && coTutor.permissions.includes("add")
  // );

  const isMainTutor: any = course?.tutorId === user?.id;
  const hasManagePermission: any = course?.tutorId === user?.id;
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex w-full">
      <Sidebar setMenu={setMenu} menu={menu} />
      <div className="pt-16 w-full">
        {menu === "overview" && <Overview course={course} />}
        {menu === "edit" && (isMainTutor || hasEditPermission) ? (
          <EditPage course={course} />
        ) : (
          menu === "edit" && <NoAccess setMenu={setMenu} />
        )}
        {menu === "manage" && hasManagePermission ? (
          <ManageCoTutors course={course} />
        ) : (
          menu === "manage" && <NoAccess setMenu={setMenu} />
        )}
        {menu === "lectures" && <Lectures course={course} />}
        {menu === "enrollments" && <Enrollments course={course}/>}
      </div>
    </div>
  );
}

export default EditCourse;
