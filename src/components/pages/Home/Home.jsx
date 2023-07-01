import style from './Home.module.css'
import {Element} from "react-scroll" 
import video from "../../../assets/vf.mp4"
import { Link } from "react-scroll";

const Home = () => {
  return(
    <Element name="home">
    <div className={style.home} id="home">
      {/* <div className={style.pantalla}>
        <img className={style.imgfondo}src={fondo}/>
      </div> */}
      <div className={style.videoContainer}>
    <video autoPlay muted loop className={style.video} src={video}/>
    </div>
      <div className={style.nombre}>
        <h1 className={style.nombre1}>Planeemos juntos tus proximas vacaciones</h1>
        <h2 className={style.nombre2}>Somos un facilitador de servicios para viajeros mediante las diferentes plataformas y alianzas comerciales que adquirimos para ampliar nuestro portafolio de servicio así buscando la mejor opción, relacionando en calidad y precio para cada reserva, colocando nuestra experiencia, más de 15 años y rigiéndonos por nuestros pilares corporativos.!</h2>
        <Link to="proyectos" smooth={true} duration={500}><button className={style.button}>Reservar ahora</button></Link>
      </div>
      {/* <div className={style.videosContainer}>
        <video src={v1} className={style.videos}></video>
        <video src={v2} className={style.videos}></video>
        <video src={v3} className={style.videos}></video>
      </div> */}
    </div>
    </Element>
  )
};

export default Home