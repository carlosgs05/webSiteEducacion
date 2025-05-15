import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "./Button";
import PropTypes from "prop-types";

const CardSlider = ({ title, data }) => {
  var settings = {
    dots: true,
    infinite: false,
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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="my-6 mx-10 md:mx-16">
      <div className="flex flex-col items-start gap-2 mb-9">
        <div className="text-2xl font-semibold text-[#262D73]">{title}</div>
        <div className="w-full h-1 bg-[#D9D9D9]"></div>
      </div>
      <div className="w-full h-fit flex flex-col justify-center items-center pb-6">
        <div className="w-full h-fit px-8">
          <Slider {...settings}>
            {data.map((item, index) => (
              <div key={index} className="px-4">
                <div className="border border-gray-200 rounded-lg shadow-md bg-white overflow-hidden transform transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl">
                  <div className="relative overflow-hidden group">
                    <img
                      src={`http://localhost:8000/${
                        item.Imagen || item.ImagenPortada
                      }`}
                      className="w-full h-64 object-cover rounded-t-md transform transition-transform duration-700 ease-in-out group-hover:scale-105"
                      alt="imagen"
                    />
                  </div>
                  <div className="flex flex-col px-4 py-3 transition-all duration-500 ease-in-out">
                    <p className="text-sm text-[#262D73] font-semibold mb-1">
                      {item.Fecha}
                    </p>
                    <p className="text-base text-gray-600 mb-2 line-clamp-3 group-hover:line-clamp-none transition-all duration-500 ease-in-out">
                      {item.Nombre || item.Descripcion}
                    </p>
                  </div>
                  <div className="px-4 py-3 border-t border-gray-200 flex justify-start">
                    <a
                      href={`/novedades/noticias/${item.IdNoticia}`}
                      target="_blank"
                      className="text-[#262D73] hover:text-[#E4BCD3] font-medium transition-all duration-500 ease-in-out flex items-center gap-1"
                    >
                      Leer más
                      <span className="transition-transform duration-500 ease-in-out group-hover:translate-x-1">
                        ➔
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {title === "Noticias" && (
        <div className="flex justify-center">
          <Button name="Ver mas noticias" link={"/novedades/noticias"} />
        </div>
      )}
    </section>
  );
};
CardSlider.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
};

export default CardSlider;
