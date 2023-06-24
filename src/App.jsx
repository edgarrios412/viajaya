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
import ProfileAdmin from "./components/pages/ProfileAdmin/Profile"
import Detail from "./components/pages/Detail/Detail"
import Pay from "./components/pages/Pay/Pay"
import { useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setUser } from "./redux/actions/actions"
import Map from "./components/layout/Map/Map"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`/user/verify/${localStorage.getItem("token")}`).then(data => dispatch(setUser({...data.data, status:true})))
  },[])

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
      <Route path="/profile" element={<ProfileAdmin/>}/>
      <Route path="/pay" element={<Pay/>}/>
      <Route path="/detail" element={<Detail/>}/>
      <Route path="/mapa" element={<Map/>}/>
    </Routes>
    </>
  )
}

export default App
