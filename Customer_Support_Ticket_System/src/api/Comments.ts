// src/api/comments.ts
import axios from "axios";

export const GetAllComments=async(ticketId:string)=>{

  const token = localStorage.getItem("authToken") ; 
  const response = await axios.get(`https://localhost:7238/api/message/${ticketId}`,{
    headers:{
      Authorization:`Bearer ${token}`,
    },
  }) ;
  return response.data ; 
}

export const AddComment = async (ticketId: string, content: string) => {
  const token = localStorage.getItem("authToken");

  const commentPayload = {
    ticketId: ticketId,
    content: content,
  };

  const response = await axios.post(
    "https://localhost:7238/api/message",
    commentPayload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.comment;
};

export const DeleteComment = async (commentId: string) => {
  const token = localStorage.getItem("authToken");

  await axios.delete(`https://localhost:7238/api/message/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
