import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "./Button";
import PropTypes from 'prop-types';

const CardSlider = ({ title, data }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="my-6 mx-10 md:my-10 md:mx-16">
      <div className="flex flex-col items-start gap-2 mb-9">
        <div className="text-2xl font-semibold text-[#262D73]">{title}</div>
        <div className="w-full h-1 bg-[#D9D9D9]"></div>
      </div>
      <div className='w-full h-fit flex flex-col justify-center items-center pb-6'>
        <div className='w-full h-fit px-8'>
          <Slider {...settings}>
            {
              data.map((item, index) => (
                <div key={index} className="py-10 px-6">
                  <div className="border border-gray-200 rounded-md flex flex-col justify-center shadow-lg">
                    <div className="flex flex-col relative">
                      <img src={item.image}
                        className="w-full relative z-10 max-h-80 rounded-t-md" title="" alt="" />
                    </div>
                    <div className="flex flex-col px-4">
                      <p className="text-base mt-3 mb-2 text-[#545454] font-semibold">
                        {item.date}
                      </p>
                      <p className="text-base mb-3 line-clamp-3 hover:line-clamp-none text-gray-500 ">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex flex-row py-3 px-4 border-t border-gray-200">
                      <div className="w-1/2 flex flex-row text-[#262D73]">
                        <a href={item.link} target="_blank" className="mr-1 cursor-pointer hover:text-[#E4BCD3]">Leer más ➔</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </Slider>
        </div>
      </div>
      {title === "Noticias" && (
        <div className="flex justify-center mt-8">
          <Button name="VER MÁS NOTICIAS" 
          link={"/novedades/noticias"
          }/>
        </div>
      )}
    </section>
  )
}
CardSlider.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array
}

export default CardSlider



