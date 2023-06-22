import style from './Promo.module.css'
import {Element} from "react-scroll"
import { useInView } from 'react-intersection-observer';
import {motion} from "framer-motion"
import { useEffect, useState } from 'react';
import { useAnimation } from 'framer-motion';
import img from "../../../assets/promo.jpg"
import ModalProject from '../../layout/ModalProject/ModalProject';

const Promo = () => {

  const {ref, inView} = useInView({
    threshold:0.05
  })
  const animation = useAnimation()
  const [modal, setModal] = useState(false)
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
    <Element name="nosotros">
      {modal && <ModalProject close={() => setModal(false)}/>}
    <motion.div animate={animation} ref={ref} className={style.Promo} id="nosotros">
      <div className={style.PromoContainer}>
        <h4 className={style.desc}>
            <h2 className={style.titleSection}>Promocion ya pa ya</h2>
            <div className={style.buttonContainer}>
            <button className={style.button} onClick={() => setModal(true)}>Detalles</button>
            <button className={style.button}>Reservar ahora</button>
            </div>
        </h4>
        <img src={img} className={style.img}/>
      </div>
    </motion.div>
      </Element>
  )
};

export default Promo