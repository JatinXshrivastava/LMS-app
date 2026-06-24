import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";

type AppContextType = {
    currency: string;
    allCourses: any[];
    calculateRatings: any; 
    isEducator: boolean;
    setIsEducator: (value: boolean) => void;
    
    // SearchBar state
    searchBarInput: string;
    setSearchBarInput: (value: string) => void;
    
    // CourseList state
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    filteredCourses: any[];
    setFilteredCourses: (value: any[]) => void;
    
    // CourseDetail state
    courseData: any;
    setCourseData: (value: any) => void;
    expandedChapters: { [key: string]: boolean };
    setExpandedChapters: (value: any) => void;
    totalLectures: number;
    setTotalLectures: (value: number) => void;
    totalDuration: number;
    setTotalDuration: (value: number) => void;
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    previewVideoUrl: string;
    setPreviewVideoUrl: (value: string) => void;

    // Enrolled Courses & Player states
    enrolledCourses: any[];
    setEnrolledCourses: (value: any[]) => void;
    activeLecture: any;
    setActiveLecture: (value: any) => void;
    completedLectures: { [courseId: string]: string[] };
    setCompletedLectures: (value: any) => void;
    toggleLectureCompletion: (courseId: string, lectureId: string) => void;
    getCourseProgress: (course: any) => number;
};

export const AppContext = createContext<AppContextType>({
    currency: "$",
    allCourses: [],
    calculateRatings: () => {
        return 0; 
    },
    isEducator: false,
    setIsEducator: () => {},
    
    searchBarInput: "",
    setSearchBarInput: () => {},
    
    searchQuery: "",
    setSearchQuery: () => {},
    filteredCourses: [],
    setFilteredCourses: () => {},
    
    courseData: null,
    setCourseData: () => {},
    expandedChapters: {},
    setExpandedChapters: () => {},
    totalLectures: 0,
    setTotalLectures: () => {},
    totalDuration: 0,
    setTotalDuration: () => {},
    showModal: false,
    setShowModal: () => {},
    previewVideoUrl: "",
    setPreviewVideoUrl: () => {},

    enrolledCourses: [],
    setEnrolledCourses: () => {},
    activeLecture: null,
    setActiveLecture: () => {},
    completedLectures: {},
    setCompletedLectures: () => {},
    toggleLectureCompletion: () => {},
    getCourseProgress: () => 0
});

export const AppContextProvider = (props: any) => {
    const currency = import.meta.env.VITE_CURRENCY || "$";
    const [allCourses, setAllCourses] = useState<any[]>([]);
    const [isEducator, setIsEducator] = useState<boolean>(true);

    // SearchBar state
    const [searchBarInput, setSearchBarInput] = useState("");

    // CourseList state
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCourses, setFilteredCourses] = useState<any[]>([]);

    // CourseDetail state
    const [courseData, setCourseData] = useState<any>(null);
    const [expandedChapters, setExpandedChapters] = useState<{ [key: string]: boolean }>({});
    const [totalLectures, setTotalLectures] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [previewVideoUrl, setPreviewVideoUrl] = useState("");

    // Enrolled Courses & Player state
    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
    const [activeLecture, setActiveLecture] = useState<any>(null);
    const [completedLectures, setCompletedLectures] = useState<{ [courseId: string]: string[] }>({
        // Pre-populate some completed lectures for demo
        "605c72efb3f1c2b1f8e4e1a1": ["lecture1"]
    });

    const toggleLectureCompletion = (courseId: string, lectureId: string) => {
        setCompletedLectures(prev => {
            const current = prev[courseId] || [];
            const updated = current.includes(lectureId)
                ? current.filter(id => id !== lectureId)
                : [...current, lectureId];
            return {
                ...prev,
                [courseId]: updated
            };
        });
    };

    const getCourseProgress = (course: any) => {
        if (!course) return 0;
        const completed = completedLectures[course._id]?.length || 0;
        let total = 0;
        course.courseContent.forEach((chapter: any) => {
            total += chapter.chapterContent.length;
        });
        if (total === 0) return 0;
        return Math.round((completed / total) * 100);
    };

    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses);
    };

    const calculateRatings = (course: any) => {
        if (course.courseRatings.length === 0) {
            return 0; 
        }
        let totalRatings = 0;
        course.courseRatings.forEach((rating: any) => {
            totalRatings += rating.rating;
        });
        return (totalRatings / course.courseRatings.length).toFixed(2);
    };

    // Populate enrolled courses when allCourses is loaded
    useEffect(() => {
        if (allCourses.length > 0) {
            // Assign mock enrolled courses (first 3 courses)
            setEnrolledCourses(allCourses.slice(0, 3));
        }
    }, [allCourses]);

    const value: AppContextType = {
        currency,
        allCourses,
        calculateRatings, 
        isEducator,
        setIsEducator,
        
        searchBarInput,
        setSearchBarInput,
        
        searchQuery,
        setSearchQuery,
        filteredCourses,
        setFilteredCourses,
        
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
        setPreviewVideoUrl,

        enrolledCourses,
        setEnrolledCourses,
        activeLecture,
        setActiveLecture,
        completedLectures,
        setCompletedLectures,
        toggleLectureCompletion,
        getCourseProgress
    };

    useEffect(() => {
        fetchAllCourses();
    }, []);

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};