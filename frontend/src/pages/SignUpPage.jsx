import React, { useState } from "react";
import { Eye, EyeOff, MessageSquare } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signUp, isSigningUp } = useAuthStore();

  // Validate form before submission
  const validateForm = () => {
    if (!formData.fullName || !formData.fullName.trim()) {
      toast.error('Full Name is required');
      return false; // Form is invalid
    }

    if (!formData.email || !formData.email.trim()) {
      toast.error('Email is required');
      return false; // Form is invalid
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false; // Form is invalid
    }

    if (!formData.password || !formData.password.trim()) {
      toast.error('Password is required');
      return false; // Form is invalid
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false; // Form is invalid
    }
    return true; // Form is valid
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      signUp(formData);
    }
  };

  // Prevent form validation when clicking the eye icon
  const handleEyeClick = (e) => {
    e.preventDefault(); // Prevent form validation from triggering
    setShowPassword(!showPassword); // Toggle password visibility
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col justify-evenly w-3/8 h-3/5 border-2 overflow-auto">
        <div className="flex m-4 justify-center items-center">
          <MessageSquare className="size-6 text-primary" />
        </div>
        <div className="flex flex-col m-4 justify-center items-center">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-base-content/60">
            Get started with your free account now
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 m-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 m-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              placeholder="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 m-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button onClick={handleEyeClick}>
              {showPassword ? (
                <EyeOff className="size-5 text-base-content/40" />
              ) : (
                <Eye className="size-5 text-base-content/40" />
              )}
            </button>
          </label>
          <div className="flex justify-center items-center">
            <button className="btn btn-success" type="submit" disabled={isSigningUp}>
              {isSigningUp ? (<span className="loading loading-spinner loading-sm"></span>) : (<div>Sign Up</div>)}
            </button>
          </div>
        </form>
      </div>
      <div className="flex">
        <p className="m-4 mr-1">Already a user ? </p>
        <Link to={"/login"} className="m-4 ml-1 text-blue-500">login</Link>
      </div>
    </div>
  );
};

export default SignUpPage;