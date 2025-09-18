import React from "react";

const CustomerSupportIcon: React.FC = () => {
  return (
    <div id="img" className="w-8 h-8 flex items-center justify-center">
      <img
        src="/support-ticket.png" 
        alt="Customer Support Icon"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default CustomerSupportIcon;
