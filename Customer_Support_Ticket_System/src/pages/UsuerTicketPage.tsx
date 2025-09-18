import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type Ticket } from "./TicketDetailsPage";
import { GetTicketByuserId } from "../api/tickets";
import { Alert, Spin, Tag } from "antd";

const UserTicket: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);

  const params = useParams();
  const userId: any = params.id;

  useEffect(() => {
    if (userId) {
      fetchByUserId(userId);
    }
  }, [userId]);
const fetchByUserId = async (id: string) => {
  try {
    setLoading(true);

    const response = await GetTicketByuserId(id);
    const data = response?.data ?? response;
    setTickets(Array.isArray(data) ? data : []);
    
  } catch (error) {
    console.error("Error fetching tickets:", error);
    setErr("Failed to fetch tickets. Please try again later.");
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large">
          <div className="mt-2 text-gray-500">Loading...</div>
        </Spin>
      </div>
    );
  }

  if (err) {
    return (
      <div className="p-4">
        <Alert message={err} type="error" showIcon />
      </div>
    );
  }

  if (!tickets || tickets.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No tickets found for this user.
      </div>
    );
  }

  const getStatusTag = (status: string) => {
    switch (status) {
      case "Open":
        return <Tag color="red">{status}</Tag>;
      case "InProgress":
        return <Tag color="blue">{status}</Tag>;
      case "Resolved":
        return <Tag color="green">{status}</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const getPriorityTag = (priority: string) => {
    switch (priority) {
      case "High":
        return <Tag color="volcano">{priority}</Tag>;
      case "Medium":
        return <Tag color="gold">{priority}</Tag>;
      case "Low":
        return <Tag color="green">{priority}</Tag>;
      default:
        return <Tag>{priority}</Tag>;
    }
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">User Tickets</h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="p-4 rounded-xl shadow-md border bg-white hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {ticket.title}
            </h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-3">
              {ticket.description}
            </p>
            <div className="flex items-center justify-between mt-3">
              <div className="space-x-2">
                {getPriorityTag(ticket.priority)}
                {getStatusTag(ticket.status)}
              </div>
              <span className="text-gray-400 text-xs">
                {new Date(ticket.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTicket;
