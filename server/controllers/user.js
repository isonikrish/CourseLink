import User from "../models/user.js";
import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';

export async function handleGetUser(req, res) {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function handleEditProfile(req, res) {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { bio, socialLinks } = req.body;

    // Check if there's an existing profilePicUrl or set a default
    let profilePicUrl = user.profilePicUrl || ""; // Default to an empty string if profilePicUrl is not set

    if (req.file) {
      // Handle profile picture upload to Cloudinary using async/await
      const uploadResponse = await new Promise((resolve, reject) => {
        const bufferStream = new Readable();
        bufferStream.push(req.file.buffer);
        bufferStream.push(null); // End of stream

        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "Profile Pics" },
          (error, result) => {
            if (error) {
              reject(new Error("Error uploading to Cloudinary"));
            } else {
              resolve(result);
            }
          }
        );

        bufferStream.pipe(uploadStream);
      });

      // Update the profile picture URL after successful upload
      profilePicUrl = uploadResponse.secure_url;
    }

    // Update user information with the new profile picture URL, bio, and social links
    user.bio = bio || user.bio;
    user.socialLinks = { ...user.socialLinks, ...socialLinks };

    // If the profilePicUrl has changed, update it
    if (profilePicUrl && profilePicUrl !== user.profilePicUrl) {
      user.profilePicUrl = profilePicUrl;
    }

    await user.save();

    return res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


