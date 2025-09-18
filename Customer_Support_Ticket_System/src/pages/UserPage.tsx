import React, { useEffect, useState } from "react";
import { GetAllUsers } from "../api/users";
import { useNavigate } from "react-router-dom";
interface User {
  id: string;
  firstNamem: string;
  lastName: string;
  email: string;
}

// goal is to redirect the user based on their id -> to different page ->

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    loadUsers();
  }, []);
  const loadUsers = async () => {
    setLoading(true);
    const data = await GetAllUsers();
    if (data) {
      setUsers(data);
    } else {
      alert("No data found");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {loading ? (
        <div>
          <h2>loading .....</h2>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {user.firstNamem} {user.lastName}
                </h2>
                <p className="text-sm text-gray-600 mb-4">{user.email}</p>
                <button
                  onClick={() => navigate(`/dashboard/userticket/${user.id}`)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full"
                >
                  Show Tickets
                </button>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No users found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserPage;
