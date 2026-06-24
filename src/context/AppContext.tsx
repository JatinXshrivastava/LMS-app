import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";

type AppContextType = {
    currency: string;
    allCourses: any[];
    calculateRatings: any; 
    isEducator : boolean ;
    setIsEducator : (value : boolean) => void ;
};

export const AppContext = createContext<AppContextType>({
    currency: "$",
    allCourses: [] ,
    calculateRatings:()=>{
        return 0 ; 
    },
    isEducator : false ,
    setIsEducator : () => {} 
});

export const AppContextProvider = (props: any) => {
    const currency = import.meta.env.VITE_CURRENCY || "$";
    const [allCourses, setAllCourses] = useState<any[]>([]);
    const [isEducator , setIsEducator] = useState<boolean>(true);

    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses);
    };

    const calculateRatings = (course : any) => {
        if(course.courseRatings.length === 0 ) {
            return 0 ; 
        }
        let totalRatings = 0 ; 
        course.courseRatings.forEach((rating : any ) => {
            totalRatings += rating.rating ;
        })
        return (totalRatings / course.courseRatings.length ).toFixed(2) ;
    };

    const value: AppContextType = {
        currency,
        allCourses,
        calculateRatings , 
        isEducator ,
        setIsEducator   
    };
    useEffect(()=>{
        fetchAllCourses()
    },[])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};