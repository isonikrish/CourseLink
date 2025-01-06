import axios from "axios";
import { BACKEND_URL } from "../utils/backend_url";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "../stores/useAuth";

function Notifications() {
  const { user } = useAuth();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/user/get-notifications`,
          {
            withCredentials: true,
          }
        );
        return response.data || [];
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    staleTime: 120000,
    refetchInterval: 120000,
  });

  const handleAcceptRequest = async ({
    courseId,
    tutorId,
    notificationId,
    senderId,
  }: {
    courseId: number;
    tutorId: number;
    notificationId: number;
    senderId: number;
  }) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/accept-request`,
        {
          courseId,
          tutorId,
          notificationId,
          senderId,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Accepted the request");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

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
        {!data || data.length === 0 ? (
          <div className="text-center text-lg text-gray-500">
            No notifications available
          </div>
        ) : (
          data.map((notification: any) => (
            <div
              key={notification.id}
              className="flex items-start space-x-4 p-4 rounded-lg border border-base-300"
            >
              <div className="flex-shrink-0">
              <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content w-10 h-10 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold">
                      {notification?.fromUser.firstName[0]?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-lg">
                    {notification?.fromUser?.firstName}{" "}
                    {notification?.fromUser?.lastName}
                  </div>
                </div>
                <div className="text-sm mt-2">
                  {notification?.notification === "request" && (
                    <>
                      {`${notification?.fromUser?.firstName} ${notification?.fromUser?.lastName} has requested to collaborate with you as a co-tutor for the course titled `}
                      <span className="text-blue-400 font-semibold italic hover:text-blue-500 hover:underline cursor-pointer">
                        '{notification?.course?.title}'
                      </span>
                      .
                    </>
                  )}

                  {notification?.notification === "accepted" && (
                    <>
                      {`${notification?.fromUser?.firstName} ${notification?.fromUser?.lastName} has accepted your collaboration request for the course titled `}
                      <span className="text-blue-400 font-semibold italic hover:text-blue-500 hover:underline cursor-pointer">
                        '{notification?.course?.title}'
                      </span>
                      .
                    </>
                  )}

                  {notification?.notification === "delete_lecture" && (
                    <>
                      {`${notification?.fromUser?.firstName} ${notification?.fromUser?.lastName} has removed your lecture from the course titled `}
                      <span className="text-blue-400 font-semibold italic hover:text-blue-500 hover:underline cursor-pointer">
                        '{notification?.course?.title}'
                      </span>
                      .
                    </>
                  )}
                </div>
              </div>
              {notification?.notification === "request" && (
                <div className="flex gap-2 self-center">
                  <button
                    className="btn"
                    onClick={() =>
                      handleAcceptRequest({
                        courseId: notification?.courseId,
                        tutorId: notification?.toId,
                        notificationId: notification?.id,
                        senderId: notification?.fromId,
                      })
                    }
                  >
                    Accept
                  </button>
                  <button className="btn btn-outline btn-error">Decline</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;
