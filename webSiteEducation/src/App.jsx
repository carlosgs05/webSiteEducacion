import Organizacion from './page/organizacion/organizacion'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './page/home/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/organizacion' element={<Organizacion />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
