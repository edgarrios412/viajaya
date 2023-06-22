import NavBar from "./components/layout/NavBar/NavBar"
import Footer from "./components/layout/Footer/Footer"
import Home from "./components/pages/Home/Home"
import About from "./components/pages/About/About"
import Paquetes from "./components/pages/Paquetes/Paquetes"
import Destinos from "./components/pages/Destinos/Destinos"
import Clients from "./components/pages/Clients/Clients"
import Contact from "./components/pages/Contact/Contact"
import Promo from "./components/pages/Promo/Promo"
import { Route, Routes } from "react-router-dom"
import Login from "./components/pages/Login/Login"
import Profile from "./components/pages/Profile/Profile"
import ProfileAdmin from "./components/pages/ProfileAdmin/Profile"
import Detail from "./components/pages/Detail/Detail"

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<>
        <NavBar/>
      <Home/>
      <Promo/>
      <About/>
      <Paquetes/>
      <Destinos/>
      <Clients/>
      <Contact/>
      <Footer/>
      </>}/>
      <Route path="/login" element={<Login/>}/>
      {/* <Route path="/profile" element={<Profile/>}/> */}
      <Route path="/profile" element={<ProfileAdmin/>}/>
      <Route path="/detail" element={<Detail/>}/>
    </Routes>
    </>
  )
}

export default App
