export default function ClientDashboard() {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Workout Programs</h1>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Active Programs</h2>
            {/* Add program list component here */}
            <p className="text-gray-600">No active programs found.</p>
          </div>
        </div>
      </div>
    );
  }