import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export function MyCourses() {
    const { allCourses, currency } = useContext(AppContext);

    return (
        <div className="flex flex-col gap-6 text-left">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">My Courses</h1>

            <div className="border border-gray-200/80 bg-white rounded-xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    All Courses
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Enrolled
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Published
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-150">
                            {allCourses.map((course) => (
                                <tr key={course._id} className="hover:bg-gray-50/30 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img 
                                                src={course.courseThumbnail} 
                                                alt={course.courseTitle} 
                                                className="w-16 h-10 object-cover rounded-md border border-gray-100" 
                                            />
                                            <span className="ml-4 text-sm font-semibold text-gray-800 max-w-xs truncate">
                                                {course.courseTitle}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-semibold">
                                        {currency}{course.coursePrice.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {course.enrolledStudents.length} students
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            course.isPublished 
                                                ? "bg-green-50 text-green-700 border border-green-100" 
                                                : "bg-gray-100 text-gray-600 border border-gray-200"
                                        }`}>
                                            {course.isPublished ? "Published" : "Draft"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(course.createdAt).toLocaleDateString("en-US", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric"
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}