import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Toll Management System</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
            {(user.role === 'admin' || user.role === 'supervisor') && (
              <li><Link to="/users" className="hover:underline">Users</Link>
            </li>
            )}
            <li><Link to="/reports" className="hover:underline">Reports</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;