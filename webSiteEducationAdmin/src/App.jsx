import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './page/HomeCarrusel/Home'
import Index from './page/Index'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/homeCarrusel' element={<Home />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
