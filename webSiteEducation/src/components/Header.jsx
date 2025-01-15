
import Navbar from './Navbar';

const Header = () => {
   
  return (
    <header className=" border-gray-500"> {/* Definir altura explícita */}
      <img
      src="../src/assets/portada-inicial.jpg"
      alt="Foto"
      className="w-full object-cover" />
      <Navbar/>
    </header>
    );
};

export default Header;


