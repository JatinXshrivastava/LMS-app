import { Link } from "react-router-dom";
import { CourseCard } from "./CourseCard";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

export function CourseSection() {
    const { allCourses } = useContext(AppContext);

    return (
        <div className="flex md:px-40 flex-col items-center py-16 p-8 space-y-6">
            <h2 className="text-3xl font-medium text-gray-800">Learn from the best</h2>
            <p className="text-gray-500 text-sm md:text-base mt-3 text-center max-w-4xl">
                Discover a wide range of courses taught by industry experts and experienced educators. Whether you're looking to enhance your skills, explore new subjects, or advance your career, our courses are designed to provide you with the knowledge and practical experience you need to succeed.
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {allCourses.slice(0,4).map((course :any , index : number) =>  <CourseCard key={index} course={course}/>)}
            </div>
            <Link to="/course-list" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-gray-500 border border-gray-500/30 px-10 py-4 rounded ">
                Show all Courses
            </Link>
        </div>
    )
}

