import { assets } from "../../assets/assets";

export function Footer() {
    return (
        <footer className="w-full bg-[#0B0F19] text-gray-400 text-left text-sm py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-start gap-10 md:gap-16">
                
                {/* Left Column: Logo & Description */}
                <div className="flex flex-col items-start max-w-sm">
                    <img src={assets.logo_dark} alt="Edemy Logo" className="w-28 md:w-32 cursor-pointer" />
                    <p className="mt-6 text-gray-500 text-xs md:text-sm leading-relaxed">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text.
                    </p>
                </div>

                {/* Center Column: Company Links */}
                <div className="flex flex-col items-start">
                    <h3 className="text-white font-semibold text-sm md:text-base mb-4">Company</h3>
                    <ul className="space-y-2 md:space-y-3">
                        <li>
                            <a href="#" className="hover:text-white transition-colors duration-200 text-xs md:text-sm">Home</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition-colors duration-200 text-xs md:text-sm">About us</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition-colors duration-200 text-xs md:text-sm">Contact us</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition-colors duration-200 text-xs md:text-sm">Privacy policy</a>
                        </li>
                    </ul>
                </div>

                {/* Right Column: Newsletter Subscription */}
                <div className="flex flex-col items-start w-full md:max-w-md">
                    <h3 className="text-white font-semibold text-sm md:text-base mb-4">Subscribe to our newsletter</h3>
                    <p className="text-gray-500 text-xs md:text-sm mb-4 leading-relaxed">
                        The latest news, articles, and resources, sent to your inbox weekly.
                    </p>
                    <form className="flex flex-row items-center w-full gap-2 mt-2" onSubmit={(e) => e.preventDefault()}>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="bg-[#111827] text-gray-100 placeholder-gray-600 border border-gray-800/80 focus:border-blue-500 focus:outline-none px-4 py-2.5 rounded-md text-xs md:text-sm w-full md:w-64 transition-colors"
                            required
                        />
                        <button 
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-md text-xs md:text-sm transition-colors duration-200 shrink-0"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Section Divider */}
            <div className="max-w-7xl mx-auto px-6 md:px-16 mt-10 md:mt-12">
                <div className="border-t border-gray-800/60 w-full pt-6 text-center text-xs text-gray-600">
                    Copyright 2024 © Edemy. All Right Reserved.
                </div>
            </div>
        </footer>
    );
}