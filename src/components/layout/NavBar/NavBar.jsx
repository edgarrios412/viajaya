import style from './NavBar.module.css'
import logo from "../../../assets/logo.jpg" 
import {Link} from "react-scroll"
import {useNavigate} from 'react-router-dom'


const NavBar = () => {
  const navigate = useNavigate()
  return(
    <nav className={style.nav}>
      <Link to="home" smooth={true} duration={500}><img className={style.logo} src={logo}/></Link>
      <ul className={style.ul}>
      <Link to="home" smooth={true} duration={500}><li className={style.li}>Inicio</li></Link>
        <Link to="nosotros" smooth={true} duration={500}><li className={style.li}>Quienes somos</li></Link>
        <Link to="proyectos" smooth={true} duration={500}><li className={style.li}>Paquetes</li></Link>
        <Link to="servicios" smooth={true} duration={500}><li className={style.li}>Destinos</li></Link>
        <Link to="clientes" smooth={true} duration={500}><li className={style.li}>Aliados</li></Link>
        <Link to="contactanos" smooth={true} duration={500}><li className={style.li}>Trabaja con nosotros</li></Link>
        <li className={style.libutton} onClick={() => navigate("/login")}>Ingresar</li>
      </ul>
    </nav>
  )
};

export default NavBar