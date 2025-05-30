import React from "react";
import { MessageSquare, Settings, User, LogOut,} from "lucide-react";
import { Link} from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"; // Assuming useAuthStore is located in this path

const Navbar = () => {
  const { authUser, logOut} = useAuthStore(); // Retrieve authUser from the store

  return (
    <nav className="flex justify-between items-center p-4 shadow-md">
      {/* Left Section: MessageSquare Icon and "Chatty" Text */}
      <Link className="flex items-center gap-2" to={"/"}>
        <MessageSquare className="h-6 w-6" />
        <span className="text-xl font-semibold">MeChat</span>
      </Link>

      {/* Right Section: Always display Settings button */}
      <div className="flex items-center gap-4">
        <Link className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-secondary rounded-lg" to={"/settings"}>
          <Settings className="h-5 w-5" />
          Settings
        </Link>

        {/* Conditionally render Profile and Logout buttons based on authUser */}
        {authUser && (
          <>
            <Link className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-secondary rounded-lg" to={"/profile"}>
              <User className="h-5 w-5" />
              Profile
            </Link>
            <Link className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-secondary rounded-lg" onClick={logOut} to={"/login"}>
              <LogOut className="h-5 w-5" />
              Logout
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
