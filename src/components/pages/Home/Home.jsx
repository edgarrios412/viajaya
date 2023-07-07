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
        <h2 className={style.nombre2}>Somos operador turístico y agencias de viajes ViajaYa con RNT 122035 el canal intermediario que facilita la compra y reserva de vacaciones programadas entre los viajeros y proveedores por medio de plataformas digitales, convenios directos, asesores externos profesionales; resaltando la cultura de los destinos empaquetando {"("}Alojamiento, vuelos, transportes y receptivos{")"} entregando planes turísticos con información verídica cumpliendo con las normas vigentes del turismo</h2>
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