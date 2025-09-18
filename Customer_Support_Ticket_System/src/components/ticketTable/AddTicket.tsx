// src/components/AddTicketButton.tsx
import React, { useState } from "react";
import { Button } from "antd";
import { addTicket } from "../../api/tickets";
import type { TicketFormType } from "../../api/tickets";
import { PlusOutlined } from "@ant-design/icons";

interface Props {
  onTicketAdded: () => void;
}

const AddTicketButton: React.FC<Props> = ({ onTicketAdded }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<TicketFormType>({
    title: "",
    description: "",
    priority: "Low",
    status: "Open",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const priorities = ["Low", "Medium", "High"];
  const statuses = ["Open", "InProgress", "Resolved"];

  const validate = () => {
    const err: { [key: string]: string } = {};
    if (!formValues.title.trim()) err.title = "Please enter title!";
    if (!formValues.description.trim()) err.description = "Please enter description!";
    return err;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        await addTicket(formValues);
        setFormValues({
          title: "",
          description: "",
          priority: "Low",
          status: "Open",
        });
        setIsModalVisible(false);
        onTicketAdded();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  
  return (
    <>
      <div className="flex justify-end  pr-6 ">
        <Button  type="primary" onClick={() => setIsModalVisible(true)} size="large" icon={<PlusOutlined />}>
          Add Ticket
        </Button>
      </div>

      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative shadow-lg">
            <button
              onClick={() => setIsModalVisible(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-5">Add Ticket</h2>
            <form onSubmit={handleSubmit} noValidate>
              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  * Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formValues.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                    errors.title ? "border-red-400 ring-red-500" : "border-gray-300 ring-blue-500"
                  }`}
                  autoFocus
                />
                {errors.title && (
                  <p className="text-red-600 text-xs mt-1">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  * Description
                </label>
                <textarea
                  name="description"
                  value={formValues.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  rows={3}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                    errors.description
                      ? "border-red-400 ring-red-500"
                      : "border-gray-300 ring-blue-500"
                  }`}
                />
                {errors.description && (
                  <p className="text-red-600 text-xs mt-1">{errors.description}</p>
                )}
              </div>

              {/* Priority */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  * Priority
                </label>
                <select
                  name="priority"
                  value={formValues.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  * Status
                </label>
                <select
                  name="status"
                  value={formValues.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTicketButton;
