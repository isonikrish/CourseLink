import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../utils/backend_url";
import axios from "axios";
import { Camera, Mail, User } from "lucide-react";
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
  });

  return (
    <div className="pt-20 h-screen">
      {!isLoading ? (
        <div className="max-w-2xl mx-auto p-4 py-8">
          <div className="bg-base-200 rounded-xl p-6 space-y-8">
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Profile</h1>
              <p className="mt-2">Profile information</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <span
                  className={`absolute -top-3 -right-6 px-4 py-1.5 text-xs font-medium rounded-lg shadow-lg transform transition-transform hover:scale-105 ${
                    data?.role === "tutor"
                      ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                      : "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
                  }`}
                >
                  {data?.role === "tutor" ? "Tutor" : "Student"}
                </span>

                {data?.id === user?.id && (
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 animate-pulse"
                  >
                    <Camera className="w-5 h-5 text-base-200" />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  First Name
                </div>
                <input
                  className="px-4 py-2.5 bg-base-200 rounded-lg border"
                  type="text"
                  value={data?.firstName}
                />
              </div>
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Last Name
                </div>
                <input
                  className="px-4 py-2.5 bg-base-200 rounded-lg border"
                  type="text"
                  value={data?.lastName}
                />
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                  {data?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto p-4 py-8">
          <div className="bg-base-200 rounded-xl p-6 space-y-8">
            <div className="text-center">
              <div className="h-8 w-1/2 skeleton rounded"></div>
              <div className="h-6 w-1/3 skeleton mt-2 rounded"></div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="avatar">
                  <div className="w-24 h-24 skeleton rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <div className="h-4 w-1/2 skeleton rounded"></div>
                </div>
                <div className="h-12 w-full skeleton rounded"></div>
              </div>
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <div className="h-4 w-1/2 skeleton rounded"></div>
                </div>
                <div className="h-12 w-full skeleton rounded"></div>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <div className="h-4 w-1/2 skeleton rounded"></div>
                </div>
                <div className="h-12 w-full skeleton rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
