import React from "react";

interface Props {
  filters: {
    status: string;
    priority: string;
    title: string;
  };
  onFilter: (filters: {
    status: string;
    priority: string;
    title: string;
  }) => void;
}

const Status = ["Open", "InProgress", "Resolved"];
const priority = ["Low", "Medium", "High"];

export const FilterTicket: React.FC<Props> = ({ filters, onFilter }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onFilter({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <input
        type="text"
        name="title"
        value={filters.title}
        onChange={handleChange}
        placeholder="Search title..."
        className="border rounded-md px-4 py-2 text-sm w-full sm:w-auto bg-white hover:bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
      />
     

      <select
        name="priority"
        value={filters.priority}
        onChange={handleChange}
        className="border rounded-md px-4 py-2 text-sm w-full sm:w-auto bg-white hover:bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All Priority</option>
        {priority.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="border rounded-md px-4 py-2 text-sm w-full sm:w-auto bg-white hover:bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All Status</option>
        {Status.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
};
