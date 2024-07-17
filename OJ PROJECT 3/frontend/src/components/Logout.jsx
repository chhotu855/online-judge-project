import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    // Handle logout logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center">Logout</h1>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
