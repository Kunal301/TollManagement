import React, { useState, useEffect } from 'react';

interface AuditLogEntry {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: string;
}

const AuditLog: React.FC = () => {
  const [logEntries, setLogEntries] = useState<AuditLogEntry[]>([]);

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchAuditLog = async () => {
      const mockLogEntries: AuditLogEntry[] = [
        { id: '1', userId: 'user1', action: 'Login', details: 'User logged in', timestamp: '2024-03-15T10:00:00' },
        { id: '2', userId: 'user2', action: 'Update Toll Rate', details: 'Updated toll rate for Plaza A', timestamp: '2024-03-15T11:30:00' },
        { id: '3', userId: 'user3', action: 'Add User', details: 'Added new operator user', timestamp: '2024-03-15T12:45:00' },
        { id: '4', userId: 'user1', action: 'Generate Report', details: 'Generated monthly revenue report', timestamp: '2024-03-15T14:15:00' },
        { id: '5', userId: 'user2', action: 'Logout', details: 'User logged out', timestamp: '2024-03-15T16:00:00' },
      ];
      setLogEntries(mockLogEntries);
    };

    fetchAuditLog();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Audit Log</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {logEntries.map((entry) => (
            <tr key={entry.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.userId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.action}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.details}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(entry.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLog;