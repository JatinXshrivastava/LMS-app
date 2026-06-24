import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { Footer } from "../../components/student/Footer";
import { Line } from "rc-progress";

export function MyEnrollments() {
    const { enrolledCourses, completedLectures, getCourseProgress } = useContext(AppContext);
    const navigate = useNavigate();

    const getCourseDuration = (course: any) => {
        let total = 0;
        course.courseContent.forEach((chapter: any) => {
            chapter.chapterContent.forEach((lecture: any) => {
                total += lecture.lectureDuration;
            });
        });
        const hours = Math.floor(total / 60);
        const mins = total % 60;
        if (hours > 0) {
            return `${hours}h ${mins > 0 ? mins + 'm' : ''}`;
        }
        return `${mins}m`;
    };

    const getLecturesCount = (course: any) => {
        let total = 0;
        course.courseContent.forEach((chapter: any) => {
            total += chapter.chapterContent.length;
        });
        return total;
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Main Content */}
            <div className="flex-grow px-8 md:px-16 lg:px-36 py-12 text-left">
                <h1 className="text-2xl md:text-3xl text-gray-800 font-semibold mb-6">My Enrollments</h1>

                {enrolledCourses.length > 0 ? (
                    <>
                        {/* Table Layout (Medium Screens and above) */}
                        <div className="hidden md:block border border-gray-200/80 rounded-lg overflow-hidden shadow-xs">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Course
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Duration
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Completed / Total
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Progress
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-150">
                                    {enrolledCourses.map((course) => {
                                        const progress = getCourseProgress(course);
                                        const completed = completedLectures[course._id]?.length || 0;
                                        const total = getLecturesCount(course);

                                        return (
                                            <tr key={course._id} className="hover:bg-gray-50/50 transition-colors duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <img 
                                                            src={course.courseThumbnail} 
                                                            alt={course.courseTitle} 
                                                            className="w-20 h-12 object-cover rounded-md" 
                                                        />
                                                        <div className="ml-4">
                                                            <div className="text-sm font-semibold text-gray-800 hover:text-blue-600 cursor-pointer max-w-xs truncate" onClick={() => navigate(`/course/${course._id}`)}>
                                                                {course.courseTitle}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {getCourseDuration(course)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {completed} / {total}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex flex-col gap-1.5 justify-start">
                                                        <span className="text-xs font-medium text-gray-500">{progress}%</span>
                                                        <Line 
                                                            percent={progress} 
                                                            strokeWidth={3} 
                                                            strokeColor="#2563EB" 
                                                            trailColor="#E2E8F0" 
                                                            className="w-24 md:w-32 rounded-full h-1.5" 
                                                        />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                    <button 
                                                        onClick={() => navigate(`/player/${course._id}`)}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-5 py-2.5 rounded-md transition-colors duration-200 cursor-pointer shadow-xs"
                                                    >
                                                        {progress === 100 ? "Completed" : progress > 0 ? "Continue" : "Start Course"}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Responsive List Layout (Mobile Screens) */}
                        <div className="block md:hidden space-y-4">
                            {enrolledCourses.map((course) => {
                                const progress = getCourseProgress(course);
                                const completed = completedLectures[course._id]?.length || 0;
                                const total = getLecturesCount(course);

                                return (
                                    <div key={course._id} className="border border-gray-200 rounded-lg p-4 bg-white flex flex-col gap-3 shadow-xs">
                                        <div className="flex gap-3">
                                            <img 
                                                src={course.courseThumbnail} 
                                                alt={course.courseTitle} 
                                                className="w-24 h-16 object-cover rounded-md shrink-0" 
                                            />
                                            <div className="flex flex-col justify-between">
                                                <h3 
                                                    onClick={() => navigate(`/course/${course._id}`)}
                                                    className="text-sm font-semibold text-gray-800 hover:text-blue-600 leading-snug line-clamp-2 cursor-pointer"
                                                >
                                                    {course.courseTitle}
                                                </h3>
                                                <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                                                    <span>⏱ {getCourseDuration(course)}</span>
                                                    <span>📖 {total} lessons</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between border-t border-gray-150 pt-3 mt-1">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs text-gray-500 font-medium">
                                                    Progress: {completed}/{total} ({progress}%)
                                                </span>
                                                <Line 
                                                    percent={progress} 
                                                    strokeWidth={4} 
                                                    strokeColor="#2563EB" 
                                                    trailColor="#E2E8F0" 
                                                    className="w-32 rounded-full h-1.5" 
                                                />
                                            </div>
                                            <button 
                                                onClick={() => navigate(`/player/${course._id}`)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded transition-colors duration-200 cursor-pointer"
                                            >
                                                {progress === 100 ? "Completed" : progress > 0 ? "Continue" : "Start"}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-base md:text-lg">You are not enrolled in any courses yet.</p>
                        <button 
                            onClick={() => navigate("/course-list")}
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-md transition-colors"
                        >
                            Browse Courses
                        </button>
                    </div>
                )}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}