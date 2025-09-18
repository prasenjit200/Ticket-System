// src/components/Sidebar/SideBar.tsx
import React, { useState } from "react";
import SidebarMenu from "./SideBarMenu";
import CustomerSupportIcon from "../../icons/CutomerSupport";

const SideBar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string>("dashboard");

  const toggleMenu = (menu: string) => {
    setActiveMenu(menu);
  };
  
  return (
    <div className="hidden md:flex flex-col items-center bg-[#0052cc] text-white w-[87px] h-screen py-4 shadow-xl ml-2 rounded-md ">
      {/* Top Icon */}
      <div className="p-2 bg-white rounded-xl flex  justify-center mb-6">
        <CustomerSupportIcon />
      </div>

      {/* Menu */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-4 w-full pb-[450px]">
        <SidebarMenu activeMenu={activeMenu} toggleMenu={toggleMenu} />
      </div>


    </div>
  );
};

export default SideBar;
