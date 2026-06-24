import { useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { CourseCard } from "../../components/student/CourseCard";
import { Footer } from "../../components/student/Footer";
import { assets } from "../../assets/assets";

export function CourseList() {
    const { 
        allCourses, 
        searchQuery, 
        setSearchQuery, 
        filteredCourses, 
        setFilteredCourses 
    } = useContext(AppContext);
    const { input } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setSearchQuery(input || "");
    }, [input]);

    useEffect(() => {
        if (input) {
            const searchTerms = input.toLowerCase().trim().split(/\s+/);
            const filtered = allCourses.filter((course) => {
                const titleMatch = course.courseTitle && searchTerms.every(term => 
                    course.courseTitle.toLowerCase().includes(term)
                );
                const descMatch = course.courseDescription && searchTerms.every(term => 
                    course.courseDescription.toLowerCase().includes(term)
                );
                return titleMatch || descMatch;
            });
            setFilteredCourses(filtered);
        } else {
            setFilteredCourses(allCourses);
        }
    }, [allCourses, input]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/course-list/${searchQuery.trim()}`);
        } else {
            navigate("/course-list");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Main Content Area */}
            <div className="flex-grow px-8 md:px-16 lg:px-36 py-10 md:py-16 text-left">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-6 md:gap-0 mb-10 md:mb-12">
                    <div className="flex flex-col">
                        <h1 className="text-3xl md:text-4xl text-gray-800 font-semibold">Course List</h1>
                        <div className="text-xs md:text-sm text-gray-500 font-medium mt-1 md:mt-2">
                            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
                            <span> / Course List</span>
                        </div>
                    </div>

                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="flex items-center bg-white border border-gray-300 rounded-md shadow-sm w-full md:w-[360px] lg:w-[420px] overflow-hidden">
                        <div className="pl-3">
                            <img src={assets.search_icon} alt="search" className="w-4 h-4 opacity-50" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for courses"
                            className="w-full px-3 py-2.5 text-xs md:text-sm outline-none text-gray-700 placeholder-gray-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <img 
                                src={assets.cross_icon} 
                                alt="clear" 
                                className="w-3 h-3 mr-3 cursor-pointer opacity-50 hover:opacity-100 transition-opacity" 
                                onClick={() => {
                                    setSearchQuery("");
                                    navigate("/course-list");
                                }}
                            />
                        )}
                        <button 
                            type="submit" 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs md:text-sm px-6 md:px-8 py-2.5 md:py-3 transition-colors duration-200 shrink-0 cursor-pointer"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Course Grid */}
                {filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredCourses.map((course, index) => (
                            <CourseCard key={course._id || index} course={course} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-base md:text-lg">No courses found matching "{searchQuery}".</p>
                        <button 
                            onClick={() => {
                                setSearchQuery("");
                                navigate("/course-list");
                            }}
                            className="mt-4 text-blue-600 hover:underline font-medium text-sm"
                        >
                            Clear search and view all courses
                        </button>
                    </div>
                )}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}