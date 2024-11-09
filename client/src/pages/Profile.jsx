import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import placeholder from '../assets/placeholder.png';
import { useMainContext } from '../contexts/Context';
import { LiaUserEditSolid } from "react-icons/lia";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import EditProfile from '../components/EditProfile';

function Profile() {
  const { userId } = useParams();
  const { user, handleLogout, handleGetUser, displayUser } = useMainContext();
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  useEffect(() => {
    handleGetUser(userId);
  }, [userId]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-6">
        <div className="flex flex-col items-center w-1/3">
          <div className="relative mb-4">
            <img
              src={displayUser?.profilePicUrl || placeholder}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-[#8c52ff] shadow-lg"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
          </div>
          <h1 className="text-2xl font-bold">{displayUser?.fullName}</h1>
          <p className="text-md text-gray-500">{displayUser?.role}</p>

          <div className="mt-6">
            <div id="social-links" className="flex gap-6">
              {displayUser?.socialLinks?.linkedin && (
                <a
                  href={displayUser.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaLinkedin size={24} />
                </a>
              )}
              {displayUser?.socialLinks?.twitter && (
                <a
                  href={displayUser.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600"
                >
                  <FaTwitter size={24} />
                </a>
              )}
              {displayUser?.socialLinks?.github && (
                <a
                  href={displayUser.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-gray-600"
                >
                  <FaGithub size={24} />
                </a>
              )}
              {displayUser?.socialLinks?.website && (
                <a
                  href={displayUser.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800"
                >
                  <FaGlobe size={24} />
                </a>
              )}
            </div>
          </div>

          {user?._id === displayUser?._id && (
            <div className="mt-6 text-center relative">
              <div className="flex justify-center gap-4">
                <button
                  className="bg-white text-[#8c52ff] font-semibold py-2 px-8 rounded-lg hover:bg-[#8c52ff] hover:text-white transition duration-200 ease-in-out transform hover:scale-105 border border-[#8c52ff] flex items-center gap-2"
                  onClick={() => setEditProfileOpen(!editProfileOpen)}>
                  <LiaUserEditSolid className="text-2xl" />
                  Edit Profile
                </button>
                <div className="absolute z-10 top-0 left-96">
                  {editProfileOpen ? <EditProfile /> : ''}
                </div>
                <button
                  className="bg-[#8c52ff] text-white font-semibold py-2 px-8 rounded-lg hover:bg-[#7a40e1] transition duration-200 ease-in-out transform hover:scale-105"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-2/3">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">About Me</h2>
            <p className="text-gray-700">
              {displayUser?.bio || "Lorem ipsum dolor sit amet consectetur adipisicing elit."}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              {displayUser?.role === "tutor"
                ? `My Courses (${displayUser?.courses.length})`
                : `Enrolled Courses (${displayUser?.enrolledCourses.length})`}
            </h2>
            <div className="flex gap-4 flex-wrap">
              {displayUser?.role === "tutor" ? (
                displayUser?.courses.map((course, index) => (
                  <div key={index} className="w-1/4 p-2 bg-[#f7f7f7] rounded-md shadow-md">
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-gray-500">{course.description}</p>
                  </div>
                ))
              ) : (
                displayUser?.enrolledCourses.map((course, index) => (
                  <div key={index} className="w-1/4 p-2 bg-[#f7f7f7] rounded-md shadow-md">
                    <h3 className="font-semibold">{course.title}</h3>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
