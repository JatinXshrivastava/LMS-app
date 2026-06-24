import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export function AddCourse() {
    const navigate = useNavigate();
    const { 
        courseTitle, 
        setCourseTitle, 
        courseDescription, 
        setCourseDescription, 
        coursePrice, 
        setCoursePrice, 
        courseDiscount, 
        setCourseDiscount, 
        courseChapters, 
        setCourseChapters,
        addNewCourse 
    } = useContext(AppContext);

    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);

    // Chapter & Lecture builder states
    const [newChapterTitle, setNewChapterTitle] = useState("");
    const [activeLectureForm, setActiveLectureForm] = useState<string | null>(null); // chapterId
    const [lectureTitle, setLectureTitle] = useState("");
    const [lectureDuration, setLectureDuration] = useState("");
    const [lectureUrl, setLectureUrl] = useState("");
    const [isPreviewFree, setIsPreviewFree] = useState(false);

    // Initialize Quill Editor
    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: "snow",
                placeholder: "Write course description details..."
            });

            if (courseDescription) {
                quillRef.current.root.innerHTML = courseDescription;
            }

            quillRef.current.on("text-change", () => {
                if (quillRef.current) {
                    setCourseDescription(quillRef.current.root.innerHTML);
                }
            });
        }
    }, []);

    // Chapters Handler
    const handleAddChapter = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newChapterTitle.trim()) return;
        
        const newChapter = {
            chapterId: Math.random().toString(36).substring(7),
            chapterOrder: courseChapters.length + 1,
            chapterTitle: newChapterTitle.trim(),
            chapterContent: []
        };
        
        setCourseChapters([...courseChapters, newChapter]);
        setNewChapterTitle("");
    };

    const handleDeleteChapter = (chapterId: string) => {
        setCourseChapters(courseChapters.filter(c => c.chapterId !== chapterId));
    };

    // Lectures Handler
    const handleAddLecture = (chapterId: string) => {
        if (!lectureTitle.trim() || !lectureDuration || !lectureUrl.trim()) return;

        const updatedChapters = courseChapters.map(chapter => {
            if (chapter.chapterId === chapterId) {
                const newLecture = {
                    lectureId: Math.random().toString(36).substring(7),
                    lectureTitle: lectureTitle.trim(),
                    lectureDuration: parseInt(lectureDuration) || 0,
                    lectureUrl: lectureUrl.trim(),
                    isPreviewFree,
                    lectureOrder: chapter.chapterContent.length + 1
                };
                return {
                    ...chapter,
                    chapterContent: [...chapter.chapterContent, newLecture]
                };
            }
            return chapter;
        });

        setCourseChapters(updatedChapters);
        
        // Reset lecture form inputs
        setLectureTitle("");
        setLectureDuration("");
        setLectureUrl("");
        setIsPreviewFree(false);
        setActiveLectureForm(null);
    };

    const handleDeleteLecture = (chapterId: string, lectureId: string) => {
        const updatedChapters = courseChapters.map(chapter => {
            if (chapter.chapterId === chapterId) {
                return {
                    ...chapter,
                    chapterContent: chapter.chapterContent.filter((l: any) => l.lectureId !== lectureId)
                };
            }
            return chapter;
        });
        setCourseChapters(updatedChapters);
    };

    // Course Submit
    const handleCourseSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!courseTitle.trim() || !coursePrice || !courseDescription.trim()) return;

        const newCourseObj = {
            _id: Math.random().toString(36).substring(7),
            courseTitle: courseTitle.trim(),
            courseDescription: courseDescription.trim(),
            coursePrice: parseFloat(coursePrice) || 0,
            discount: parseFloat(courseDiscount) || 0,
            courseThumbnail: "https://img.youtube.com/vi/CBWnBi-awSA/maxresdefault.jpg", // Default placeholder thumbnail
            courseContent: courseChapters,
            enrolledStudents: [],
            courseRatings: [],
            isPublished: true,
            createdAt: new Date().toISOString(),
            educator: {
                name: "GreatStack"
            }
        };

        addNewCourse(newCourseObj);

        // Clear states
        setCourseTitle("");
        setCourseDescription("");
        setCoursePrice("");
        setCourseDiscount("");
        setCourseChapters([]);

        if (quillRef.current) {
            quillRef.current.root.innerHTML = "";
        }

        navigate("/educator/my-courses");
    };

    return (
        <div className="flex flex-col gap-6 text-left max-w-4xl">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Add New Course</h1>

            <form onSubmit={handleCourseSubmit} className="flex flex-col gap-6">
                
                {/* General Course Info */}
                <div className="flex flex-col gap-4 bg-white border border-gray-250/80 rounded-xl p-5 md:p-6 shadow-xs">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Course Title</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Build an E-commerce platform" 
                            className="bg-transparent border border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2.5 rounded-lg text-sm text-gray-700 w-full transition-colors"
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                            required
                        />
                    </div>

                    {/* Quill Rich Text Editor */}
                    <div className="flex flex-col gap-1.5 mt-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Course Description</label>
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <div ref={editorRef} className="bg-white min-h-[160px] text-sm"></div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Price ($)</label>
                            <input 
                                type="number" 
                                step="0.01" 
                                placeholder="0.00" 
                                className="bg-transparent border border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2.5 rounded-lg text-sm text-gray-700 transition-colors"
                                value={coursePrice}
                                onChange={(e) => setCoursePrice(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Discount (%)</label>
                            <input 
                                type="number" 
                                placeholder="0" 
                                className="bg-transparent border border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2.5 rounded-lg text-sm text-gray-700 transition-colors"
                                value={courseDiscount}
                                onChange={(e) => setCourseDiscount(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Syllabus Builder */}
                <div className="flex flex-col gap-4 bg-white border border-gray-250/80 rounded-xl p-5 md:p-6 shadow-xs">
                    <h2 className="text-lg font-bold text-gray-800">Syllabus Builder</h2>

                    {/* Chapters List */}
                    <div className="space-y-4">
                        {courseChapters.map((chapter, index) => (
                            <div key={chapter.chapterId} className="border border-gray-250/80 rounded-lg p-4 bg-gray-50/30">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold text-sm md:text-base text-gray-800">
                                        Chapter {index + 1}: {chapter.chapterTitle}
                                    </h3>
                                    <button 
                                        type="button" 
                                        onClick={() => handleDeleteChapter(chapter.chapterId)}
                                        className="text-red-500 hover:text-red-700 text-xs font-bold transition-colors cursor-pointer"
                                    >
                                        Remove Chapter
                                    </button>
                                </div>

                                {/* Lectures inside Chapter */}
                                <div className="space-y-2 mb-3">
                                    {chapter.chapterContent.map((lecture: any, lIndex: number) => (
                                        <div key={lecture.lectureId} className="flex justify-between items-center bg-white border border-gray-200 px-4 py-2 rounded-md text-xs md:text-sm">
                                            <span className="text-gray-600 font-medium">
                                                {lIndex + 1}. {lecture.lectureTitle} ({lecture.lectureDuration} mins) {lecture.isPreviewFree && <span className="text-blue-500 text-xxs font-bold ml-1 border border-blue-200 px-1 py-0.5 rounded">Preview</span>}
                                            </span>
                                            <button 
                                                type="button" 
                                                onClick={() => handleDeleteLecture(chapter.chapterId, lecture.lectureId)}
                                                className="text-gray-400 hover:text-red-500 font-medium transition-colors cursor-pointer"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Add Lecture Form Trigger */}
                                {activeLectureForm === chapter.chapterId ? (
                                    <div className="flex flex-col gap-3 bg-white border border-gray-200 p-4 rounded-lg mt-3">
                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">New Lecture</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <input 
                                                type="text" 
                                                placeholder="Lecture Title" 
                                                className="border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2 rounded text-xs text-gray-700 transition-colors w-full"
                                                value={lectureTitle}
                                                onChange={(e) => setLectureTitle(e.target.value)}
                                            />
                                            <input 
                                                type="number" 
                                                placeholder="Duration (mins)" 
                                                className="border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2 rounded text-xs text-gray-700 transition-colors w-full"
                                                value={lectureDuration}
                                                onChange={(e) => setLectureDuration(e.target.value)}
                                            />
                                        </div>
                                        <input 
                                            type="text" 
                                            placeholder="YouTube Lecture Link" 
                                            className="border border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2 rounded text-xs text-gray-700 transition-colors w-full"
                                            value={lectureUrl}
                                            onChange={(e) => setLectureUrl(e.target.value)}
                                        />
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="checkbox" 
                                                id={`preview-${chapter.chapterId}`}
                                                checked={isPreviewFree}
                                                onChange={(e) => setIsPreviewFree(e.target.checked)}
                                                className="cursor-pointer rounded border-gray-300 focus:ring-blue-500 text-blue-600"
                                            />
                                            <label htmlFor={`preview-${chapter.chapterId}`} className="text-xs text-gray-500 cursor-pointer select-none">
                                                Available as Free Preview
                                            </label>
                                        </div>
                                        <div className="flex gap-2 justify-end mt-1">
                                            <button 
                                                type="button" 
                                                onClick={() => setActiveLectureForm(null)}
                                                className="border border-gray-350 text-gray-600 hover:bg-gray-50 text-xs px-4 py-2 rounded font-medium transition-all cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                type="button" 
                                                onClick={() => handleAddLecture(chapter.chapterId)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded font-semibold transition-all cursor-pointer"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button 
                                        type="button" 
                                        onClick={() => setActiveLectureForm(chapter.chapterId)}
                                        className="text-blue-600 hover:text-blue-700 hover:underline text-xs font-semibold mt-2 cursor-pointer block"
                                    >
                                        + Add Lecture
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Add Chapter Inline Form */}
                    <div className="flex flex-col sm:flex-row gap-2 mt-2 items-stretch">
                        <input 
                            type="text" 
                            placeholder="e.g. Setting up your environment" 
                            className="bg-transparent border border-gray-300 focus:border-blue-500 focus:outline-none px-4 py-2 rounded-lg text-xs md:text-sm text-gray-700 transition-colors w-full sm:max-w-xs"
                            value={newChapterTitle}
                            onChange={(e) => setNewChapterTitle(e.target.value)}
                        />
                        <button 
                            type="button" 
                            onClick={handleAddChapter}
                            className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold text-xs px-5 py-2.5 rounded-lg transition-colors shrink-0 cursor-pointer"
                        >
                            + Add Chapter
                        </button>
                    </div>
                </div>

                {/* Publish Button */}
                <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-lg shadow-sm shadow-blue-500/20 active:scale-98 transition-all w-fit px-8 cursor-pointer mt-4 self-start"
                >
                    Publish Course
                </button>

            </form>
        </div>
    );
}