import axios from "axios";
import { BACKEND_URL } from "../utils/backend_url";
import { useQuery } from "@tanstack/react-query";

function Notifications() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/user/get-notifications`,
          {
            withCredentials: true,
          }
        );
        return response.data || []; // Return empty array if no data is found
      } catch (error) {
        console.log(error);
        return []; // Return an empty array if there's an error
      }
    },
  });

  if (isLoading) {
    return (
      <div className="h-screen pt-24 px-10">
        <h1 className="text-3xl font-bold mb-6">Notifications</h1>
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen pt-24 px-10">
        <h1 className="text-3xl font-bold mb-6">Notifications</h1>
        <div className="text-center text-lg text-red-500">
          Error loading notifications
        </div>
      </div>
    );
  }
  return (
    <div className="h-screen pt-24 px-10">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <div className="space-y-4">
        {data?.length === 0 && (
          <div className="text-center text-lg text-gray-500">
            No notifications available
          </div>
        )}
        {data?.map((notification: any, index: number) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 rounded-lg border border-base-300"
          >
            <div className="flex-shrink-0">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img
                    alt="Notification Avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-lg">
                  {notification?.fromUser.firstName}{" "}
                  {notification?.fromUser.lastName}
                </div>
              </div>
              <div className="text-sm mt-2">
                {notification?.fromUser.firstName}{" "}
                {notification?.fromUser.lastName} has requested to collaborate
                with you as a co-tutor for the course titled
                <span className="text-blue-400 font-semibold italic hover:text-blue-500 hover:underline cursor-pointer">
                  '{notification?.course.title}'
                </span>
                .
              </div>
            </div>
            <div className="flex gap-2 self-center">
              <button className="btn">Accept</button>
              <button className="btn btn-outline btn-error">Decline</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
