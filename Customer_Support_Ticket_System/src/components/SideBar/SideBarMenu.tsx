import React from "react";
import { UserOutlined, DashboardOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type SidebarMenuProps = {
  activeMenu: string;
  toggleMenu: (menu: string) => void;
};

const menuItems = [
  {
    key: "dashboard",
    icon: <DashboardOutlined style={{ fontSize: "18px" }} />,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    key: "user",
    icon: <UserOutlined style={{ fontSize: "18px" }} />,
    label: "Users",
    path: "/dashboard/user",
  },
];

const SidebarMenu: React.FC<SidebarMenuProps> = ({ activeMenu, toggleMenu }) => {
  const navigate = useNavigate();

  const handleClick = (item: typeof menuItems[0]) => {
    toggleMenu(item.key);
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <>
      {menuItems.map((item) => {
        const isActive = activeMenu === item.key;
        return (
          <button
            key={item.key}
            onClick={() => handleClick(item)}
            className={`
              w-[73px] h-[73px] 
              rounded-xl 
              flex flex-col  items-center justify-center
              transition-all duration-200
              font-semibold
              ${isActive ? "bg-[#0040a0] text-[#dee8f4] scale-105" : "bg-transparent text-[#c1daf7] hover:bg-[#1761c0] hover:text-[#dee8f4]"}
            `}
            style={{ boxShadow: isActive ? "0 4px 14px rgba(0,64,160,0.12)" : undefined }}
          >
            {item.icon}
            <span className="text-xs mt-2">{item.label}</span>
          </button>
        );
      })}
    </>
  );
};

export default SidebarMenu;
