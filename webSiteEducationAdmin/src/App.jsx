import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './page/HomeCarrusel/Home'
import Index from './page/Index'
import Pasantias from './page/DesarrolloProfesional/Pasantias'
import Rsu from './page/DesarrolloProfesional/Rsu'
import BolsaDeTrabajo from './page/DesarrolloProfesional/BolsaTrabajo'
import Documentos from './page/Documentos/Documentos'
import Noticias from './page/Noticias/Noticias'
import RegistroNoticias from './page/Noticias/RegistroNoticias'

import Autoridades from './page/Organizacion/Autoridades'
import PersonalDocente from './page/Organizacion/PersonalDocente'
import PersonalAdministrativo from './page/Organizacion/PersonalAdministrativo'
import MallaCurricular from './page/InformacionAcademica/MallaCurricular'
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Login from "./page/Login";
import ForgotPassword from "./components/ForgotPassword";
import Perfil from './page/Perfil/Perfil'
import ConfirmReset from './components/ConfirmReset'
import ValidateResetCode from './components/ValidateResetCode'
import ResetPassword from './components/ResetPassword'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="/confirm-reset" element={<PublicRoute><ConfirmReset /></PublicRoute>} />
        <Route path="/validate-code" element={<PublicRoute><ValidateResetCode /></PublicRoute>} />
        <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />
        <Route path="/inicio" element={<PrivateRoute><Index /></PrivateRoute>} />
        <Route path='/homeCarrusel' element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path='/organizacion/autoridades' element={<PrivateRoute><Autoridades /></PrivateRoute>} />
        <Route path='/organizacion/personalDocente' element={<PrivateRoute><PersonalDocente /></PrivateRoute>} />
        <Route path='/organizacion/personalAdministrativo' element={<PrivateRoute><PersonalAdministrativo /></PrivateRoute>} />
        <Route path='/desarrolloProfesional/pasantias' element={<PrivateRoute><Pasantias /></PrivateRoute>} />
        <Route path='/desarrolloProfesional/rsu' element={<PrivateRoute><Rsu /></PrivateRoute>} />
        <Route path='/desarrolloProfesional/bolsaDeTrabajo' element={<PrivateRoute><BolsaDeTrabajo /></PrivateRoute>} />
        <Route path='/documentos' element={<PrivateRoute><Documentos /></PrivateRoute>} />
        <Route path='/noticias' element={<PrivateRoute><Noticias /></PrivateRoute>} />
        <Route path='/noticias/registro' element={<PrivateRoute><RegistroNoticias /></PrivateRoute>} />
        <Route path='/noticias/editar/:id' element={<PrivateRoute><RegistroNoticias /></PrivateRoute>} />
        <Route path='/mallaCurricular' element={<PrivateRoute><MallaCurricular /></PrivateRoute>} />
        <Route path='/perfil' element={<PrivateRoute><Perfil /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
