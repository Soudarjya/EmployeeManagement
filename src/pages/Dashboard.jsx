import { useEffect, useState } from 'react';
import { FiUsers, FiUserPlus, FiUserCheck, FiUserMinus } from 'react-icons/fi';

function Dashboard() {
  const [data, setData] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    newThisMonth: 0,
  });

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (response.ok) {
        setData({
          totalEmployees: result.totalEmployees,
          activeEmployees: result.activeEmployees,
          newThisMonth: result.newThisMonth,

        });
      } else {
        console.error('Failed to fetch dashboard data:', result.message);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500">
              <FiUsers className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Employees</p>
              <p className="text-2xl font-semibold">{data.totalEmployees}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500">
              <FiUserCheck className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Active Employees</p>
              <p className="text-2xl font-semibold">{data.activeEmployees}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-500">
              <FiUserPlus className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">New This Month</p>
              <p className="text-2xl font-semibold">{data.newThisMonth}</p>
            </div>
          </div>
        </div>
        {/* <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-500">
              <FiUserMinus className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Left</p>
              <p className="text-2xl font-semibold">{data.left}</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Dashboard;
