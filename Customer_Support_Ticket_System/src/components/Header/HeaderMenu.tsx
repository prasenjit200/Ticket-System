// src/components/Header/HeaderMenu.tsx
import React from "react";
import { MenuOutlined } from "@ant-design/icons";

const HeaderMenu: React.FC = () => {
  return (
    <div className="hover:cursor-pointer text-gray-700">
      <MenuOutlined style={{ fontSize: "24px" }} />
    </div>
  );
};

export default HeaderMenu;