
import Navbar from './Navbar';

const Header = () => {
   
  return (
    <header className="relative h-[650px]"> {/* Definir altura explícita */}
      <img
        src="../src/assets/fondo_header.png"
        alt="Foto"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <Navbar/>
    </header>
  );
};

export default Header;


