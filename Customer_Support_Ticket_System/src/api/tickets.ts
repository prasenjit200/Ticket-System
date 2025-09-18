
import axios from "axios";
import type { Ticket } from "../components/ticketTable/TicketRow";

export const getAllTickets = async (): Promise<Ticket[]> => {
  const token = localStorage.getItem("authToken");

  const res = await axios.get("https://localhost:7238/api/ticket/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data ;
};

export interface TicketFormType {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Resolved";
}

export const addTicket = async (values: TicketFormType) => {
  const token = localStorage.getItem("authToken");
  const res = await axios.post("https://localhost:7238/api/ticket", values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  alert("Ticket Added Successfully!");
  return res.data.ticket;
};

export const DeleteTicket = async (id: string) => {
  try {
    const token = localStorage.getItem("authToken");
    await axios.delete(`https://localhost:7238/api/ticket/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err: any) {
   alert("something went wrong !") ; 
  }
};

export const FindById = async (id: string) => {
  const token = localStorage.getItem("authToken");

  const response = await axios.get(`https://localhost:7238/api/ticket/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


export type StatusType = "Open" | "InProgress" | "Resolved";

export const UpdateStatus = async (TicketId: string , status:StatusType) => {
  const token = localStorage.getItem("authToken");

  const response = await axios.patch(
    `https://localhost:7238/api/ticket/${TicketId}/status`,
    {status}, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data ; 
};

export const GetTicketByuserId = async (userId: string) => {
  const token = localStorage.getItem("authToken");

  const response = await axios.get(
    `https://localhost:7238/api/Ticket/userticket/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data; // could be [] or {data: []}
};
