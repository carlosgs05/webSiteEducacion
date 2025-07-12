import PropTypes from "prop-types";
import { useInView } from "react-intersection-observer";

const InfoMediaSection = ({
  title,
  content,
  media,
  mediaType,
  mediaPosition,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    rootMargin: "-50px",
  });

  return (
    <section
      ref={ref}
      className={`
        my-6 mx-10 md:my-10 md:mx-16
        transition duration-[1500ms] ease-out -translate-x-6
        ${inView ? "translate-x-0" : ""}
      `}
    >
      <div className="flex flex-col items-start gap-2 mb-9">
        <div className="text-2xl font-semibold text-[#262D73]">{title}</div>
        <div className="w-full h-1 bg-[#D9D9D9]"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Media */}
        <div
          className={`
            ${mediaPosition === "right" ? "order-1 md:order-2" : "order-1"}
            flex justify-center
          `}
        >
          {mediaType === "image" ? (
            <img
              src={media}
              alt="Section media"
              className="w-full h-auto max-w-md rounded-lg shadow-md"
            />
          ) : (
            <iframe
              src={media}
              title="YouTube video player"
              className="w-full h-[370px] rounded-lg shadow-md"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Text */}
        <div
          className={`
            ${mediaPosition === "right" ? "order-2 md:order-1" : "order-2"}
          `}
        >
          <p className="text-gray-600 leading-relaxed">{content}</p>
        </div>
      </div>
    </section>
  );
};

InfoMediaSection.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  media: PropTypes.string.isRequired,
  mediaType: PropTypes.string.isRequired,
  mediaPosition: PropTypes.string.isRequired,
};

export default InfoMediaSection;
