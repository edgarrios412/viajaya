import style from './Clients.module.css'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from "../../../assets/logo.jpg"
import {Element} from "react-scroll"
import { useInView } from 'react-intersection-observer';
import { useAnimation, motion } from 'framer-motion';
import { useEffect } from 'react';
import cliente1 from "../../../assets/cliente1.mp4"
 
const Clients = () => {

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


  const settings = {
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    style:{
      margin:"0px 100px",
    }
  }
  if (window.innerWidth < 550) {
    settings.slidesToShow = 1;
  }
  else if (window.innerWidth < 750) {
    settings.slidesToShow = 2;
  } else if (window.innerWidth < 1200) {
    settings.slidesToShow = 3;
  } else if (window.innerWidth > 1200) {
    settings.slidesToShow = 4;
  }


  return(
    <Element name="clientes">
    <motion.div animate={animation} ref={ref} className={style.clients} id="clientes">
      <h2 className={style.titleSection}>Nuestros aliados</h2>
        <Slider key={Math.random()} {...settings}>
        <div className={style.client}>
          <img src={logo} className={style.img}></img>
        </div>
        <div className={style.client}>
        <img src={logo} className={style.img}></img>
        </div>
        <div className={style.client}>
        <img src={logo} className={style.img}></img>
        </div>
        <div className={style.client}>
        <img src={logo} className={style.img}></img>
        </div>
        </Slider>

      <div>
        <h3 className={style.titleSection}>Clientes felices</h3>
        <div className={style.valores}>
          <div className={style.valor}><video className={style.imgValores} src={cliente1}></video></div>
          <div className={style.valor}><video className={style.imgValores} src={cliente1}></video></div>
          <div className={style.valor}><video className={style.imgValores} src={cliente1}></video></div>
          <div className={style.valor}><video className={style.imgValores} src={cliente1}></video></div>
        </div>
      </div>
    </motion.div>
    </Element>
  )
};

export default Clients