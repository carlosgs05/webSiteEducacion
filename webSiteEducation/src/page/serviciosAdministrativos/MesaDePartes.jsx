import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useState } from "react";
import TopButton from "../../components/TopButton";

const MesaDePartes = () => {
  const [formData, setFormData] = useState({
    documentoIdentidad: "DNI",
    numeroIdentidad: "",
    nombre: "",
    apellidoMaterno: "",
    apellidoPaterno: "",
    correo: "",
    celular: "",
    fecha: "",
    tipoDocumento: "FUT",
    asunto: "",
    archivo: null,
    aceptarPoliticas: false,
    aceptarDeclaracion: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="w-full">
      <TopButton />
      <Header title="Mesa de Partes" />
      <div className="px-4 sm:px-6 md:px-16 lg:px-24 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#262D73] mb-6">
          Mesa de Partes - Escuela de Educación Inicial
        </h1>
        <p className="text-base sm:text-lg text-gray-700 text-justify mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nulla
          temporibus architecto, nemo, minus quo doloribus perspiciatis est
          sapiente nesciunt numquam officia autem iure enim? Voluptas voluptatem
          quia adipisci sit!
        </p>
        <div className="w-full max-w-4xl mr-4 sm:mx-auto bg-gray-100 rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna izquierda */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Tipo de documento</label>
                <select
                  name="documentoIdentidad"
                  value={formData.documentoIdentidad}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="DNI">DNI</option>
                  <option value="Carnet">Carnet de extranjería</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="RUC">RUC (Persona natural)</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Número de documento</label>
                <input
                  type="text"
                  name="numeroIdentidad"
                  value={formData.numeroIdentidad}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Nombre(s)</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium">Apellido Paterno</label>
                  <input
                    type="text"
                    name="apellidoPaterno"
                    value={formData.apellidoPaterno}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="flex-1 mt-4 sm:mt-0">
                  <label className="block text-sm font-medium">Apellido Materno</label>
                  <input
                    type="text"
                    name="apellidoMaterno"
                    value={formData.apellidoMaterno}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Columna derecha */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Celular</label>
                <input
                  type="tel"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Correo electrónico</label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Tipo Doc. a enviar</label>
                <input
                  type="text"
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            {/* Asunto y archivo */}
            <div className="col-span-1 md:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium">Asunto</label>
                <textarea
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  className="w-full p-2 border rounded h-28"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Subir archivo</label>
                <input
                  type="file"
                  name="archivo"
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="col-span-1 md:col-span-2 flex flex-col space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="aceptarPoliticas"
                  checked={formData.aceptarPoliticas}
                  onChange={handleChange}
                  className="mr-2 checked:bg-[#262D73] checked:border-[#262D73]"
                  required
                />
                Acepto la política de privacidad
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="aceptarDeclaracion"
                  checked={formData.aceptarDeclaracion}
                  onChange={handleChange}
                  className="mr-2 checked:bg-[#262D73] checked:border-[#262D73]"
                  required
                />
                Acepto la declaración jurada
              </label>
            </div>

            {/* Botón enviar */}
            <div className="col-span-1 md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-[#262D73] text-white px-6 py-2 rounded hover:bg-[#353e9c] transition"
              >
                Continuar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MesaDePartes;
