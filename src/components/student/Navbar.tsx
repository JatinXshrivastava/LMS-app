import { Link } from "react-router-dom"
import { assets } from "../../assets/assets"
import { useClerk, UserButton, useUser } from "@clerk/react"
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export function Navbar() {
    const { openSignUp } = useClerk();
    const { user } = useUser();
    const { isEducator } = useContext(AppContext);  

    const isCourseListPage = window.location.pathname.includes("/course-list");
    return (
        <div className={`flex justify-between items-center px-6 py-2 border-b border-gray-500 ${isCourseListPage ? "bg-white" : "bg-cyan-100/70"}`}>
            <img src={assets.logo} alt="Logo" onClick={() => window.location.href = "/"} className="lg:w-32 w-28 cursor-pointer" />
            <div className="hidden md:flex gap-5 items-center text-gray-500 ">
                <div className="flex gap-5 items-center">
                    {user && <>
                        <button onClick={()=> window.location.href = "/educator"}>{isEducator ? 'Educator DashBoard' : 'Become Educator'}</button>
                        | <Link to="/my-enrollments">My Enrollments</Link>
                    </>
                    }
                </div>
                {user ? (
                    <UserButton />
                ) : (
                    <button onClick={() => openSignUp()} className="bg-blue-500 text-white cursor-pointer rounded-full p-2 m-2">Create Account</button>
                )}
            </div>
            {/* For mobile view, show only the "Create Account" button */}
            <div className="md:hidden flex items-center gap-2">
                {user && <>
                    <button onClick={()=> window.location.href = "/educator"}>{isEducator ? 'Educator DashBoard' : 'Become Educator'}</button>  
                    | <Link to="/my-enrollments">My Enrollments</Link>
                </>
                }
                {user ? <UserButton /> : <button onClick={() => openSignUp()} className="bg-blue-500 text-white rounded-full p-2 m-2">Create Account</button>}
            </div>
        </div>
    )
} 