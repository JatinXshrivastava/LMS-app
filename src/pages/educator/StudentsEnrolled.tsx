import { dummyStudentEnrolled } from "../../assets/assets";

export function StudentsEnrolled() {
    return (
        <div className="flex flex-col gap-6 text-left">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Students Enrolled</h1>

            <div className="border border-gray-200/80 bg-white rounded-xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    # ID
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Student Name
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Course Title
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-150">
                            {dummyStudentEnrolled.map((enrollment, index) => (
                                <tr key={index} className="hover:bg-gray-50/30 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img 
                                                src={enrollment.student.imageUrl} 
                                                alt={enrollment.student.name} 
                                                className="w-8 h-8 rounded-full object-cover border border-gray-100" 
                                            />
                                            <span className="ml-3 text-sm font-semibold text-gray-700">
                                                {enrollment.student.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                                        {enrollment.courseTitle}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(enrollment.purchaseDate).toLocaleDateString("en-US", {
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
