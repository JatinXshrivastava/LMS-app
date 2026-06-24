import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { Loading } from "../../components/student/Loading";
import { Footer } from "../../components/student/Footer";
import { assets } from "../../assets/assets";

export function CourseDetail() {
    const { id } = useParams();
    const {
        allCourses,
        calculateRatings,
        currency,
        courseData,
        setCourseData,
        expandedChapters,
        setExpandedChapters,
        totalLectures,
        setTotalLectures,
        totalDuration,
        setTotalDuration,
        showModal,
        setShowModal,
        previewVideoUrl,
        setPreviewVideoUrl
    } = useContext(AppContext);

    useEffect(() => {
        const findCourse = allCourses.find((c) => c._id === id);
        if (findCourse) {
            setCourseData(findCourse);
        }
    }, [allCourses, id]);

    useEffect(() => {
        if (courseData) {
            let lectures = 0;
            let duration = 0;
            courseData.courseContent.forEach((chapter: any) => {
                lectures += chapter.chapterContent.length;
                chapter.chapterContent.forEach((lecture: any) => {
                    duration += lecture.lectureDuration;
                });
            });
            setTotalLectures(lectures);
            setTotalDuration(duration);

            // Expand the first chapter by default
            if (courseData.courseContent.length > 0) {
                setExpandedChapters({
                    [courseData.courseContent[0].chapterId]: true
                });
            }

            // Find first preview video
            for (const chapter of courseData.courseContent) {
                for (const lecture of chapter.chapterContent) {
                    if (lecture.isPreviewFree && lecture.lectureUrl) {
                        setPreviewVideoUrl(lecture.lectureUrl);
                        break;
                    }
                }
                if (previewVideoUrl) break;
            }
        }
    }, [courseData]);

    if (!courseData) {
        return <Loading />;
    }

    const toggleChapter = (chapterId: string) => {
        setExpandedChapters({
            ...expandedChapters,
            [chapterId]: !expandedChapters[chapterId]
        });
    };

    const getCourseSubtitle = (html: string) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.querySelector("p")?.textContent || "Master the skills needed to succeed in this comprehensive and practical course guidance.";
    };

    const formatCourseDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        if (hours > 0) {
            return `${hours}h ${remainingMinutes}m`;
        }
        return `${remainingMinutes}m`;
    };

    const getYouTubeId = (url: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const ratingVal = parseFloat(calculateRatings(courseData)) || 0;

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Main Content Area */}
            <div className="relative flex-grow">
                {/* Header background gradient (Teal/Cyan) */}
                <div className="absolute top-0 left-0 w-full h-[460px] md:h-[480px] bg-gradient-to-b from-[#F0FDF4]/30 to-white -z-10 border-b border-gray-100"></div>

                <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-12 flex flex-col lg:flex-row gap-10 md:gap-12 relative z-10">

                    {/* Left Column (Course Details) */}
                    <div className="w-full lg:w-[65%] text-left">
                        {/* Title & Subtitle */}
                        <h1 className="text-3xl md:text-4xl text-gray-800 font-bold leading-tight">
                            {courseData.courseTitle}
                        </h1>
                        <p className="mt-4 text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
                            {getCourseSubtitle(courseData.courseDescription)}
                        </p>

                        {/* Ratings & Enrollments */}
                        <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-gray-500">
                            <div className="flex items-center gap-1.5">
                                <span className="text-yellow-500 font-semibold">{ratingVal}</span>
                                <div className="flex items-center text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={i >= Math.floor(ratingVal) ? "text-gray-300" : "text-yellow-400"}>
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <span className="text-blue-600 hover:underline cursor-pointer">
                                    ({courseData.courseRatings.length} ratings)
                                </span>
                            </div>
                            <span className="hidden md:inline text-gray-300">|</span>
                            <span>{courseData.enrolledStudents.length} students</span>
                            <span className="hidden md:inline text-gray-300">|</span>
                            <span>Course by <span className="text-blue-600 hover:underline cursor-pointer font-medium">{courseData.educator?.name || "Richard James"}</span></span>
                        </div>

                        {/* Course Structure Accordion Section */}
                        <div className="mt-12">
                            <h2 className="text-xl md:text-2xl text-gray-800 font-semibold mb-2">Course Structure</h2>
                            <p className="text-xs md:text-sm text-gray-500 mb-6">
                                {courseData.courseContent.length} sections - {totalLectures} lectures - {formatCourseDuration(totalDuration)} total duration
                            </p>

                            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-xs">
                                {courseData.courseContent.map((chapter: any) => {
                                    const isOpen = expandedChapters[chapter.chapterId];
                                    let chapterDuration = 0;
                                    chapter.chapterContent.forEach((lec: any) => chapterDuration += lec.lectureDuration);

                                    return (
                                        <div key={chapter.chapterId} className="border-b border-gray-200 last:border-b-0">
                                            {/* Chapter Accordion Header */}
                                            <div
                                                onClick={() => toggleChapter(chapter.chapterId)}
                                                className="flex justify-between items-center px-4 py-4 bg-gray-50 hover:bg-gray-100/50 cursor-pointer select-none transition-colors duration-200"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <svg className={`w-4 h-4 text-gray-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                    <span className="font-semibold text-sm md:text-base text-gray-700">{chapter.chapterTitle}</span>
                                                </div>
                                                <span className="text-xs text-gray-500 font-medium shrink-0">
                                                    {chapter.chapterContent.length} lectures - {formatCourseDuration(chapterDuration)}
                                                </span>
                                            </div>

                                            {/* Chapter Accordion Content (Lectures List) */}
                                            {isOpen && (
                                                <div className="bg-white">
                                                    {chapter.chapterContent.map((lecture: any) => (
                                                        <div key={lecture.lectureId} className="flex justify-between items-center px-6 py-3.5 border-b border-gray-100 last:border-b-0 text-xs md:text-sm text-gray-700 hover:bg-gray-50/30 transition-colors duration-200">
                                                            <div className="flex items-center gap-3">
                                                                <img src={assets.play_icon} alt="Play" className="w-4 h-4 text-blue-500 shrink-0" />
                                                                <span className="text-gray-600 font-medium">{lecture.lectureTitle}</span>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                {lecture.isPreviewFree && (
                                                                    <button
                                                                        onClick={() => {
                                                                            if (lecture.lectureUrl) {
                                                                                setPreviewVideoUrl(lecture.lectureUrl);
                                                                                setShowModal(true);
                                                                            }
                                                                        }}
                                                                        className="text-blue-600 hover:text-blue-700 hover:underline font-semibold cursor-pointer"
                                                                    >
                                                                        Preview
                                                                    </button>
                                                                )}
                                                                <span className="text-gray-400 font-medium shrink-0">
                                                                    {lecture.lectureDuration} mins
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Course Description Section */}
                        <div className="mt-12">
                            <h2 className="text-xl md:text-2xl text-gray-800 font-semibold mb-4">Course Description</h2>
                            <div
                                className="text-gray-600 text-sm md:text-base leading-relaxed space-y-4"
                                dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
                            ></div>
                        </div>
                    </div>

                    {/* Right Column (Floating Sticky Sidebar Card) */}
                    <div className="w-full lg:w-[35%] lg:sticky lg:top-6 lg:self-start bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mt-6 lg:mt-0 transition-transform duration-300">
                        {/* Video Thumbnail Area */}
                        <div
                            className="relative aspect-video bg-gray-100 cursor-pointer group"
                            onClick={() => {
                                if (previewVideoUrl) setShowModal(true);
                            }}
                        >
                            <img
                                src={courseData.courseThumbnail}
                                alt={courseData.courseTitle}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                            />
                            {/* Play Overlay */}
                            <div className="absolute inset-0 bg-black/25 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/35">
                                <div className="bg-white/90 rounded-full p-4 shadow-md group-hover:scale-110 transition-transform duration-200">
                                    <svg className="w-6 h-6 text-blue-600 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Card Pricing & Details Info */}
                        <div className="p-6 text-left">
                            {/* Countdown / Offer flag */}
                            <div className="flex items-center gap-1.5 text-red-500 font-medium text-xs md:text-sm">
                                <span className="text-base">🔥</span>
                                <span>5 days left at this price!</span>
                            </div>

                            {/* Prices row */}
                            <div className="flex items-baseline mt-3">
                                <span className="text-2xl md:text-3xl font-bold text-gray-800">
                                    {currency}{(courseData.coursePrice - (courseData.discount * courseData.coursePrice / 100)).toFixed(2)}
                                </span>
                                <span className="text-gray-400 line-through text-xs md:text-sm font-normal ml-3">
                                    {currency}{courseData.coursePrice}
                                </span>
                                <span className="text-red-500 text-xs md:text-sm font-medium ml-3 bg-red-50 px-2 py-0.5 rounded">
                                    {courseData.discount}% off
                                </span>
                            </div>

                            {/* Features icons row */}
                            <div className="flex items-center justify-between text-xs md:text-sm text-gray-500/80 border-t border-b border-gray-100 py-3.5 mt-5">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-yellow-500">★</span>
                                    <span>{ratingVal}</span>
                                </div>
                                <span className="text-gray-200">|</span>
                                <div className="flex items-center gap-1.5">
                                    <span>⏱</span>
                                    <span>{formatCourseDuration(totalDuration)}</span>
                                </div>
                                <span className="text-gray-200">|</span>
                                <div className="flex items-center gap-1.5">
                                    <span>📖</span>
                                    <span>{totalLectures} lessons</span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm md:text-base py-3.5 rounded-lg mt-6 shadow-sm shadow-blue-500/20 active:scale-98 transition-all cursor-pointer">
                                Enroll Now
                            </button>

                            {/* What's in the course */}
                            <div className="mt-6">
                                <h3 className="text-gray-800 font-semibold text-sm md:text-base mb-3">What's in the course?</h3>
                                <ul className="text-xs md:text-sm text-gray-500 space-y-2.5">
                                    <li className="flex items-start gap-2.5">
                                        <span className="text-gray-400 mt-0.5">•</span>
                                        <span>Lifetime access with free updates.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <span className="text-gray-400 mt-0.5">•</span>
                                        <span>Step-by-step, hands-on project guidance.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <span className="text-gray-400 mt-0.5">•</span>
                                        <span>Downloadable resources and source code.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <span className="text-gray-400 mt-0.5">•</span>
                                        <span>Quizzes to test your knowledge.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <span className="text-gray-400 mt-0.5">•</span>
                                        <span>Certificate of completion.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            {showModal && previewVideoUrl && (
                <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
                    <div className="relative bg-black rounded-lg overflow-hidden max-w-4xl w-full aspect-video shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <iframe
                            src={`https://www.youtube.com/embed/${getYouTubeId(previewVideoUrl)}?autoplay=1`}
                            title="Course Preview"
                            className="w-full h-full border-none"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                        <button className="absolute top-4 right-4 text-white hover:text-gray-200 text-3xl font-bold bg-black/40 hover:bg-black/60 rounded-full w-10 h-10 flex items-center justify-center transition-colors cursor-pointer" onClick={() => setShowModal(false)}>
                            ×
                        </button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <Footer />
        </div>
    );
}