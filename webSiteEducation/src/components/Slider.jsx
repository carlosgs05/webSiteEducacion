import { array } from "prop-types";

const Slider = ({ images }) => {
    console.log("Imagenes recibidas en Slider:", images);

    return (
        <div id="default-carousel" className="relative w-full h-full" data-carousel="slide">
            <div className="relative overflow-hidden h-full">
                {images.map((image, index) => (
                    <div key={index} className={`hidden duration-700 ease-in-out`} data-carousel-item>
                        <img 
                            src={image}
                            className="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" 
                            alt={`imagen ${index + 1}`} 
                        />
                    </div>
                    
                ))}
            </div>

            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                {images.map((_, index) => (
                    <button 
                        key={index} 
                        type="button" 
                        className="w-3 h-3 rounded-full" 
                        aria-label={`Slide ${index + 1}`} 
                        data-carousel-slide-to={index}
                    ></button>
                ))}
            </div>

            <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                    <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>

            <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                    <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
};

Slider.propTypes = {
    images: array.isRequired,
};
export default Slider;
