import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, FileText, Users, BarChart2, LogOut, Truck, Map, DollarSign } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul className="space-y-2">
          {user && (user.role === 'admin' || user.role === 'supervisor' || user.role === 'operator') && (
            <li>
              <Link to="/dashboard" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </li>
          )}
          
      
         

          {user && (user.role === 'admin' || user.role === 'supervisor') && (
            <li>
              <Link to="/reports" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
                <FileText className="h-5 w-5" />
                <span>Reports</span>
              </Link>
            </li>
          )}

          {user && (user.role === 'admin'|| user.role === 'operator' ) && (
            <li>
              <Link to="/booth-selection" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
                <Truck className="h-5 w-5" />
                <span>Booth Selection</span>
              </Link>
            </li>
          )}

          {user && (user.role === 'admin' || user.role === 'supervisor') && (
            <>
              <li>
                <Link to="/journey-master" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
                  <Map className="h-5 w-5" />
                  <span>Journey Master</span>
                </Link>
              </li>
              <li>
                <Link to="/vehicle-master" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
                  <Truck className="h-5 w-5" />
                  <span>Vehicle Master</span>
                </Link>
              </li>
              <li>
                <Link to="/tollfee-rules" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
                  <DollarSign className="h-5 w-5" />
                  <span>Toll Fee Rules</span>
                </Link>
              </li>
            </>
          )}

          <li>
            <button onClick={handleLogout} className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded w-full text-left">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;