import style from './About.module.css'
import {Element} from "react-scroll"
import { useInView } from 'react-intersection-observer';
import {motion} from "framer-motion"
import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';

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
        <div className={style.row}>
          <div className={style.column}>
          <img src="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png" className={style.video}/>
            <img src="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png" className={style.video}/>
          </div>
          <div className={style.column}>
          <img src="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png" className={style.video}/>
          <img src="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png" className={style.video}/>
          </div>
          <div className={style.column}>
            <img src="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png" className={style.video}/>
            <img src="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png" className={style.video}/>
          </div>
          <div className={style.column}>
            <img src="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png" className={style.video}/>
            <img src="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png" className={style.video}/>
          </div>
          <div className={style.column}>
          <img src="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png" className={style.video}/>
            <img src="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png" className={style.video}/>
          </div>
        </div>
      </div>
    </motion.div>
      </Element>
  )
};

export default About