export function CourseDetail() {
    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-4">Course Details</h1>
            <p className="mb-4">This course provides an in-depth understanding of the subject matter, covering all essential topics and practical applications.</p>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Course Content</h2>
                <ul className="list-disc list-inside text-gray-600">
                    <li>Introduction to the subject</li>
                    <li>Advanced concepts and techniques</li>
                    <li>Practical applications and case studies</li>
                    <li>Final project and assessment</li>
                </ul>
            </div>
            <div className="mt-8 bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Instructor Information</h2>
                <p className="text-gray-600">Instructor Name: John Doe</p>
                <p className="text-gray-600">Email: john.doe@university.edu</p>
            </div>
        </div>
    )
}