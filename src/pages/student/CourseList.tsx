export function CourseList() {
    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-xl font-bold">Course Title 1</h3>
                    <p className="mt-2 text-gray-600">Course description goes here. It provides an overview of what the course covers.</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-xl font-bold">Course Title 2</h3>
                    <p className="mt-2 text-gray-600">Course description goes here. It provides an overview of what the course covers.</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-xl font-bold">Course Title 3</h3>
                    <p className="mt-2 text-gray-600">Course description goes here. It provides an overview of what the course covers.</p>
                </div>
            </div>  
        </div>
    )
}