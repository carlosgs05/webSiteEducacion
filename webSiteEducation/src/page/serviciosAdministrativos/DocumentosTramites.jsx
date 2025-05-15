import { useState, useEffect } from "react";
import CardDocumento from "../../components/CardDocumento"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import axios from "axios"
import TopButton from "../../components/TopButton";

const DocumentosTramites = () => {
    const [dataDocumentos, setDataDocumentos] = useState([]);
useEffect(() => {
    axios.get("http://localhost:8000/api/documentos")
      .then((response) => setDataDocumentos(response.data))
      .catch((error) => console.error("Error al obtener los datos:", error));
  }, []);
  return (
    <div>
        <TopButton />
        <Header
        title="Documentos"/>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-8 justify-center">
           {dataDocumentos.map((documento, index) => (  
            <CardDocumento key={index} 
            nombre={documento.Titulo} descripcion={documento.Descripcion} enlace={documento.Url} />
            ))}
        </div>
        <Footer/>
    </div>
  )
}
export default DocumentosTramites
