import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useState } from "react";

export function SearchBar({data }: {data?: string}) {
    const navigate = useNavigate();
    const [input , setInput] = useState(data ? data : ""); 

    const onSearchHandler = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/course-list?search=${input}`);
    }

    return (
        <form className="flex items-center justify-center w-full md:w-auto bg-white rounded-full shadow-md border border-gray-300" onSubmit={onSearchHandler}>
            <img src={assets.search_icon} alt="Search" className="md:w-auto w-10 px-3" />
            <input  type="text" placeholder="search for courses" className="w-full h-full outline-none text-gray-500/80" onChange={(e) => setInput(e.target.value)} value={input} />
            <button type="submit" className="bg-blue-600 rounded-full text-white md:px-10 px-7 md:py-3 py-2 ">Search</button>
        </form>
    );
}
