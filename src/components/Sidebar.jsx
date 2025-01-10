import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiUserPlus } from 'react-icons/fi';

function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out sm:relative ">
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
              isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`
          }
        >
          <FiHome className="h-5 w-5" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/employees"
          className={({ isActive }) =>
            `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
              isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`
          }
        >
          <FiUsers className="h-5 w-5" />
          <span>Employees</span>
        </NavLink>
        <NavLink
          to="/add-employee"
          className={({ isActive }) =>
            `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
              isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`
          }
        >
          <FiUserPlus className="h-5 w-5" />
          <span>Add Employee</span>
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;