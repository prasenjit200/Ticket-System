import React from "react";
import { UserOutlined } from "@ant-design/icons";

const SidebarProfile: React.FC = () => (
  <div className="mt-[400px] p-3 rounded-xl bg-[#1761c0] flex justify-center items-center cursor-pointer">
    <UserOutlined style={{ fontSize: "24px", color: "#dee8f4" }} />
  </div>
);

export default SidebarProfile;
