import React from "react";
import { MessageCircle } from "lucide-react";

const Userchat = () => {
  return (
    <div className="w-3/4 h-full border border-solid p-4 flex flex-col items-center justify-center">
      <div className="animate-bounce">
        <MessageCircle className="w-16 h-16 text-blue-500" />
      </div>
      <h1 className="text-4xl font-bold mt-6">MeChat</h1>
      <p className="text-lg mt-4">Start a conversation now</p>
    </div>
  );
};

export default Userchat;
