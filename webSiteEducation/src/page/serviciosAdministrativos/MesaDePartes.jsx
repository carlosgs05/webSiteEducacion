import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useState } from "react";
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
    documentoEnviar: "FUT",
    asunto: "",
    archivo: null,
    aceptarPoliticas: false,
    aceptarDeclaracion: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div>
      <Header />
      <div className="flex flex-col px-20 gap-y-5 pb-10">
        <h1 className="text-3xl font-bold text-center mt-10 text-[#262D73]">
          Mesa de Partes - Escuela de Educación inicial
        </h1>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nulla
          temporibus architecto, nemo, minus quo doloribus perspiciatis est
          sapiente nesciunt numquam officia autem iure enim? Voluptas voluptatem
          quia adipisci sit!
        </p>
        <div className="w-[900px] mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-medium">
                  Tipo de documento de identidad
                </label>
                <select
                  name="documentoIdentidad"
                  value={formData.documentoIdentidad}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="DNI">DNI</option>
                  <option value="Pasaporte">Carnet de extranjería</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="Pasaporte">Ruc 10 (Persona natural)</option>
                  <option value="Pasaporte">Otros</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Numero de documento de identidad</label>
                <input
                  type="number"
                  name="numeroIdentidad"
                  value={formData.numeroIdentidad}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Apellido Paterno
                </label>
                <input
                  type="text"
                  name="apellidoPaterno"
                  value={formData.apellidoPaterno}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Apellido Materno
                </label>
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
            <div className="flex flex-col gap-6">
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
                <label className="block text-sm font-medium">
                  Tipo y número de documento a enviar
                </label>
                <input
                  type="text"
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Correo</label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div className="grid col-span-2">
              <label className="block text-sm font-medium">Asunto</label>
              <textarea
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                className="w-full p-2 border rounded h-32"
                required
              ></textarea>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium">Subir archivo</label>
              <input
                type="file"
                name="archivo"
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className=" grid col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="aceptarPoliticas"
                  checked={formData.aceptarPoliticas}
                  onChange={handleChange}
                  className="mr-2 checked:bg-[#262D73] checked:border-[#262D73]"
                  required
                />
                <label>Acepto la política de privacidad</label>
              </div>
            </div>
            <div className="grid col-span-2">
              <div className="flex items-center ">
                <input
                  type="checkbox"
                  name="aceptarDeclaracion"
                  checked={formData.aceptarDeclaracion}
                  onChange={handleChange}
                  className="mr-2 checked:bg-[#262D73] checked:border-[#262D73]"
                  required
                />
                <label>Acepto la declaración jurada</label>
              </div>
            </div>

            <div className="grid col-span-2 justify-end">
              <button
                type="submit"
                className="w-40 bg-[#262D73] text-white p-2 rounded hover:bg-[#353e9c]"
              >
                Continuar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
    
  );
};

export default MesaDePartes;
