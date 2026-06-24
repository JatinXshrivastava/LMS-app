export function Home() {
    return (
        <div className="bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center py-8">Welcome to the Student Home Page</h1>
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">My Courses</h2>
                        <p className="text-gray-600">View and manage your enrolled courses.</p>

                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Profile</h2>
                        <p className="text-gray-600">Update your personal information and settings.</p>
                    </div>
                </div>
                <div className="mt-8 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Announcements</h2>  
                    <p className="text-gray-600">Stay updated with the latest news and announcements.</p>

                </div>
            </div>
        </div>
    );
}   