import { useState } from 'react';
import { FiBell, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [token, settoken] = useState(localStorage.getItem('token'));
  const navigate=useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const handleLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('department');
    settoken(null);
    window.location.href="/";
  }
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link className="text-xl font-semibold" to='/'>Employee Management System</Link>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <FiBell className="h-6 w-6 text-gray-800" />
            </button>
            <div className="ml-3 relative">

             { token?<button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded shadow" onClick={handleLogout}>Logout</button>
             :<Link
                to={'/register'}
                className="p-2 rounded-full "
              >
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded shadow">Signup</button>
              </Link>}
              {/* {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Your Profile
                    </a>
                    <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </a>
                    <a href="#signout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign out
                    </a>
                  </div>
                </div>
              )}  */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;