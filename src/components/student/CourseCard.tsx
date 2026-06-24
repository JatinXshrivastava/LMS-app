import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

export function CourseCard({ course }: { course?: any }) {
    const { currency , calculateRatings } = useContext(AppContext);

    return (
        <Link className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg" to={`/course/${course?._id}`} onClick={() => scrollTo(0,0)}> 
            <img src={course?.courseThumbnail} alt="Course" className="w-full" />
            <div className="p-6">
                <h3 className="text-lg font-semibold">{course?.courseTitle}</h3>
                <p className="text-gray-700 font-bold">{course?.educator.name}</p>
                <div className="flex items-center space-x-2">
                    <p>{calculateRatings(course)}</p>
                    <div >
                        {[...Array(5)].map((_, index) => (
                            <span key={index} className={`${index >= Math.floor(calculateRatings(course)) ? 'text-gray-300' : 'text-yellow-400'}`}>
                                ★
                            </span>
                        ))}
                    </div>
                    <p className="text-gray-500">{course?.courseRatings.length}</p>
                </div>
                <p className="text-base font-semibold text-gray-800">{currency}{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}</p>
            </div>
        </Link>
    )
}
