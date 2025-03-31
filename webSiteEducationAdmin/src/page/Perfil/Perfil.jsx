import React, { useState, useRef } from "react";
import axios from "axios";
import swal from "sweetalert";
import Layout from "../../components/Layout";
import ImageUploadModal from "../../components/ImageUploadModal";

// Componente para input de contraseña personalizado sin icono nativo
// Se utiliza siempre un input de type "text" y se enmascaran los caracteres con WebkitTextSecurity
const PasswordField = ({ name, value, onChange, placeholder }) => {
  const [show, setShow] = useState(false);

  // Prevenir escribir espacios
  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        style={{
          WebkitTextSecurity: show ? "none" : "disc",
        }}
        className="block w-full pr-10 border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        {show ? (
          // Ícono de "ocultar contraseña" (ojo tachado)
          <svg
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-.92.137-1.8.392-2.625M7 7a9.953 9.953 0 00-3 5c0 5.523 4.477 10 10 10 1.536 0 3-.354 4.313-.975M15 15l3 3m-3-3l-3-3m0 0L9 9m3 3l3 3"
            />
          </svg>
        ) : (
          // Ícono de "mostrar contraseña" (ojo sin tachar)
          <svg
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

// Función para formatear la fecha en formato yyyy-MM-dd
const formatDateForInput = (date) => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime()) || d.getFullYear() <= 0) return "";
  return d.toISOString().split("T")[0];
};

const Perfil = () => {
  // Estados para información personal
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deletePhoto, setDeletePhoto] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newImageBlob, setNewImageBlob] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    gender: "",
    date_birth: "",
    phone_number: "",
  });

  // Estados para seguridad (Nueva Contraseña)
  const [securityEditing, setSecurityEditing] = useState(false);
  const [securityData, setSecurityData] = useState({
    password: "",
    confirmPassword: "",
  });

  // Referencia para el input file oculto
  const fileInputRef = useRef(null);

  // Handlers para información personal
  const handleUploadClick = () => {
    setDeletePhoto(false);
    setSelectedFile(null);
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        setShowModal(true);
      } else {
        alert(
          "Por favor selecciona un archivo de imagen válido (png, jpg, jpeg)."
        );
      }
    }
  };

  const handleImageSelected = (blob) => {
    setNewImageBlob(blob);
  };

  const handleEdit = (user) => {
    setEditing(true);
    setFormData({
      name: user.name,
      last_name: user.last_name,
      gender: user.gender,
      date_birth: formatDateForInput(user.date_birth),
      phone_number: user.phone_number,
    });
  };

  const handleCancel = () => {
    setEditing(false);
    setDeletePhoto(false);
    setSelectedFile(null);
    setNewImageBlob(null);
  };

  const handleSave = async (userId) => {
    const data = new FormData();
    data.append("id", userId);
    data.append("name", formData.name);
    data.append("last_name", formData.last_name);
    data.append("gender", formData.gender);
    data.append("date_birth", formData.date_birth);
    data.append("phone_number", formData.phone_number);
    data.append("delete_photo", deletePhoto);

    if (newImageBlob) {
      data.append("photo", newImageBlob, "profile.jpg");
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/profile/update", data);
      setEditing(false);
      setDeletePhoto(false);
      setSelectedFile(null);
      setNewImageBlob(null);
      swal("¡Éxito!", "Tus datos han sido actualizados correctamente.", "success").then(
        () => {
          window.location.reload();
        }
      );
    } catch (error) {
      console.error("Error al guardar", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDeleteImage = () => {
    setDeletePhoto(true);
    setSelectedFile(null);
    setNewImageBlob(null);
  };

  // Handlers para seguridad
  const handleSecurityEdit = () => {
    setSecurityEditing(true);
    setSecurityData({ password: "", confirmPassword: "" });
  };

  const handleSecurityCancel = () => {
    setSecurityEditing(false);
    setSecurityData({ password: "", confirmPassword: "" });
  };

  const handleSecurityChange = (e) => {
    setSecurityData({ ...securityData, [e.target.name]: e.target.value });
  };

  const handleSecuritySave = async (userId) => {
    if (securityData.password.length === 0 || securityData.confirmPassword.length === 0) {
      swal("Error", "La contraseña no puede estar vacía", "error");
      return;
    } else if (securityData.password !== securityData.confirmPassword) {
      swal("Error", "Las contraseñas no coinciden", "error");
      return;
    }
    // Se añade passwordLength para guardar la cantidad de caracteres originales
    const payload = {
      id: userId,
      password: securityData.password,
      confirmPassword: securityData.confirmPassword,
      passwordLength: securityData.password.length,
    };
    try {
      await axios.post("http://127.0.0.1:8000/api/profile/security", payload);
      setSecurityEditing(false);
      setSecurityData({ password: "", confirmPassword: "" });
      swal(
        "¡Éxito!",
        "La seguridad de tu cuenta ha sido actualizada correctamente.",
        "success"
      ).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error al actualizar seguridad", error);
    }
  };

  return (
    <Layout>
      {(user) => {
        if (!user) return <div className="p-6">Cargando usuario...</div>;

        const previewImage =
          newImageBlob
            ? URL.createObjectURL(newImageBlob)
            : user.photo && !deletePhoto
              ? user.photo
              : "http://127.0.0.1:8000/imagenes/avatar_profile.png";

        return (
          <div className="w-full px-8 pt-3 pb-8">
            <h1 className="text-2xl text-center font-medium text-blue-800 mb-9">
              MI PERFIL
            </h1>
            <div className="w-full mx-auto mt-5 rounded-xl shadow overflow-hidden">
              {/* Contenedor de ambas secciones con fondo uniforme */}
              <div className="bg-gray-50">
                {/* Sección de Información personal */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">
                    Información Personal
                  </h2>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={previewImage}
                          alt="Foto de perfil"
                          className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-md"
                        />
                      </div>
                      {!editing && (
                        <div className="ml-6">
                          <p className="text-lg font-bold text-gray-800">
                            {user.name} {user.last_name}
                          </p>
                          <p className="text-base text-gray-600">{user.email}</p>
                        </div>
                      )}
                      {editing && (
                        <div className="ml-6 flex space-x-4">
                          <input
                            type="file"
                            accept="image/png, image/jpg, image/jpeg"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                          />
                          <button
                            onClick={handleUploadClick}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition"
                          >
                            Editar
                          </button>
                          <button
                            onClick={handleDeleteImage}
                            className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition"
                          >
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 md:mt-0">
                      {!editing && (
                        <button
                          onClick={() => handleEdit(user)}
                          className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
                        >
                          Editar
                        </button>
                      )}
                    </div>
                  </div>

                  <form className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 mt-8">
                    <div>
                      <label className="block text-base font-medium text-gray-700">
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={editing ? formData.name : user.name}
                        onChange={handleChange}
                        disabled={!editing}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-base font-medium text-gray-700">
                        Apellido
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={editing ? formData.last_name : user.last_name}
                        onChange={handleChange}
                        disabled={!editing}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-base font-medium text-gray-700">
                        Género
                      </label>
                      <select
                        name="gender"
                        value={editing ? formData.gender : user.gender}
                        onChange={handleChange}
                        disabled={!editing}
                        style={
                          !editing
                            ? {
                                WebkitAppearance: "none",
                                MozAppearance: "none",
                                appearance: "none",
                              }
                            : {}
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="0" disabled>
                          Selecciona un género
                        </option>
                        <option value="1">Masculino</option>
                        <option value="2">Femenino</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-base font-medium text-gray-700">
                        Fecha de nacimiento
                      </label>
                      <input
                        type="date"
                        name="date_birth"
                        value={
                          editing
                            ? formData.date_birth
                            : formatDateForInput(user.date_birth)
                        }
                        onChange={handleChange}
                        disabled={!editing}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-base font-medium text-gray-700">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="phone_number"
                        value={editing ? formData.phone_number : user.phone_number}
                        onChange={handleChange}
                        disabled={!editing}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </form>

                  {editing && (
                    <div className="flex justify-end mt-4 space-x-4">
                      <button
                        onClick={handleCancel}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow hover:bg-gray-400 transition"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => handleSave(user.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
                      >
                        Guardar
                      </button>
                    </div>
                  )}
                </div>

                {/* Divisor elegante: Línea sutil */}
                <hr className="border-t-2 border-gray-300 mx-6 my-8" />

                {/* Sección de Seguridad de cuenta */}
                <div className="px-6 pb-9">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                      Seguridad de cuenta
                    </h2>
                    {!securityEditing && (
                      <button
                        onClick={handleSecurityEdit}
                        className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
                      >
                        Editar
                      </button>
                    )}
                  </div>
                  {securityEditing ? (
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-base font-medium text-gray-700">
                          Correo
                        </label>
                        <input
                          type="text"
                          value={user.email}
                          disabled
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-50"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-base font-medium text-gray-700 mb-2">
                            Nueva Contraseña
                          </label>
                          <PasswordField
                            name="password"
                            value={securityData.password}
                            onChange={handleSecurityChange}
                            placeholder=""
                          />
                        </div>
                        <div>
                          <label className="block text-base font-medium text-gray-700 mb-2">
                            Confirmar Nueva Contraseña
                          </label>
                          <PasswordField
                            name="confirmPassword"
                            value={securityData.confirmPassword}
                            onChange={handleSecurityChange}
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-base font-medium text-gray-700">
                          Correo
                        </label>
                        <input
                          type="text"
                          value={user.email}
                          disabled
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-base font-medium text-gray-700">
                          Contraseña
                        </label>
                        <input
                          type="text"
                          name="password"
                          value={user.password_length ? "•".repeat(user.password_length) : ""}
                          disabled
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  )}
                  {securityEditing && (
                    <div className="mt-8 flex justify-end space-x-4">
                      <button
                        onClick={handleSecurityCancel}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow hover:bg-gray-400 transition"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => handleSecuritySave(user.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
                      >
                        Guardar
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal para recortar la imagen */}
              <ImageUploadModal
                isOpen={showModal}
                file={selectedFile}
                onClose={() => setShowModal(false)}
                onImageSelected={handleImageSelected}
              />
            </div>
          </div>
        );
      }}
    </Layout>
  );
};

export default Perfil;