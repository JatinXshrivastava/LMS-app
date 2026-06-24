import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export function SearchBar() {
    const navigate = useNavigate();
    const { searchBarInput, setSearchBarInput } = useContext(AppContext);

    const onSearchHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchBarInput.trim()) {
            navigate(`/course-list/${searchBarInput.trim()}`);
        } else {
            navigate('/course-list');
        }
    }

    return (
        <form className="flex items-center justify-between w-full max-w-xl bg-white rounded-full shadow-[0px_4px_15px_0px_rgba(0,0,0,0.06)] border border-gray-300/80 p-1 pl-4" onSubmit={onSearchHandler}>
            <div className="flex items-center flex-1">
                <img src={assets.search_icon} alt="Search" className="w-5 h-5 text-gray-400 mr-2" />
                <input 
                    type="text" 
                    placeholder="Search for courses" 
                    className="w-full bg-transparent outline-none text-gray-600 placeholder-gray-400/80 text-sm py-2" 
                    onChange={(e) => setSearchBarInput(e.target.value)} 
                    value={searchBarInput} 
                />
            </div>
            <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-full transition-all duration-300 active:scale-95 cursor-pointer"
            >
                Search
            </button>
        </form>
    );
}
