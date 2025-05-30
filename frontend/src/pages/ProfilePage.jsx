import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, User, Mail } from "lucide-react";

const ProfilePage = () => {
  const {
    authUser,
    isUpdatingProfile,
    updateProfile,
  } = useAuthStore();

    const [selectedImage, setselectedImage] = useState(null);

    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(-2);
      return `${day}/${month}/${year}`;
    };  

  const handleClick = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64img = reader.result;
      setselectedImage(base64img);
      await updateProfile({ profilePic: base64img });
      // once the store has the new URL, clear the preview
      setselectedImage(null);
    };
  };

  return (
    <div className="h-screen pt-5">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl space-y-8 p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Profile Page</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          <div className="relative w-32 h-32 rounded-full border-4 border-gray-300 flex items-center justify-center mx-auto">
            <div className="w-full h-full rounded-full overflow-hidden">
              <img
                src={selectedImage || authUser?.profilePic || "/avatar.png"}
                alt="Profile Picture"
                className="w-full h-full object-cover"
              />
            </div>
            <label className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 bg-yellow-400 p-2 rounded-full border-2 border-white cursor-pointer hover:scale-110 hover:bg-yellow-500 transition-transform duration-200 shadow-md">
              <Camera className="w-5 h-5 text-base-200" />
              <input
                type="file"
                className="hidden"
                onChange={handleClick}
                disabled={isUpdatingProfile}
                accept="image/*"
              />
            </label>
          </div>
          <p className="text-sm text-zinc-400 text-center">
            {isUpdatingProfile
              ? "Uploading..."
              : "Click the camera icon to update your profile picture"}
          </p>
          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <User className="w-5 h-5 text-gray-500" />
                <label className="text-gray-700 font-semibold">Name</label>
              </div>
              <div className="border p-2 rounded-lg shadow-md">
                <p className="text-lg">{authUser.fullName || "John Doe"}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Mail className="w-5 h-5 text-gray-500" />
                <label className="text-gray-700 font-semibold">Email ID</label>
              </div>
              <div className="border border-white p-2 rounded-lg shadow-md">
                <p className="text-lg">
                  {authUser?.email || "johndoe@example.com"}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">
                Additional Account Information
              </h2>

              <div className="mt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <label className="text-gray-700 font-semibold">
                    Member Since
                  </label>
                </div>
                <div className="border border-white p-1 rounded-lg shadow-md">
                  <p className="text-lg">{formatDate(authUser.createdAt)}</p>
                </div>
              </div>

              <hr className="my-4 border-t border-gray-300" />

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <label className="text-gray-700 font-semibold">
                    Account Status
                  </label>
                </div>
                <div className="border border-white p-1 rounded-lg shadow-md">
                  <p className="text-lg text-green-500">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
