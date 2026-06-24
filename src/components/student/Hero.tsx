import { assets } from "../../assets/assets"
import { SearchBar } from "./SearchBar"

export function Hero() {
    return (
        <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center py-16 bg-linear-to-b from-cyan-100/70">
            <h1 className="md:text-home-heading-large text-home-heading-small relative text-gray-800 max-w-5xl mx-auto font-bold mb-4">Empower your future with the courses designed to 
                <span className="text-blue-600"> fit your choices</span>
                <img src={assets.sketch} alt="sketch" className="md:block hidden absolute -bottom-7 right-0" />
            </h1>
            <p className="md:block hidden text-gray-500 max-w-2xl mx-auto">
                We bring together world-class educators and learners to create a vibrant community of knowledge sharing. Explore our diverse range of courses and take the next step in your educational journey.
            </p>
            <p className="md:hidden text-gray-500 max-w-sm mx-auto">
                we bring together world-class educators to help you achieve your professional goals.
            </p>
            <SearchBar />
        </div>
    )
}