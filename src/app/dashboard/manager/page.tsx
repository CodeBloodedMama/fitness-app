export default function ManagerDashboard() {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Manager Dashboard</h1>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Personal Trainers</h2>
            {/* Add trainer list component here */}
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600">
              Add New Trainer
            </button>
          </div>
        </div>
      </div>
    );
  }