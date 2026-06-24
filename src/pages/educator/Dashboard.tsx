import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { assets, dummyDashboardData } from "../../assets/assets";

export function Dashboard() {
    const { currency } = useContext(AppContext);

    const stats = [
        {
            name: "Total Earnings",
            value: `${currency}${dummyDashboardData.totalEarnings.toFixed(2)}`,
            icon: assets.earning_icon,
            bg: "bg-blue-50/50"
        },
        {
            name: "Enrolled Students",
            value: dummyDashboardData.enrolledStudentsData.length,
            icon: assets.person_tick_icon,
            bg: "bg-green-50/50"
        },
        {
            name: "Total Courses",
            value: dummyDashboardData.totalCourses,
            icon: assets.my_course_icon,
            bg: "bg-purple-50/50"
        }
    ];

    return (
        <div className="flex flex-col gap-6 text-left">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Dashboard</h1>

            {/* Statistics Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="flex items-center justify-between p-5 bg-white border border-gray-200/80 rounded-xl shadow-xs">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium text-gray-500">{stat.name}</span>
                            <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
                        </div>
                        <div className={`p-3.5 rounded-lg ${stat.bg}`}>
                            <img src={stat.icon} alt={stat.name} className="w-6 h-6 object-contain" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Enrollments Table */}
            <div className="mt-4">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Enrollments</h2>
                
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
                                {dummyDashboardData.enrolledStudentsData.map((data, index) => (
                                    <tr key={index} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img 
                                                    src={data.student.imageUrl} 
                                                    alt={data.student.name} 
                                                    className="w-8 h-8 rounded-full object-cover border border-gray-100" 
                                                />
                                                <span className="ml-3 text-sm font-semibold text-gray-700">
                                                    {data.student.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                                            {data.courseTitle}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
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
        </div>
    );
}