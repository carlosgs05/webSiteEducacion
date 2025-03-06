import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ModalPortal from "./ModalPortal"; // Ajusta la ruta si es necesario
import axios from "axios";
import Select from "react-select";

// Icono (X) para cerrar
const CloseIcon = () => (
  <svg
    className="w-5 h-5 cursor-pointer"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Estilos personalizados para react-select
const customStyles = {
  menuList: (provided) => ({
    ...provided,
    maxHeight: 150, // altura ~5 opciones
    overflowY: "auto",
  }),
  control: (provided) => ({
    ...provided,
    borderColor: "#d1d5db",
    boxShadow: "none",
    "&:hover": { borderColor: "#9ca3af" },
    minHeight: "2.25rem",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#9ca3af",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#374151",
  }),
};

const FormCursosModal = ({ onClose, onAccept, cursoToEdit }) => {
  const [nombre, setNombre] = useState("");
  const [cicloSeleccionado, setCicloSeleccionado] = useState(null);
  const [cicloOptions, setCicloOptions] = useState([]);

  // Cargar ciclos desde backend al montar
  useEffect(() => {
    const fetchCiclos = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/ciclos");
        // res.data debe ser un array de objetos { IdCiclo, Ciclo }
        const options = res.data.map((item) => ({
          value: item.IdCiclo, // ID que se enviará al backend
          label: item.Ciclo,   // Texto que se mostrará
        }));
        setCicloOptions(options);
      } catch (error) {
        console.error("Error al cargar ciclos:", error);
      }
    };
    fetchCiclos();
  }, []);

  // Si estamos en modo edición, inicializar los campos con los datos del curso
  useEffect(() => {
    if (cursoToEdit) {
      setNombre(cursoToEdit.Nombre || "");
      if (cursoToEdit.ciclo) {
        setCicloSeleccionado({
          value: cursoToEdit.ciclo.IdCiclo,
          label: cursoToEdit.ciclo.Ciclo,
        });
      } else {
        setCicloSeleccionado(null);
      }
    } else {
      // Si no hay curso a editar (modo "nuevo"), limpiamos
      setNombre("");
      setCicloSeleccionado(null);
    }
  }, [cursoToEdit]);

  const handleAccept = () => {
    // Validar que se haya ingresado un nombre y un ciclo
    if (!nombre.trim() || !cicloSeleccionado) {
      alert("Por favor, complete todos los campos del curso.");
      return;
    }

    // Se envía el objeto con nombre y el ciclo (objeto completo { value, label })
    onAccept({
      nombre,
      ciclo: cicloSeleccionado,
    });
    // Cerramos el modal
    onClose();
  };

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-md rounded-2xl shadow-lg p-4">
          {/* Botón (X) para cerrar */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <CloseIcon />
          </button>

          <h2 className="text-base font-semibold mb-4 text-gray-700 text-center uppercase">
            {cursoToEdit ? "Editar Curso" : "Agregar Curso"}
          </h2>

          <div className="space-y-3 text-sm">
            {/* Nombre del curso */}
            <div>
              <label className="block mb-1 text-gray-600 font-semibold">Nombre del curso</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
              />
            </div>

            {/* Ciclo */}
            <div>
              <label className="block mb-1 text-gray-600 font-semibold">Ciclo</label>
              <Select
                value={cicloSeleccionado}
                onChange={setCicloSeleccionado}
                options={cicloOptions}
                styles={customStyles}
                placeholder="Seleccione un ciclo"
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleAccept}
              className="bg-[#262D73] text-white py-2 px-5 font-semibold rounded transition duration-200 text-sm hover:bg-[#1F265F] cursor-pointer"
            >
              Aceptar
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 text-white font-semibold px-5 py-2 rounded shadow-md transition duration-200 text-sm hover:bg-red-600 cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

FormCursosModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  cursoToEdit: PropTypes.object, // puede ser null o un objeto curso
};

export default FormCursosModal;