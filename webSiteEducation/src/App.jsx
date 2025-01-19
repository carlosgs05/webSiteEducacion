import Organizacion from './page/organizacion/organizacion'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './page/home/Home'
import Perfiles from './page/InformacionAcademica/Perfiles'
import MallaCurricular from './page/InformacionAcademica/MallaCurricular'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/organizacion' element={<Organizacion />} />
        <Route path='/informacionAcademica/perfiles' element={<Perfiles />} />
        <Route path='/informacionAcademica/mallaCurricular' element={<MallaCurricular />} />


      </Routes>
    </BrowserRouter>
  )
}

export default App
