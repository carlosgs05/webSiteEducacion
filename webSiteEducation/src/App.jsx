import Autoridades from './page/organizacion/Autoridades'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './page/home/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/organizacion/autoridades' element={<Autoridades />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
