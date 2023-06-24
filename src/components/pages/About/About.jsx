import style from './About.module.css'
import {Element} from "react-scroll"
import { useInView } from 'react-intersection-observer';
import {motion} from "framer-motion"
import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import v1 from "../../../assets/v1.mp4"
import v2 from "../../../assets/v2.mp4"
import v3 from "../../../assets/v3.mp4"

const About = () => {

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
    <Element name="nosotros">
    <motion.div animate={animation} ref={ref} className={style.about} id="nosotros">
      <h2 className={style.titleSection}>Quienes somos</h2>
      <div className={style.aboutContainer}>
        {/* <h4 className={style.desc}>VIDEOS</h4> */}
        {/* <div className={style.row}>
          <div className={style.column}>
          <video src={v2} className={style.video}/>
            <video src={v1} className={style.video}/>
            <video src={v2} className={style.video}/>
            <video src={v3} className={style.video}/>
          </div>
          <div className={style.column}>
          <video src={v3} className={style.video}/>
          <video src={v1} className={style.video}/>
            <video src={v2} className={style.video}/>
          </div>
          <div className={style.column}>
            <video src={v3} className={style.video}/>
            <video src={v2} className={style.video}/>
            <video src={v1} className={style.video}/>
          </div>
        </div> */}
      </div>
    </motion.div>
      </Element>
  )
};

export default About