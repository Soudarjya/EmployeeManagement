import { useState } from "react";

function AddEmployee() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    dateOfJoining: '',
  });
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          role: localStorage.getItem("role"),
          mydepartment: localStorage.getItem("department"),
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
       alert("Employee added successfully!");
        // Reset the form
        setFormData({
          name: "",
          email: "",
          position: "",
          department: "",
          dateOfJoining: "",
        });
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("An error occurred while adding the employee.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-6">Add New Employee</h2>
      <div className="bg-white rounded-lg shadow p-6">
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">Human Resource</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
                <option value='Legal'>Legal</option>
                <option value='Customer Service'>Customer Service</option>
                <option value='IT Support'>IT Support</option>
                <option value="Research and Development">Research and Development</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
