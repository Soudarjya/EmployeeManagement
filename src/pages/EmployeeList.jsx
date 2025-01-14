import { useEffect, useState } from 'react';
import { FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

function EmployeeList() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadingId, setUploadingId] = useState(null);

  const getEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          role: localStorage.getItem('role'),
        },
      });

      const data = await response.json();
      setEmployees(data);
      setFilteredEmployees(data); // Initialize filteredEmployees with all employees
    } catch (err) {
      console.log(err);
    }
  };

  const enableEditing = (employee) => {
    setEditingId(employee._id);
    setEditedEmployee(employee);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({
      ...editedEmployee,
      [name]: value,
    });
  };

  const handleProfilePictureUpload = async (id, file) => {
    const formData = new FormData();
    formData.append('profilePicture', file);
    formData.append('userId', id);

    try {
      setUploadingId(id); // Indicate which profile is being uploaded
      const response = await fetch('http://localhost:5000/api/user/upload-profile-picture', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          role: localStorage.getItem('role'),
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.Employee);
        
        setEmployees((prevEmployees) =>
          prevEmployees.map((emp) =>
            emp._id === id ? { ...emp, profilePicture: data.profilePicture } : emp
          )
        );
        setFilteredEmployees((prevEmployees) =>
          prevEmployees.map((emp) =>
            emp._id === id ? { ...emp, profilePicture: data.Employee.profilePicture } : emp
          )
        );
        alert('Profile picture updated successfully!');
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while uploading the profile picture.');
    } finally {
      setUploadingId(null); // Clear uploading status
    }
  };

  const handleSaveClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          role: localStorage.getItem('role'),
          mydepartment: localStorage.getItem('department'),
        },
        body: JSON.stringify(editedEmployee),
      });

      const data = await response.json();

      if (response.ok) {
        setEmployees((prevEmployees) =>
          prevEmployees.map((emp) =>
            emp._id === id ? data : emp
          )
        );
        setFilteredEmployees((prevEmployees) =>
          prevEmployees.map((emp) =>
            emp._id === id ? data : emp
          )
        );
      } else {
        alert(data.message);
      }
      setEditingId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleDeleteClick = async (id, department) => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          role: localStorage.getItem('role'),
          mydepartment: localStorage.getItem('department'),
          department: department,
        },
      });

      if (response.ok) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp._id !== id)
        );
        setFilteredEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp._id !== id)
        );
        alert('Employee deleted successfully!');
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (employee.status && employee.status.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (employee.department && employee.department.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredEmployees(filtered);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold mb-4 sm:mb-0">Employees</h2>
        <div className="w-full sm:w-auto flex space-x-4">
          <input
            type="text"
            name="name"
            placeholder="Search by name, department, or status"
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Picture</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={employee.profilePicture || '/default-avatar.png'}
                    alt="Profile"
                    className="h-10 w-10 rounded-full"
                  />
                  {editingId === employee._id && (
                    <input
                      type="file"
                      name="profilePicture"
                      onChange={(e) => handleProfilePictureUpload(employee._id, e.target.files[0])}
                      className="border border-gray-300 p-2 rounded mt-2"
                    />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === employee._id ? (
                    <input
                      type="text"
                      name="name"
                      value={editedEmployee.name}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 rounded"
                    />
                  ) : (
                    employee.name
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === employee._id ? (
                    <input
                      type="text"
                      name="position"
                      value={editedEmployee.position}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 rounded"
                    />
                  ) : (
                    employee.position
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === employee._id ? (
                    <input
                      type="text"
                      name="department"
                      value={editedEmployee.department}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 rounded"
                    />
                  ) : (
                    employee.department
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === employee._id ? (
                    <input
                      type="text"
                      name="status"
                      value={editedEmployee.status}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 rounded"
                    />
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {employee.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingId === employee._id ? (
                    <>
                      <button
                        onClick={() => handleSaveClick(employee._id)}
                        className="text-green-600 hover:text-green-900 mr-4"
                      >
                        <FiCheck className="h-5 w-5" />
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiX className="h-5 w-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => enableEditing(employee)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <FiEdit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(employee._id, employee.department)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
