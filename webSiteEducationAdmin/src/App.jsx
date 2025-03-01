import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './page/HomeCarrusel/Home'
import Index from './page/Index'
import Pasantias from './page/DesarrolloProfesional/Pasantias'
import Rsu from './page/DesarrolloProfesional/Rsu'
import BolsaDeTrabajo from './page/DesarrolloProfesional/BolsaTrabajo'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/homeCarrusel' element={<Home />} />
        <Route path='/desarrolloProfesional/pasantias' element={<Pasantias />} />
        <Route path='/desarrolloProfesional/rsu' element={<Rsu />} />
       <Route path='/desarrolloProfesional/bolsaDeTrabajo' element= {<BolsaDeTrabajo/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
