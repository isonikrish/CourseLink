import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../utils/backend_url";
import Thumbnail from "../components/Thumbnail";
import PurchaseCard from "../components/PurchaseCard";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp } from "lucide-react";

function CourseDisplay() {
  const { id } = useParams();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleFetchCourse = async () => {
    if (id) {
      const parsedId = parseInt(id);
      const res: any = await axios.get(
        `${BACKEND_URL}/course/public-course/${parsedId}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        return res.data;
      } else {
        return null;
      }
    }
    return null;
  };

  const { data } = useQuery({
    queryKey: ["course", id],
    queryFn: () => handleFetchCourse(),
    staleTime: 1000 * 60 * 5,
  });

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  return (
    <div className="pt-20">
      <div className="relative w-full h-52">
        <Thumbnail title={data?.title} />
        <div className="absolute top-0 right-0 w-1/3">
          <PurchaseCard course={data} />
        </div>
      </div>

      <div className="p-4 w-1/2">
        <h2 className="text-2xl font-bold mb-5 mt-5 border-b py-5">
          Description
        </h2>
        <div className="prose max-w-full">
          <p
            dangerouslySetInnerHTML={{
              __html: showFullDescription
                ? data?.description
                : data?.description?.slice(0, 300) + "...",
            }}
          />
          {data?.description?.length > 300 && (
            <button
              className="text-blue-500 hover:underline mt-3"
              onClick={toggleDescription}
            >
              {showFullDescription ? <div className="flex items-center">Show Less <ChevronUp /></div> : <div className="flex items-center">Show More <ChevronDown /></div>}
            </button>
          )}
        </div>
      </div>

      <div>
        <div className="flex flex-col w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-5 mt-5 py-5 border-b">Instructors</h2>
          <div className="flex items-center space-x-4 rounded-lg shadow">
            <div className="rounded-full flex items-center justify-center w-16 h-16 border">
              <span className="text-2xl font-bold">
                {data?.tutor?.firstName[0]?.toUpperCase()}
              </span>
            </div>
            <div>
              <Link
                to={`/profile/${data?.tutorId}`}
                className="text-lg font-bold hover:underline"
              >
                {data?.tutor?.firstName} {data?.tutor?.lastName}
              </Link>
              <p className="text-sm">{data?.tutor?.email}</p>
            </div>
          </div>

          {data?.coTutors?.length > 0 && (
            <div className="flex flex-col mt-3">
              {data.coTutors.map((coTutor: any) => (
                <div className="flex items-center space-x-4 rounded-lg shadow mb-3">
                  <div className="rounded-full flex items-center justify-center w-16 h-16 border">
                    <span className="text-2xl font-bold">
                      {coTutor.tutor.firstName[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <Link
                      to={`/profile/${coTutor?.tutor?.id}`}
                      className="text-lg font-bold hover:underline"
                    >
                      {coTutor.tutor.firstName} {coTutor.tutor.lastName}
                    </Link>
                    <p className="text-sm">{coTutor.tutor.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDisplay;
