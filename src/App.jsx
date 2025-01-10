import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import AddEmployee from './pages/AddEmployee';
import Login from './pages/LogIn';
import Register from './pages/Register';
import { useState } from 'react';
import AuthProvider from './AuthProvider';

function App() {
  const [token, settoken] = useState(localStorage.getItem('token'));
  return (
    <Router>
        <AuthProvider>
      <div className="flex h-screen bg-gray-100">
       { token?<Sidebar />:''}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<EmployeeList />} />
              <Route path="/add-employee" element={<AddEmployee />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
            </Routes>
          </main>
        </div>
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;