import React from "react";
import Sidebar from "../components/sidebar";
import Userchat from "../components/userChat";
import { useMessageStore } from "../store/useMessageStore";
import SelectedChat from "../components/SelectedChat";

const HomePage = () => {
  const {selectedUser}= useMessageStore();
  return (
    <div className="flex h-screen">
      <Sidebar />
      {!selectedUser? <Userchat/> : <SelectedChat/>}
    </div>
  );
};

export default HomePage;
