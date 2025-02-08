import { Link } from "react-router";

const noticias = [
  {
    id: 1,
    imagen: "/assets/noticia1.jpeg",
    titulo: "Noticia 1",
    fecha: "10 de Febrero, 2025",
    url: "/novedades/noticia/1",

  },
  {
    id: 2,
    imagen: "/assets/noticia2.jpeg",
    titulo: "Noticia 2",
    fecha: "11 de Febrero, 2025",
    url: "/novedades/noticia/2",

  },
  {
    id: 3,
    imagen: "/assets/noticia3.jpeg",
    titulo: "Noticia 3",
    fecha: "12 de Febrero, 2025",
    url: "/novedades/noticia/3",

  },
  {
    id: 4,
    imagen: "/assets/noticia1.jpeg",
    titulo: "Noticia 4",
    fecha: "10 de Febrero, 2025",
    url: "/novedades/noticia/4",

  },
  {
    id: 5,
    imagen: "/assets/noticia2.jpeg",
    titulo: "Noticia 5",
    fecha: "11 de Febrero, 2025",
    url: "/novedades/noticia/5",

  },
  {
    id: 6,
    imagen: "/assets/noticia3.jpeg",
    titulo: "Noticia 6",
    fecha: "12 de Febrero, 2025",
    url: "/novedades/noticia/6",

  },
];

const ListaNoticias = () => {
  return (
      <div className="mt-6">
        <h3 className="text-lg font-bold text-blue-600">Más noticias</h3>
        <div className="border-t border-gray-300 mt-2 pt-2 h-[470px] overflow-y-auto">
          {noticias.map((noticia) => (
            <Link
              key={noticia.id}
              to={noticia.url}
              className="flex items-center gap-2 p-2 border-b border-gray-300"
            >
              <img
                src={noticia.imagen}
                alt={noticia.titulo}
                className="w-32 h-32  object-cover rounded-md"
              />
              <div className="flex flex-col">
                <span className="text-gray-500 text-xs">{noticia.fecha}</span>
                <h4 className="text-sm font-semibold text-gray-800">
                  {noticia.titulo}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
  );
};

export default ListaNoticias;
