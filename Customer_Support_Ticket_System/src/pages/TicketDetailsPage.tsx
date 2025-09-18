// src/pages/TicketDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FindById } from "../api/tickets";
import { GetAllComments, AddComment, DeleteComment } from "../api/Comments";
import { GetUserNameById } from "../api/users";
import { Button } from "antd"; // Import Ant Design Button

 export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
  userId?: string;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
}

const TicketDetailPage: React.FC = () => {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState<string>("");

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetchTicket(id);
      fetchComments(id);
    }
  }, [id]);

  const fetchTicket = async (ticketId: string) => {
    try {
      const ticketData = await FindById(ticketId);
      setTicket(ticketData);
      if (ticketData.userId) {
        fetchUser(ticketData.userId);
      }
    } catch (error) {
      console.error("Error fetching ticket:", error);
    }
  };

  const fetchComments = async (ticketId: string) => {
    try {
      const commentData = await GetAllComments(ticketId);
      setComments(commentData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchUser = async (userId: string) => {
    try {
      const data = await GetUserNameById(userId);
      if (data) {
        setUserName(data.name || "");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !id) return;
    try {
      await AddComment(id, newComment.trim());
      setNewComment("");
      await fetchComments(id);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await DeleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (!ticket) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading ticket...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col items-center">
      
      {/* User Info */}
      <div className="w-full max-w-3xl mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-1">{userName || "Loading..."}</h1>
      </div>

      {/* Ticket Details */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-md shadow-sm space-y-8">
        
        {/* Title */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-700 border-b border-gray-300 pb-2 mb-3">
            Ticket Title
          </h2>
          <p className="text-lg sm:text-xl text-gray-800 break-words">{ticket.title}</p>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-700 border-b border-gray-300 pb-2 mb-3">
            Description
          </h2>
          <p className="text-base sm:text-lg text-gray-700 whitespace-pre-wrap break-words">{ticket.description}</p>
        </div>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div>Status: <span className="font-medium text-gray-800">{ticket.status}</span></div>
          <div>Created: <span className="font-medium text-gray-800">{new Date(ticket.createdAt).toLocaleDateString()}</span></div>
          <div>Priority: <span className="font-medium text-gray-800">{ticket.priority}</span></div>
        </div>

        {/* Add Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Add a Comment</label>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              type="text"
              placeholder="Write your message..."
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-sm w-full sm:w-auto"
            >
              Send
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-700 border-b border-gray-300 pb-2 mb-4">
            Comments
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-sm">No comments yet.</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="flex justify-between items-start bg-gray-50 p-3 rounded-md">
                  <div className="flex-1 pr-4">
                    <p className="text-gray-700 text-sm whitespace-pre-wrap break-words">{comment.content}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(comment.createdAt).toLocaleString()}</p>
                  </div>
                  <Button
                    onClick={() => handleDeleteComment(comment.id)}
                    danger
                    size="small"
                  >
                    Delete
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TicketDetailPage;
