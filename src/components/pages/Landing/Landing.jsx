// import style from './Landing.module.css'
 
import NavBar from "../../layout/NavBar/NavBar"
import Footer from "../../layout/Footer/Footer"
import Home from "../Home/Home"
import About from "../About/About"
import Paquetes from "../Paquetes/Paquetes"
import Destinos from "../Destinos/Destinos"
import Clients from "../Clients/Clients"
import Contact from "../Contact/Contact"
import Promo from "../Promo/Promo"

const Landing = () => {
  return(
    <>
      <NavBar/>
      <Home/>
      <Promo/>
      <About/>
      <Paquetes/>
      <Destinos/>
      <Clients/>
      <Contact/>
      <Footer/>
    </>
  )
};

export default Landing