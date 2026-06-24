import { assets } from "../../assets/assets";

export function Companies() {
    return (
        <div className="flex flex-col p-14 items-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-500">Our Partner Companies</h2>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 md:mt-10 mt-5">
                <img src={assets.microsoft_logo} alt="Company Logo" className="w-36 md:w-48" />
                <img src={assets.walmart_logo} alt="Company Logo" className="w-36 md:w-48" />
                <img src={assets.accenture_logo} alt="Company Logo" className="w-36 md:w-48" />
                <img src={assets.adobe_logo} alt="Company Logo" className="w-36 md:w-48" />
                <img src={assets.paypal_logo} alt="Company Logo" className="w-36 md:w-48" />
            </div>
        </div>
    )
}
