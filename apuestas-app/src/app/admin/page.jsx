export default function AdminDashboard() {
    return (
        <div className="p-6 bg-gray-800">
            <h2 className="text-3xl font-bold mb-6 text-white">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-white">
                    <h3 className="text-lg font-semibold">Statistics</h3>
                    <p className="mt-2">Some stats here...</p>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-white">
                    <h3 className="text-lg font-semibold">Recent Activity</h3>
                    <p className="mt-2">Recent activity details...</p>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-white">
                    <h3 className="text-lg font-semibold">User Management</h3>
                    <p className="mt-2">User management info...</p>
                </div>
            </div>
        </div>
    );
}
