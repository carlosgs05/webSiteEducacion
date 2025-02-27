import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './page/HomeCarrusel/Home'
import Index from './page/Index'
import DesarrolloProfesional from './page/DesarrolloProfesional/DesarrolloProfesional'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/homeCarrusel' element={<Home />} />
        <Route path='/desarrolloProfesional' element={<DesarrolloProfesional />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
