import { CourseCard } from "./CourseCard";

export function CourseSection() {
    return (
        <div className="bg-gray-50 p-8">    
            <h2 className="text-2xl font-bold">Available Courses</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CourseCard />
                <CourseCard />
                <CourseCard />
            </div>
        </div>
    )
}  