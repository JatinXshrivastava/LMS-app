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
    setPreviewVideoUrl: () => {}
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
        setPreviewVideoUrl
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