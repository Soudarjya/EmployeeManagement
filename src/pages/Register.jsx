import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
  });
  const [error, setError] = useState("");

  // Mock user data - In a real app, this would come from a backend
  //   const users = [
  //     { email: 'admin@example.com', password: 'admin123', role: 'Admin' },
  //     { email: 'manager@example.com', password: 'manager123', role: 'Manager' },
  //     { email: 'user@example.com', password: 'user123', role: 'RegularUser' },
  //   ];
    const [selectedRole, setSelectedRole] = useState("");

    const handleroleChange = (event) => {
      setSelectedRole(event.target.value);
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    setIsLoading(true);
    setError(null);

    const RegisterData = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      department: formData.department,
     role: selectedRole,

    };
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(RegisterData),
      });

      const data = await response.json();
      console.log(data);
      
      if (response.ok) {
        // Handle successful Register (e.g., save token, redirect)
        localStorage.setItem('token',data.token);
        localStorage.setItem('role',data.role);
        localStorage.setItem('department',data.department);
        alert("Register Successful!");
        window.location.href="/";
      } else {
        // Handle errors (e.g., invalid credentials)
        // setError(data.message || "An error occurred .");
        alert(data.message || "An error occurred .");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register your account
          </h2>
          <div style={{ margin: "20px" }}>
      <label htmlFor="roleDropdown" style={{ marginRight: "10px" }}>
        Select Role:
      </label>
      <select
        id="roleDropdown"
        value={selectedRole}
        onChange={handleroleChange}
        style={{ padding: "5px", borderRadius: "5px" }}
      >
        <option value="" disabled>
          -- Choose a Role --
        </option>
        <option value="Admin">Admin</option>
        <option value="Manager">Manager</option>
        <option value="RegularUser">Regular User</option>
      </select>

      {selectedRole && (
        <p style={{ marginTop: "20px" }}>
          You selected: <strong>{selectedRole}</strong>
        </p>
      )}
    </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
          <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {selectedRole === "Manager" ? (
  <div>
    <label htmlFor="department" className="sr-only">
      Department
    </label>
    <select
      id="department"
      name="department"
      required
      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
      value={formData.department}
      onChange={handleChange}
    >
      <option value="" disabled>
        Select Department
      </option>
      <option value="Engineering">Engineering</option>
      <option value="Marketing">Marketing</option>
      <option value="Sales">Sales</option>
      <option value="Human Resource">Human Resource</option>
      <option value="Finance">Finance</option>
      <option value="Operations">Operations</option>
      <option value="Legal">Legal</option>
      <option value="Customer Service">Customer Service</option>
      <option value="IT Support">IT Support</option>
      <option value="Research and Development">
        Research and Development
      </option>
    </select>
  </div>
) : null}

          </div>

          <div>
           <NavLink to={'/login'} className='text-blue-600 underline'>Already have an account?</NavLink>
            <button
              type="submit"
              disabled={isloading}
              className="group relative w-full mt-3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isloading ? "Logging in..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
