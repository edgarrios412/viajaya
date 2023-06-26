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
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "./redux/actions/actions"
import ProtectedRoute from "./components/utils/ProtectedRoute"

function App() {
  const dispatch = useDispatch()

  const verify = () => {
    const token = localStorage.getItem("token")
    alert(token)
    if(token == null) return false
    // axios.get(`/user/verify/${token}`).then(() => dispatch(setUser({...data.data, status:true})))
    return true
  }

  return (
    <>
    <Routes>

      <Route exact path="/login" element={<Login/>}/>

      <Route exact path="/profile" element={<ProfileAdmin/>}/>

      <Route exact path="/pay" element={<Pay/>}/>
      <Route exact path="/detail" element={<Detail/>}/>
      <Route exact path="/" element={<>
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
    </Routes>
    </>
  )
}

export default App
