
const LoadingIndicator = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="flex flex-col items-center">
        {/* Spinner elegante */}
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        {/* Mensaje de carga */}
        <p className="mt-4 text-xl text-white font-semibold">Cargando...</p>
      </div>
    </div>
  );
};

export default LoadingIndicator;
