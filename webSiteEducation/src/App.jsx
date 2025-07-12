import Organizacion from './page/organizacion/organizacion'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './page/home/Home'
import Perfiles from './page/InformacionAcademica/Perfiles'
import MallaCurricular from './page/InformacionAcademica/MallaCurricular'
import DesarrolloProfesional from './page/desarrolloProfesional/DesarrolloProfesional'
import Noticias from './page/novedades/Noticias'
import DetalleNoticia from './page/novedades/DetalleNoticia'
import MesaDePartes from './page/serviciosAdministrativos/MesaDePartes'
import DocumentosTramites from './page/serviciosAdministrativos/DocumentosTramites'
function App() {
  return (
    <BrowserRouter basename="/webSiteEducacion">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/organizacion' element={<Organizacion />} />
        <Route path='/informacionAcademica/perfiles' element={<Perfiles />} />
        <Route path='/informacionAcademica/mallaCurricular' element={<MallaCurricular />} />
        <Route path='/desarrolloProfesional' element={<DesarrolloProfesional />} />
        <Route path='/novedades/noticias' element={<Noticias />} />  
        <Route path="/novedades/noticias/:id" element={<DetalleNoticia />} />
       <Route path="/serviciosAdministrativos/mesa-de-partes" element={<MesaDePartes/>} /> 
       <Route path="/serviciosAdministrativos/documentos-tramites" element={<DocumentosTramites/>} /> 

      </Routes>
    </BrowserRouter>
  )
}

export default App
