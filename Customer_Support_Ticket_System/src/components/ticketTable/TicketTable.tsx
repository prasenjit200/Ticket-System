import React, { useEffect, useState } from "react";
import TicketRow from "./TicketRow";
import { getAllTickets } from "../../api/tickets";
import type { Ticket } from "./TicketRow";

const PAGE_SIZE = 8;

interface Props {
  filters: {
    status: string;
    priority: string;
    title: string;
  };
  refresh: boolean;
}

const TicketTable: React.FC<Props> = ({ filters, refresh }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllTickets().then(setTickets);
  }, [refresh]);

  const filteredTickets = tickets.filter((ticket) => {
    return (
      (filters.status === "" || ticket.status === filters.status) &&
      (filters.priority === "" || ticket.priority === filters.priority) &&
      (filters.title === "" || ticket.title.toLowerCase().includes(filters.title.toLowerCase()))
    );
  });

  const totalPages = Math.ceil(filteredTickets.length / PAGE_SIZE);
  const paginatedTickets = filteredTickets.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col h-[600px] p-4">
      <div className="flex flex-col border border-gray-200 rounded overflow-hidden h-full">
        
        {/* Table Area */}
        <div className="flex-1 overflow-x-auto overflow-y-auto bg-white">
          <table className="min-w-full table-auto border-collapse text-sm">
            <thead className="bg-blue-50 sticky top-0">
              <tr>
                <th className="p-3 text-left text-gray-700">SN</th>
                <th className="p-3 text-left text-gray-700">Ticket Id</th>
                <th className="p-3 text-left text-gray-700">Title</th>
                <th className="p-3 text-left text-gray-700">Priority</th>
                <th className="p-3 text-left text-gray-700">Status</th>
                <th className="p-3 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTickets.length > 0 ? (
                paginatedTickets.map((ticket, idx) => (
                  <TicketRow
                    key={ticket.id}
                    index={(page - 1) * PAGE_SIZE + idx + 1}
                    ticket={ticket}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-500">
                    No tickets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Area */}
        <div className="p-3 border-t border-gray-200 bg-white flex justify-center gap-2 flex-wrap">
          <button
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded text-sm ${
                page === idx + 1 ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm disabled:opacity-50"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketTable;
