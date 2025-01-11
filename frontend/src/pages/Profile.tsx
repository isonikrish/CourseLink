import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../utils/backend_url";
import axios from "axios";
import { Mail, User, BookOpen, UserPlus } from "lucide-react"; // Added BookOpen and UserPlus icons
import { useAuth } from "../stores/useAuth";


function Profile() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { data } = useQuery({
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
        
          <h1 className="text-4xl font-semibold mb-8 text-center">Profile</h1>
        
        <div className="w-full shadow-lg p-8">
          <div className="flex gap-12 items-center justify-between">
            <div className="w-72 h-72">
              <div className="bg-neutral text-neutral-content w-72 h-72 rounded-full flex items-center justify-center">
                <span className="text-7xl font-bold">
                  {data?.firstName[0]?.toUpperCase()}
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
                    <div className="flex items-center space-x-2 bg-green-500 text-white rounded-full py-2 px-6 shadow-lg transform transition-all duration-300 hover:scale-105 ml-5">
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
      </div>
    </div>
  );
}

export default Profile;
