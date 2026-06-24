import { assets } from "../../assets/assets";
import { UserButton, useUser } from "@clerk/react";
import { Link } from "react-router-dom";

export function Navbar() {
    const { user } = useUser();

    return (
        <div className="flex justify-between items-center px-6 md:px-8 py-3 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
                <Link to="/">
                    <img src={assets.logo} alt="Edemy Logo" className="w-28 md:w-32 cursor-pointer" />
                </Link>
                <div className="hidden sm:block h-6 w-[1px] bg-gray-300"></div>
                <span className="hidden sm:block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Educator Portal
                </span>
            </div>
            <div className="flex items-center gap-4 text-gray-600">
                {user ? (
                    <div className="flex items-center gap-3">
                        <span className="hidden md:inline text-sm font-medium text-gray-600">
                            Welcome, {user.firstName || "Educator"}
                        </span>
                        <UserButton />
                    </div>
                ) : (
                    <span className="text-sm font-medium">Educator Mode</span>
                )}
            </div>
        </div>
    );
}