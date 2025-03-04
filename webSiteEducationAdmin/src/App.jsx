import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './page/HomeCarrusel/Home'
import Index from './page/Index'
import Pasantias from './page/DesarrolloProfesional/Pasantias'
import Rsu from './page/DesarrolloProfesional/Rsu'
import BolsaDeTrabajo from './page/DesarrolloProfesional/BolsaTrabajo'
import Documentos from './page/Documentos/Documentos'
import Noticias from './page/Noticias/Noticias'
import Autoridades from './page/Organizacion/Autoridades'
import PersonalDocente from './page/Organizacion/PersonalDocente'
import PersonalAdministrativo from './page/Organizacion/PersonalAdministrativo'
import MallaCurricular from './page/InformacionAcademica/MallaCurricular'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/homeCarrusel' element={<Home />} />
        <Route path='/organizacion/autoridades' element={<Autoridades />} />
        <Route path='/organizacion/personalDocente' element={<PersonalDocente />} />
        <Route path='/organizacion/personalAdministrativo' element={<PersonalAdministrativo />} />
        <Route path='/desarrolloProfesional/pasantias' element={<Pasantias />} />
        <Route path='/desarrolloProfesional/rsu' element={<Rsu />} />
        <Route path='/desarrolloProfesional/bolsaDeTrabajo' element={<BolsaDeTrabajo />} />
        <Route path='/mallaCurricular' element={<MallaCurricular />} />
        <Route path='/noticias' element={<Noticias />} />
        <Route path='/documentos' element={<Documentos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
