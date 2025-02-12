import CardDocumento from "../../components/CardDocumento"
import Footer from "../../components/Footer"
import Header from "../../components/Header"

const documentos = [
    {
        nombre: "Matriculas",
        descripcion: "Procedimiento de matriculas",
        enlace: "#"
    },
    {
        nombre: "Certificados",
        descripcion: "Procedimiento de certificados",
        enlace: "#"
    },
    {
        nombre: "Constancias",
        descripcion: "Procedimiento de constancias",
        enlace: "#"
    },
    {
        nombre: "Solicitudes",
        descripcion: "Procedimiento de solicitudes",
        enlace: "#"
    },
    {
        nombre: "Solicitudes",
        descripcion: "Procedimiento de solicitudes",
        enlace: "#"
    },
    {
        nombre: "Solicitudes",
        descripcion: "Procedimiento de solicitudes",
        enlace: "#"
    }

    ]
const DocumentosTramites = () => {
  return (
    <div>
        <Header/>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-8 justify-center">
           {documentos.map((documento, index) => (  
            <CardDocumento key={index} 
            nombre={documento.nombre} descripcion={documento.descripcion} enlace={documento.enlace} />
            ))}
        </div>
        <Footer/>
    </div>
  )
}

export default DocumentosTramites
