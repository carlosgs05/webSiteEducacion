import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import LoadingIndicator from "../components/LoadingIndicator";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula una carga de 310 milisegundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 310);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div className="p-4">
          <h1 className="text-xl text-center font-medium">BIENVENIDO</h1>
        </div>
      )}
    </Layout>
  );
};

export default Index;