import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";  // Import Tooltip from antd
import React, { useState } from "react";
import { DeleteTicket, UpdateStatus } from "../../api/tickets";
import { useNavigate } from "react-router-dom";

export interface Ticket {
  id: string;
  userId: string;
  title: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "InProgress" | "Resolved";
}

interface Props {
  index: number;
  ticket: Ticket;
}

const priorityStyles = {
  Low: "bg-[#f6ffed] text-[#74c28a] border border-green-300",
  Medium: "bg-[#fff7e6] text-[#efa75b] border border-yellow-300",
  High: "bg-[#fff1f0] text-[#d5234b] border border-red-300",
};

const badgeClass =
  "inline-block text-sm font-normal px-3 py-1 rounded-lg border align-middle";
const TicketRow: React.FC<Props> = ({ index, ticket }) => {
  const allStatuses = ["Open", "InProgress", "Resolved"];
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState(ticket.status);

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ticket? This action cannot be undone.");
    if (confirmDelete) {
      try {
        DeleteTicket(id)
          .then(() => {
            alert("Ticket deleted successfully");
            window.location.reload();
          })
          .catch((err) => {
            alert("Failed to delete ticket: " + err.message);
          });
      } catch (err) {
        alert("Error deleting ticket");
      }
    }
  };
  const Details = (id: string) => {
    navigate(`ticket/${id}`);
  };

  const handleOnChangeStatus = async (id: string, status: string) => {
    try {
      const updatedTicket = await UpdateStatus(id, status as any);
      setCurrentStatus(updatedTicket?.status || status);
      alert("Status updated successfully");
    } catch {
      alert("Something went wrong while updating the status.");
    }
  };

  return (
    <tr className="bg-white hover:bg-gray-50 transition-shadow shadow-sm rounded-lg">
      <td className="pl-4 pr-2 py-3 text-gray-700 text-sm font-medium">{index}</td>
      <td
        className="px-4 py-3 align-middle whitespace-nowrap text-sm text-blue-700 hover:cursor-pointer"
        onClick={() => Details(ticket.id)}
      >
        {ticket.id}
      </td>
      <td className="px-4 py-3 align-middle text-md max-w-[160px]">
        <Tooltip title={ticket.title}>
          <div
            style={{
              maxWidth: 140,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "inline-block",
              verticalAlign: "bottom",
            }}
          >
            {ticket.title}
          </div>
        </Tooltip>
      </td>
      <td className="px-4 py-3 align-middle">
        <span
          className={`${badgeClass} ${priorityStyles[ticket.priority]}`}
          style={{ minWidth: "50px" }}
        >
          {ticket.priority}
        </span>
      </td>
      <td className="px-4 py-3 align-middle">
        <select
          className="border rounded-md px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 focus:ring-blue-500 focus:border-blue-500 min-w-[100px]"
          value={currentStatus}
          onChange={(e) => handleOnChangeStatus(ticket.id, e.target.value)}
        >
          {allStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </td>
      <td className="px-4 py-3 flex gap-4 items-center">
        <button
          className="p-2 bg-gray-50 rounded-md border border-blue-300 hover:bg-blue-100 transition flex items-center justify-center"
          title="View"
          onClick={() => Details(ticket.id)}
        >
          <EyeOutlined style={{ fontSize: "17px", color: "#0172ff" }} />
        </button>
        <button
          className="p-2 bg-red-50 rounded-md border border-red-300 hover:bg-red-100 transition flex items-center justify-center"
          title="Delete"
          onClick={() => handleDelete(ticket.id)}
        >
          <DeleteOutlined style={{ fontSize: "17px", color: "#d5234b" }} />
        </button>
      </td>
    </tr>
  );
};

export default TicketRow;
