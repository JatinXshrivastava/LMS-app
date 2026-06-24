import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/educator/Navbar";
import { SideBar } from "../../components/educator/SideBar";
import { Footer } from "../../components/educator/Footer";

export function Educator() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            {/* Header Navbar */}
            <Navbar />

            {/* Split Sidebar & Page Outlet Content */}
            <div className="flex flex-col md:flex-row flex-grow w-full">
                <SideBar />
                
                {/* Content Panel */}
                <div className="flex-grow flex flex-col min-w-0 bg-[#F8FAFC]">
                    <div className="flex-grow p-5 md:p-8">
                        <Outlet />
                    </div>
                    
                    {/* Bottom Footer */}
                    <Footer />
                </div>
            </div>
        </div>
    );
}
