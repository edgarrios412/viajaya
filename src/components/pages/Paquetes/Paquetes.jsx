import style from './Paquetes.module.css'
import {Element} from "react-scroll"
import ModalProject from '../../layout/ModalProject/ModalProject';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation, motion} from 'framer-motion';
import { useEffect } from 'react';

const Paquetes = () => {
  const [projectId, setProjectId] = useState(null)
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
    { projectId && <ModalProject id={projectId} close={() => setProjectId(null)}/>}
    <Element name="proyectos">
    <motion.div ref={ref} animate={animation} className={style.paquetes} id="proyectos">
      <h2 className={style.titleSection}>Paquetes</h2>
      <div className={style.container}>
        <div className={style.paquetesContainer}>
          <div className={style.paquete}>
          <div className={style.planTop}>
                <img className={style.imgPlan}/>
                <div className={style.planDetail}>
                  <div className={style.nameAndPrice}>
                    <b className={style.planName}>SANTA MARTA</b>
                    <b className={style.planPrice}>$1.400.000 p/p</b>
                  </div>
                  <p>Hotel maracana - Todo incluido</p>
                  <div className={style.tags}>
                    <span className={style.tag}>Estacionamiento</span>
                    <span className={style.tag}>Wifi</span>
                    <span className={style.tag}>Jacuzzi</span>
                    <span className={style.tag}>Estacionamiento</span>
                    <span className={style.tag}>Estacionamiento</span>
                    <span className={style.tag}>Wifi</span>
                    <span className={style.tag}>Jacuzzi</span>
                    <span className={style.tag}>Estacionamiento</span>
                  </div>
                </div>
              </div>
          </div>
          <div className={style.paquete}>
          <div className={style.planTop}>
                <img className={style.imgPlan}/>
                <div className={style.planDetail}>
                  <div className={style.nameAndPrice}>
                    <b className={style.planName}>SANTA MARTA</b>
                    <b className={style.planPrice}>$1.400.000 p/p</b>
                  </div>
                  <p>Hotel maracana - Todo incluido</p>
                  <div className={style.tags}>
                    <span className={style.tag}>Estacionamiento</span>
                    <span className={style.tag}>Wifi</span>
                    <span className={style.tag}>Jacuzzi</span>
                    <span className={style.tag}>Estacionamiento</span>
                    <span className={style.tag}>Estacionamiento</span>
                    <span className={style.tag}>Wifi</span>
                    <span className={style.tag}>Jacuzzi</span>
                    <span className={style.tag}>Estacionamiento</span>
                  </div>
                </div>
              </div>
          </div>
          <div className={style.paquete}>
          <div className={style.planTop}>
                <img className={style.imgPlan}/>
                <div className={style.planDetail}>
                  <div className={style.nameAndPrice}>
                    <b className={style.planName}>SANTA MARTA</b>
                    <b className={style.planPrice}>$1.400.000 p/p</b>
                  </div>
                  <p>Hotel maracana - Todo incluido</p>
                  <div className={style.tags}>
                    <span className={style.tag}>Estacionamiento</span>
                    <span className={style.tag}>Wifi</span>
                    <span className={style.tag}>Jacuzzi</span>
                    <span className={style.tag}>Estacionamiento</span>
                    <span className={style.tag}>Estacionamiento</span>
                    <span className={style.tag}>Wifi</span>
                    <span className={style.tag}>Jacuzzi</span>
                    <span className={style.tag}>Estacionamiento</span>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className={style.mapa}>
          ESTO ES UN MAPA
        </div>
      </div>
    </motion.div>
    </Element>
    </>
  )
};

export default Paquetes