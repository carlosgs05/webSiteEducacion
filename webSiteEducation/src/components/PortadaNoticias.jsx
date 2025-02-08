import { Link } from "react-router";


const noticias = [
    {
      id: 1,
      imagen: "../src/assets/noticia1.jpeg",
      titulo: "Noticia 1",
      fecha: "10 de Febrero, 2025",
      url: "/novedades/noticia/1",
    },
    {
      id: 2,
      imagen: "../src/assets/noticia2.jpeg",
      titulo: "Noticia 2",
      fecha: "11 de Febrero, 2025",
      url: "/novedades/noticia/2",

    },
    {
      id: 3,
      imagen: "../src/assets/noticia3.jpeg",
      titulo: "Noticia 3",
      fecha: "12 de Febrero, 2025",
      url: "/novedades/noticia/3",

    },
  ];
  
const PortadaNoticias = () => {
    return (
        <div className="grid gap-4">
          {/* Noticia Principal */}
          <Link to={noticias[0].url} className="relative group block overflow-hidden border border-blue-300 rounded-lg">
            <img src={noticias[0].imagen} alt={noticias[0].titulo} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
              
              <h2 className="text-white text-lg font-bold mt-2">{noticias[0].titulo}</h2>
              <p className="text-gray-300 text-sm mt-1">{noticias[0].fecha}</p>
            </div>
          </Link>
          
          {/* Noticias Secundarias */}
          <div className="grid grid-cols-2 gap-4">
            {noticias.slice(1).map((noticia) => (
              <Link key={noticia.id} to={noticia.url} className="relative group block overflow-hidden border border-blue-300 rounded-lg">
                <img src={noticia.imagen} alt={noticia.titulo} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-2">
                  <h3 className="text-white text-sm font-semibold">{noticia.titulo}</h3>
                  <p className="text-gray-300 text-xs">{noticia.fecha}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      );
}

export default PortadaNoticias
