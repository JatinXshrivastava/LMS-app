import { Link } from "react-router-dom";
import { useClerk } from "@clerk/react";

export function CallToAction() {
    const {openSignUp} = useClerk() ; 

    return (
        <div className="flex flex-col items-center justify-center text-center py-16 md:py-24 px-8">
            <h2 className="text-3xl md:text-4xl text-gray-800 font-bold">
                Learn anything, anytime, anywhere
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-4 max-w-xl leading-relaxed">
                Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam
                aliqua proident excepteur commodo do ea.
            </p>
            <div className="flex items-center gap-6 mt-8">
                <Link 
                    to="/" onClick={() => openSignUp()} 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md transition-all duration-300 active:scale-95 shadow-sm"
                >
                    Get started
                </Link>
                <Link 
                    to="/course-list" 
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold group transition-colors duration-200"
                >
                    Learn more 
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                        →
                    </span>
                </Link>
            </div>
        </div>
    );
}
