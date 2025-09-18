import React from "react";
import { useNavigate } from "react-router-dom";
import { DashboardOutlined, UserOutlined, CloseOutlined } from "@ant-design/icons";

type RightSidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const menuItems = [
  {
    key: "dashboard",
    icon: <DashboardOutlined style={{ fontSize: "24px" }} />,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    key: "users",
    icon: <UserOutlined style={{ fontSize: "24px" }} />,
    label: "Users",
    path: "/dashboard/user",
  },
];

const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    toggleSidebar();
  };

  return (
    <div
      className={`rounded-xl p-2 fixed top-0 right-0 h-full w-56 bg-[#0052cc] text-white transform transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col justify-start">
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={toggleSidebar}
            className="hover:bg-[#1761c0] p-2 rounded-full transition"
          >
            <CloseOutlined style={{ fontSize: "20px", color: "#dee8f4" }} />
          </button>
        </div>
        {/* Menu Items */}
        <div className="flex flex-col items-center mt-8 space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavigation(item.path)}
              className="w-44 h-14 rounded-xl flex flex-col items-center justify-center transition-all duration-200 font-semibold bg-transparent text-[#c1daf7] hover:bg-[#1761c0] hover:text-[#dee8f4] active:bg-[#0040a0] active:text-[#dee8f4] active:scale-105"
            >
              {item.icon}
              <span className="text-sm mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
