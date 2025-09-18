// src/pages/Dashboard.tsx
import React, { useState } from "react";
import TicketTable from "../components/ticketTable/TicketTable";
import AddTicketButton from "../components/ticketTable/AddTicket";
import { FilterTicket } from "../components/ticketTable/FilterLogic";

const DashboardPage: React.FC = () => {
  const [refresh, setRefresh] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    title: "",
  });

  const handleTicketAdded = () => {
    setRefresh(true);
    setTimeout(() => setRefresh(false), 100);
  };

  const handleFilter = (filters: {
    status: string;
    priority: string;
    title: string;
  }) => {
    setFilters(filters);
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-4 pl-4">
        <FilterTicket filters={filters} onFilter={handleFilter} />
        <AddTicketButton onTicketAdded={handleTicketAdded} />
      </div>

      <TicketTable filters={filters} refresh={refresh} />
    </div>
  );
};

export default DashboardPage;
