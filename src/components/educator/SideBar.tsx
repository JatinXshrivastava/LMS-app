export function SideBar() {
    return (
        <div className="bg-gray-200 p-4 w-64">  
            <h2 className="text-xl font-bold mb-4">Educator Menu</h2>
            <ul>
                <li className="mb-2"><a href="#" className="text-blue-500 hover:underline">Dashboard</a></li>
                <li className="mb-2"><a href="#" className="text-blue-500 hover:underline">Courses</a></li>
                <li className="mb-2"><a href="#" className="text-blue-500 hover:underline">Students</a></li>
                <li className="mb-2"><a href="#" className="text-blue-500 hover:underline">Settings</a></li>    
            </ul>
        </div>
    )
}
