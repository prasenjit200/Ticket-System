// src/components/Header.tsx
import React, { useState } from "react";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import RightSidebar from "../SideBar/RightSideBar";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <header className="w-full flex items-center justify-between bg-[#f0f3f8] shadow px-6 py-3 z-20 relative">
      {/* Left Brand/Logo */}
      <div className="flex items-center space-x-3">
        <span className="font-bold text-[1.5rem] text-[#3b3d4a] select-none">
          Customer Support Ticket System
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <div
          className="hidden md:flex items-center space-x-2 pr-9 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <span className="bg-[#dee8f4] p-2 rounded-full">
            <UserOutlined style={{ fontSize: "25px", color: "#0052cc" }} />
          </span>
        </div>

        <button
          onClick={toggleSidebar}
          className="md:hidden  flex items-center justify-center p-2 text-gray-700 rounded-md hover:bg-[#f2f6fa]"
        >
          <MenuOutlined style={{ fontSize: "24px" }} />
        </button>
      </div>

      <div className="md:hidden">
        <RightSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* User modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg p-6 w-80">
            <h2 className="text-lg font-bold text-gray-700 mb-4">User Options</h2>
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
