import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { Loading } from "../../components/student/Loading";
import { Footer } from "../../components/student/Footer";


export function Player() {
    const { "course-id": courseId } = useParams();
    const { 
        allCourses, 
        activeLecture, 
        setActiveLecture, 
        completedLectures, 
        toggleLectureCompletion 
    } = useContext(AppContext);

    const [courseData, setCourseData] = useState<any>(null);
    const [expandedChapters, setExpandedChapters] = useState<{ [key: string]: boolean }>({});

    // Fetch and set active course/lecture data
    useEffect(() => {
        if (courseId && allCourses.length > 0) {
            const course = allCourses.find((c) => c._id === courseId);
            if (course) {
                setCourseData(course);
                // Expand first chapter by default
                if (course.courseContent.length > 0) {
                    setExpandedChapters({
                        [course.courseContent[0].chapterId]: true
                    });
                    
                    // Set first lecture as active if none is selected
                    if (!activeLecture || !course.courseContent.some((ch: any) => ch.chapterContent.some((lec: any) => lec.lectureId === activeLecture.lectureId))) {
                        if (course.courseContent[0].chapterContent.length > 0) {
                            setActiveLecture(course.courseContent[0].chapterContent[0]);
                        }
                    }
                }
            }
        }
    }, [allCourses, courseId]);

    if (!courseData) {
        return <Loading />;
    }

    const toggleChapter = (chapterId: string) => {
        setExpandedChapters((prev) => ({
            ...prev,
            [chapterId]: !prev[chapterId]
        }));
    };

    const getYouTubeId = (url: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const isCompleted = (lectureId: string) => {
        if (!courseId) return false;
        return completedLectures[courseId]?.includes(lectureId) || false;
    };

    // Find next lecture in sequence
    const getNextLecture = () => {
        if (!courseData || !activeLecture) return null;
        let foundActive = false;
        for (let c = 0; c < courseData.courseContent.length; c++) {
            const chapter = courseData.courseContent[c];
            for (let l = 0; l < chapter.chapterContent.length; l++) {
                const lecture = chapter.chapterContent[l];
                if (foundActive) {
                    return lecture;
                }
                if (lecture.lectureId === activeLecture.lectureId) {
                    foundActive = true;
                }
            }
        }
        return null;
    };

    const nextLecture = getNextLecture();

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Main Content split layout */}
            <div className="flex-grow max-w-7xl w-full mx-auto px-6 md:px-16 lg:px-24 py-10 flex flex-col lg:flex-row gap-8 lg:gap-12">
                
                {/* Left Panel: Video & Metadata */}
                <div className="w-full lg:w-[68%] text-left">
                    {/* Video Player */}
                    {activeLecture ? (
                        <div className="bg-black rounded-xl overflow-hidden aspect-video shadow-md border border-gray-200">
                            {activeLecture.lectureUrl ? (
                                <iframe 
                                    src={`https://www.youtube.com/embed/${getYouTubeId(activeLecture.lectureUrl)}`} 
                                    title={activeLecture.lectureTitle} 
                                    className="w-full h-full border-none"
                                    allow="autoplay; encrypted-media" 
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    No Video Link Provided
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center text-gray-400 border border-gray-200">
                            Select a lecture from the sidebar to begin learning.
                        </div>
                    )}

                    {/* Metadata Header */}
                    {activeLecture && (
                        <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                                    {activeLecture.lectureTitle}
                                </h1>
                                <p className="text-sm text-gray-400 mt-1">
                                    Course: <span className="font-semibold text-gray-600">{courseData.courseTitle}</span>
                                </p>
                            </div>
                            
                            {/* Controls Button Row */}
                            <div className="flex items-center gap-3 shrink-0">
                                <button 
                                    onClick={() => toggleLectureCompletion(courseData._id, activeLecture.lectureId)}
                                    className={`px-5 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                                        isCompleted(activeLecture.lectureId)
                                            ? "bg-green-50 text-green-600 border border-green-200 hover:bg-green-100"
                                            : "bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                                    }`}
                                >
                                    {isCompleted(activeLecture.lectureId) ? "✔ Completed" : "Mark as Completed"}
                                </button>
                                {nextLecture && (
                                    <button 
                                        onClick={() => setActiveLecture(nextLecture)}
                                        className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-semibold text-xs md:text-sm px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
                                    >
                                        Next Lecture
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Panel: Accordion Sidebar */}
                <div className="w-full lg:w-[32%] text-left border border-gray-200 rounded-xl overflow-hidden shadow-xs h-fit">
                    <div className="bg-gray-50 px-5 py-4 border-b border-gray-200">
                        <h2 className="font-bold text-gray-800 text-base md:text-lg">Course Content</h2>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {courseData.courseContent.map((chapter: any) => {
                            const isOpen = expandedChapters[chapter.chapterId];
                            return (
                                <div key={chapter.chapterId} className="flex flex-col">
                                    {/* Chapter Header */}
                                    <div 
                                        onClick={() => toggleChapter(chapter.chapterId)}
                                        className="flex justify-between items-center px-5 py-4 bg-gray-50/50 hover:bg-gray-100/30 cursor-pointer select-none transition-colors"
                                    >
                                        <span className="font-semibold text-sm md:text-base text-gray-700 pr-2 line-clamp-1">{chapter.chapterTitle}</span>
                                        <svg className={`w-4 h-4 text-gray-400 shrink-0 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>

                                    {/* Lectures Content */}
                                    {isOpen && (
                                        <div className="bg-white divide-y divide-gray-100 border-t border-gray-150">
                                            {chapter.chapterContent.map((lecture: any) => {
                                                const isActive = activeLecture?.lectureId === lecture.lectureId;
                                                const completed = isCompleted(lecture.lectureId);

                                                return (
                                                    <div 
                                                        key={lecture.lectureId} 
                                                        className={`flex items-center justify-between px-5 py-3 hover:bg-gray-50/40 transition-all ${
                                                            isActive 
                                                                ? "bg-blue-50/50 border-l-4 border-blue-600 pl-4 font-semibold" 
                                                                : ""
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-3 w-full mr-2">
                                                            {/* Custom Checkbox */}
                                                            <div 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleLectureCompletion(courseData._id, lecture.lectureId);
                                                                }}
                                                                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 cursor-pointer transition-all ${
                                                                    completed 
                                                                        ? "bg-green-500 border-green-500 text-white" 
                                                                        : "border-gray-300 hover:border-blue-500"
                                                                }`}
                                                            >
                                                                {completed && (
                                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                )}
                                                            </div>

                                                            {/* Title clickable to activate video */}
                                                            <span 
                                                                onClick={() => setActiveLecture(lecture)}
                                                                className={`text-xs md:text-sm text-left leading-normal cursor-pointer hover:text-blue-600 line-clamp-2 w-full ${
                                                                    isActive ? "text-blue-600" : "text-gray-600"
                                                                }`}
                                                            >
                                                                {lecture.lectureTitle}
                                                            </span>
                                                        </div>
                                                        
                                                        {/* Duration */}
                                                        <span className="text-xxs md:text-xs text-gray-400 shrink-0 font-medium font-mono">
                                                            {lecture.lectureDuration}m
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
