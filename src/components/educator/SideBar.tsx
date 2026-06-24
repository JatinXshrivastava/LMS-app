import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

export function SideBar() {
    const menuItems = [
        {
            name: "Dashboard",
            path: "/educator",
            icon: assets.home_icon,
            exact: true
        },
        {
            name: "Add Course",
            path: "/educator/add-course",
            icon: assets.add_icon,
            exact: false
        },
        {
            name: "My Courses",
            path: "/educator/my-courses",
            icon: assets.my_course_icon,
            exact: false
        },
        {
            name: "Students Enrolled",
            path: "/educator/students-enrolled",
            icon: assets.person_tick_icon,
            exact: false
        }
    ];

    return (
        <div className="flex flex-row md:flex-col w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-250/80 md:min-h-screen py-2 md:py-6 overflow-x-auto shrink-0 md:overflow-x-visible select-none">
            {menuItems.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) => 
                        `flex items-center gap-3 px-5 py-3.5 text-xs md:text-sm font-medium transition-all duration-200 shrink-0 ${
                            isActive 
                                ? "bg-blue-50/70 border-b-2 md:border-b-0 md:border-r-4 border-blue-600 text-blue-600 font-semibold" 
                                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50/50"
                        }`
                    }
                >
                    <img src={item.icon} alt={item.name} className="w-5 h-5 opacity-70 filter brightness-90 shrink-0" />
                    <span>{item.name}</span>
                </NavLink>
            ))}
        </div>
    );
}
