import { dummyTestimonial } from "../../assets/assets";

export function TestimonialSection() {
    return (
        <div className="pb-14 px-8 md:px-0">
            <h2 className="text-2xl md:text-3xl text-center font-bold text-gray-800">What Our Students Say</h2>
            <p className="mt-3 max-w-3xl md:text-base text-sm text-center mx-auto text-gray-500">
                Hear from our learners as they share their journeys of transformations, success, and how our 
                <br className="hidden md:block" />
                platform has made a difference in their lives 
            </p>
            <div className="flex flex-col md:flex-row mt-10 items-center justify-center gap-8 md:gap-10 lg:gap-20 px-8 py-6">
                {dummyTestimonial.map((testimonial, index) =>
                <div key={index} className="bg-white p-6 rounded-lg shadow-[0px_4px_15px_0px] shadow-gray-600/60 overflow-hidden flex flex-col items-center text-center max-w-[340px]">
                    <img src={testimonial.image} alt="" className="w-16 h-16 rounded-full object-cover" />
                    <div className="flex space-x-4 items-center mt-3">
                        <p className="text-lg font-semibold">{testimonial.name}</p>
                        <p className="text-gray-600/60 text-sm">{testimonial.role}</p>
                    </div>
                    <div className="pb-7 p-5">
                        <div>
                        {[...Array(5)].map((_, index) => (
                            <span key={index} className={`${index >= Math.floor(testimonial.rating) ? 'text-gray-300' : 'text-yellow-400'}`}>
                                ★
                            </span>
                        ))}
                    </div>
                        <p className="text-gray-600 text-sm mt-5">{testimonial.feedback}</p>
                    </div>
                </div>
                )}  
            </div>
        </div>
    )
}