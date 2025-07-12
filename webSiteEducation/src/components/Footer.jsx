import { FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaPhone, FaEnvelope, FaGlobe } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gradient-to-r from-[#f899de] to-[#a05d8e] text-white pt-12 pb-4">
      <div className="container mx-auto px-6 lg:px-0 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo */}
        <div className="flex justify-center md:justify-start mb-4">
          <a href="/webSiteEducacion" className="flex items-center space-x-6">
            <img
              src="/webSiteEducacion/assets/logo.png"
              alt="UNT - Educación Inicial"
              className="h-10 w-auto"
            />
          </a>
        </div>

        {/* Links Sections */}
        <div className="grid grid-cols-2 gap-2 md:col-span-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 font-semibold uppercase tracking-wide">Contacto</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li className="flex items-center space-x-2">
                <FaPhone size={16} />
                <a href="tel:+51918548128" className="hover:underline">+51 918548128</a>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope size={16} />
                <a href="mailto:contacto@unitru.edu.pe" className="hover:underline">contacto@unitru.edu.pe</a>
              </li>
              <li className="flex items-center space-x-2">
                <FaGlobe size={16} />
                <a href="https://www.unitru.edu.pe" target="_blank" rel="noopener noreferrer" className="hover:underline">unitru.edu.pe</a>
              </li>
            </ul>
          </div>
          <div className="lg:ml-8">
            <h3 className="mb-4 font-semibold uppercase tracking-wide">Portal</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <a
                  href="https://maps.app.goo.gl/FymzZYL1eiHTYwHLA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Mapa del sitio
                </a>
              </li>
              <li>
                <a href="/webSiteEducacion/acerca-de" className="hover:underline">Acerca de</a>
              </li>
              <li>
                <a href="/webSiteEducacion/ayuda" className="hover:underline">Ayuda</a>
              </li>
            </ul>
          </div>
          <div className="md:hidden lg:block" />
          <div>
            <h3 className="mb-4 font-semibold uppercase tracking-wide">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/InicialUNT" target="_blank"  aria-label="Facebook" className="hover:text-[#FFD700] transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" target="_blank"  className="hover:text-[#1DA1F2] transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" aria-label="YouTube" target="_blank"  className="hover:text-red-600 transition">
                <FaYoutube size={20} />
              </a>
              <a href="#" aria-label="Instagram" target="_blank"  className="hover:text-[#C13584] transition">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-white/30 mt-12 pt-4">
        <div className="container mx-auto px-6 lg:px-0 flex flex-col md:flex-row justify-between items-center text-xs opacity-80">
          <p>© {currentYear} Universidad Nacional de Trujillo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
