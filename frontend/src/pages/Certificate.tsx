import axios from "axios";
import { useAuth } from "../stores/useAuth";
import { BACKEND_URL } from "../utils/backend_url";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import html2canvas from "html2canvas";
import { Book, Download } from "lucide-react";

const replaceOklchColor = (style: string) => {
  return style.replace(/oklch\([^\)]+\)/g, "rgb(0, 0, 0)");
};

function Certificate() {
  const { user } = useAuth();
  const { courseId }: any = useParams();

  const fetchEnrolledCourse = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/course/enrolled-course/${parseInt(courseId)}`,
        { withCredentials: true }
      );
      return response.data || [];
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        toast.error("Enroll in the course to get the certificate");
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["certificate", courseId],
    queryFn: () => fetchEnrolledCourse(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  if (isLoading)
    return (
      <div className="h-screen pt-24 px-10">
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );

  const course = data;
  const enrollmentDate = new Date(
    course.enrollments[0]?.enrolledAt
  ).toLocaleDateString();

  const handleDownload = () => {
    const element: any = document.getElementById("certificate");
    if (element) {
      html2canvas(element, {
        onclone: (document) => {
          document.body.querySelectorAll("*").forEach((node) => {
            if (node instanceof HTMLElement) {
              node.style.cssText = replaceOklchColor(node.style.cssText);
            }
          });

          const styles = document.querySelectorAll("style");
          styles.forEach((styleElement) => {
            if (styleElement instanceof HTMLStyleElement) {
              styleElement.innerHTML = replaceOklchColor(
                styleElement.innerHTML
              );
            }
          });

          const links = document.querySelectorAll("link[rel='stylesheet']");
          links.forEach((link) => {
            if (link instanceof HTMLLinkElement) {
              fetch(link.href)
                .then((res) => res.text())
                .then((cssText) => {
                  const updatedCssText = replaceOklchColor(cssText);
                  const style = document.createElement("style");
                  style.innerHTML = updatedCssText;
                  document.head.appendChild(style);
                });
            }
          });
        },
      })
        .then((canvas) => {
          const link = document.createElement("a");
          link.download = "certificate.png";
          link.href = canvas.toDataURL();
          link.click();
        })
        .catch(() => {});
    }
  };

  return (
    <div className="flex justify-center flex-col gap-9">
      <div
        className="mt-28 mx-auto w-[900px] bg-gradient-to-r rounded-lg border border-black pt-10 bg-white text-black relative"
        id="certificate"
      >
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-indigo-400 via-purple-600 to-pink-600 opacity-20 rounded-lg -translate-x-8 -translate-y-0 rotate-45"></div>
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-bl from-green-500 to-blue-600 opacity-15 rounded-full -translate-x-4 -translate-y-0"></div>

        <div className="absolute bottom-0 right-0 w-36 h-36 bg-gradient-to-tl from-orange-400 via-yellow-500 to-green-500 opacity-25 rounded-full translate-x-8 translate-y-0 rotate-12"></div>
        <div className="absolute bottom-0 right-0 w-44 h-44 bg-gradient-to-br from-red-500 to-blue-800 opacity-30 rounded-full translate-x-4 translate-y-0"></div>

        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="flex-1 flex items-center justify-center gap-2">
              <Book className="text-xl" />
              <div className="text-xl cursor-pointer font-semibold transition duration-300 ease-in-out">
                CourseLink
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-semibold uppercase tracking-wider font-serif">
            <div className="text-6xl">Certificate</div>
            of achievement
          </h1>
        </div>

        <div className="text-center mb-6">
          <p className="text-lg font-semibold">This is to certify that</p>
          <div className="text-3xl font-bold mt-2 uppercase flex flex-col justify-center items-center">
            {user?.firstName} {user?.lastName}
            <div className="h-[3px] w-96 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 mt-4 rounded-full shadow-lg"></div>
          </div>

          <p className="text-lg font-semibold mt-4">
            has successfully completed the
          </p>
          <h3 className="text-2xl font-bold mt-2">{course.title}</h3>
        </div>

        <div className="ml-5 mt-8 mb-4">
          <div className="text-sm">
            <span className="font-semibold capitalize">
              {course.tutor.firstName} {course.tutor.lastName}
            </span>
            <div className="h-[1px] bg-black mt-2 w-20"></div>
            <span className="text-gray-600 text-[12px]">Instructor</span>
          </div>

          {course.coTutors.length > 0 && (
            <div className="text-sm mt-2 flex gap-4">
              {course.coTutors.map((coTutor: any) => (
                <span key={coTutor.tutor.id}>
                  <span className="font-semibold capitalize">
                    {coTutor.tutor.firstName} {coTutor.tutor.lastName}
                  </span>
                  <div className="h-[1px] bg-black mt-2 w-20"></div>
                  <span className="text-gray-600 text-[12px]">Instructor</span>
                </span>
              ))}
            </div>
          )}

          <p className="text-sm text-black mt-4 border-t border-gray-300 w-full py-2">
            Completed on : {enrollmentDate}
          </p>
        </div>
      </div>
      <button
        className="btn btn-wide mx-auto border border-white"
        onClick={handleDownload}
      >
        <Download /> Download PNG
      </button>
    </div>
  );
}

export default Certificate;
