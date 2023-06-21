import style from './Destinos.module.css'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Element} from "react-scroll"
import { useState } from 'react';
import Modal from '../../layout/Modal/Modal';
import { useInView } from 'react-intersection-observer';
import { useAnimation,motion } from 'framer-motion';
import { useEffect } from 'react';
import video from "../../../assets/video.mp4"
import video2 from "../../../assets/video2.mp4"
import video3 from "../../../assets/video3.mp4"
 
const Destinos = () => {

  const [serviceId, setServiceId] = useState(null)


  const settings = {
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    style:{
      margin:"0px 100px",
    }
  };
  const {ref, inView} = useInView({
    threshold:0.05
  })
  const animation = useAnimation()

  useEffect(() => {
    if(inView){
      animation.start({
        opacity:1,
        transition:{
          type: "spring",
          duration:1,
          bounce:0.3
        }
      })
    }else{
      animation.start({
        opacity:0
      })
    }
  },[inView])

  return(
    <>
    { serviceId && <Modal id={serviceId} close={() => setServiceId(null)}/>}
    <Element name="servicios">
    <motion.div animate={animation} ref={ref} className={style.services} id="servicios">
      <div className={style.header}>
      <h2 className={style.titleSection}>Destinos</h2>
      <button className={style.button2}>Hablar con un asesor</button>
      </div>
      <div className={style.servicesContainer}>
        <div onClick={() => setServiceId(1)} className={style.service}>
          <video src={video} className={style.img}/>
          {/* <h3 className={style.title}>Infraestructura de Telecomunicaciones</h3> */}
          <button className={style.button}>Nacionales</button>
        </div>
        <div onClick={() => setServiceId(2)} className={style.service}>
          <video src={video2} className={style.img}/>
          {/* <h3 className={style.title}>Ingeniería Civil y Construcción</h3> */}
          <button className={style.button}>Internacionales</button>
        </div>
        <div onClick={() => setServiceId(3)} className={style.service}>
          <video src={video3} className={style.img}/>
          {/* <h3 className={style.title}>Mantenimientos Preventivos y Correctivos</h3> */}
          <button className={style.button}>Cruceros</button>
        </div>
        </div>
    </motion.div>
    </Element>
    </>
  )
};

export default Destinos