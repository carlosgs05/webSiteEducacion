import { useState, useEffect } from "react";

const TopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-4 right-4 px-4 py-2
        bg-[#262D73] text-white rounded-full shadow-lg
        hover:bg-[#323c93] transition duration-300
        ${visible ? "opacity-100" : "opacity-0"}
      `}
      aria-label="Volver arriba"
    >
      ↑
    </button>
  );
};

export default TopButton;
