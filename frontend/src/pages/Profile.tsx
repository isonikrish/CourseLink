import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../utils/backend_url";
import axios from "axios";
import { Camera, Mail, User, BookOpen, UserPlus } from "lucide-react"; // Added BookOpen and UserPlus icons
import { useAuth } from "../stores/useAuth";

function Profile() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/${id}`, {
          withCredentials: true,
        });
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
    },
    staleTime: 120000,
  });

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-semibold mb-8">Profile</h1>

        <div className="w-full shadow-lg p-8 border-b">
          <div className="flex gap-12 items-center justify-between">
            <div className="flex-shrink-0 w-52 h-52 rounded-full border-4 overflow-hidden">
              <div className="flex items-center justify-center h-full">
                <span className="text-4xl font-bold">
                  {user?.firstName[0]?.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="space-y-6 w-full">
              <div className="flex justify-between gap-6">
                <div className="space-y-2 w-1/2">
                  <div className="text-sm flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span>First Name</span>
                  </div>
                  <input
                    className="w-full p-4 border border-base-300 rounded-lg focus:outline-none"
                    type="text"
                    value={data?.firstName}
                    disabled
                  />
                </div>
                <div className="space-y-2 w-1/2">
                  <div className="text-sm flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span>Last Name</span>
                  </div>
                  <input
                    className="w-full p-4 border border-base-300 rounded-lg focus:outline-none"
                    type="text"
                    value={data?.lastName}
                    disabled
                  />
                </div>
              </div>


              <div className="mt-6 flex items-center space-x-4">
                Role:
                <span className="text-xl font-semibold">
                  {user?.role === "tutor" ? (
                    <div className="flex items-center space-x-2 bg-indigo-600 text-white rounded-full py-2 px-6 shadow-lg ml-5">
                      <BookOpen className="w-6 h-6" />
                      <span>Tutor</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 bg-green-500 text-white rounded-full py-2 px-6 shadow-lg transform transition-all duration-300 hover:scale-105">
                      <UserPlus className="w-6 h-6" />
                      <span>Student</span>
                    </div>
                  )}
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-sm flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>Email Address</span>
                </div>

                <input
                  className="w-full p-4 border border-base-300 rounded-lg focus:outline-none"
                  type="text"
                  value={data?.email}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          {user?.role === "tutor" ? (
            <h2 className="text-2xl font-semibold mb-6">Courses</h2>
          ) : (
            <h2 className="text-2xl font-semibold mb-6">Enrollments</h2>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="w-full shadow-lg rounded-lg border border-gray-200">
              <figure>
                <img
                  src="https://via.placeholder.com/150"
                  alt="Placeholder"
                  className="w-full h-52 object-cover rounded-t-lg"
                />
              </figure>
              <div className="p-6">
                <h3 className="text-xl font-semibold">Course Title</h3>
                <p className="text-sm mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
            <div className="w-full shadow-lg rounded-lg border border-gray-200">
              <figure>
                <img
                  src="https://via.placeholder.com/150"
                  alt="Placeholder"
                  className="w-full h-52 object-cover rounded-t-lg"
                />
              </figure>
              <div className="p-6">
                <h3 className="text-xl font-semibold">Course Title</h3>
                <p className="text-sm mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
