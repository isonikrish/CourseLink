import React, { useState, useEffect } from 'react';
import { useMainContext } from '../contexts/Context';

function EditProfile() {
  const { user, onUpdateProfile } = useMainContext();
  const [bio, setBio] = useState(user?.bio || '');
  const [socialLinks, setSocialLinks] = useState({
    linkedin: user?.socialLinks?.linkedin || '',
    twitter: user?.socialLinks?.twitter || '',
    github: user?.socialLinks?.github || '',
    website: user?.socialLinks?.website || '',
  });

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prevLinks) => ({
      ...prevLinks,
      [name]: value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bio', bio);
    Object.keys(socialLinks).forEach((key) => {
      formData.append(`socialLinks[${key}]`, socialLinks[key]);
    });

    await onUpdateProfile(formData); // Call the update function from context
  };



  return (
    <div className="container mx-auto p-6 bg-white border rounded-lg w-[1000px]">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">

        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-2" htmlFor="bio">
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
            rows="4"
            placeholder="Write a short bio about yourself"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-2">Social Links</label>
          <input
            type="text"
            name="linkedin"
            value={socialLinks.linkedin}
            onChange={handleSocialLinkChange}
            className="border border-gray-300 rounded-lg p-2 mb-2"
            placeholder="LinkedIn URL"
          />
          <input
            type="text"
            name="twitter"
            value={socialLinks.twitter}
            onChange={handleSocialLinkChange}
            className="border border-gray-300 rounded-lg p-2 mb-2"
            placeholder="Twitter URL"
          />
          <input
            type="text"
            name="github"
            value={socialLinks.github}
            onChange={handleSocialLinkChange}
            className="border border-gray-300 rounded-lg p-2 mb-2"
            placeholder="GitHub URL"
          />
          <input
            type="text"
            name="website"
            value={socialLinks.website}
            onChange={handleSocialLinkChange}
            className="border border-gray-300 rounded-lg p-2"
            placeholder="Personal Website URL"
          />
        </div>

        <button
          type="submit"
          className="bg-[#8c52ff] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#7a40e1] transition duration-200"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
