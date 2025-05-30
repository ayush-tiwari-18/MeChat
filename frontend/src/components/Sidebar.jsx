import React, { useEffect } from "react";
import { useMessageStore } from "../store/useMessageStore";

const Sidebar = () => {
  const { getUsersForSidebar, users, setSelectedUser } = useMessageStore();

  useEffect(() => {
    getUsersForSidebar();
  }, [getUsersForSidebar]);

  const userComponent = [];
  for (let key in users) {
    let user = users[key];
    userComponent.push(
      <div key={key} className="flex border-2 border-solid p-2 m-2 cursor-pointer" onClick={()=>{
        setSelectedUser(user);
      }}>
        {user.fullName}
      </div>
    );
  }

  return (
    <div className="w-1/4 h-full border-r border-solid overflow-y-auto">
      {userComponent}
    </div>
  );
};

export default Sidebar;
