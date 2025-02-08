import Organizacion from './page/organizacion/organizacion'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './page/home/Home'
import Perfiles from './page/InformacionAcademica/Perfiles'
import MallaCurricular from './page/InformacionAcademica/MallaCurricular'
import DesarrolloProfesional from './page/desarrolloProfesional/DesarrolloProfesional'
import Noticias from './page/novedades/Noticias'
import DetalleNoticia from './page/novedades/DetalleNoticia'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/organizacion' element={<Organizacion />} />
        <Route path='/informacionAcademica/perfiles' element={<Perfiles />} />
        <Route path='/informacionAcademica/mallaCurricular' element={<MallaCurricular />} />
        <Route path='/desarrolloProfesional' element={<DesarrolloProfesional />} />
        <Route path='/novedades/noticias' element={<Noticias />} />  
        <Route path="/novedades/noticia/:id" element={<DetalleNoticia />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
