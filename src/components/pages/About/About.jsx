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
          <img src="https://i.pinimg.com/550x/74/bb/34/74bb340ffe87e31837a04a538f1bbc10.jpg" className={style.video}/>
            <img src="https://i.pinimg.com/474x/e2/e8/9e/e2e89eb6dd581f7f0a8a05a13675f4d4.jpg" className={style.video}/>
            <img src="https://preview.redd.it/pasen-im%C3%A1genes-randoms-me-siento-solo-v0-9xaz3bhzvcca1.jpg?width=640&crop=smart&auto=webp&s=b1980eca2ee84b9badcaadde871b2eb8348e85f8" className={style.video}/>
          </div>
          <div className={style.column}>
          <img src="https://pm1.aminoapps.com/6877/fc650d83deeef454bce12f3d4a3ff4081efd4a08r1-480-471v2_hq.jpg" className={style.video}/>
          <img src="https://i.pinimg.com/originals/c7/83/1a/c7831a6d0dcaf89cab0766d785a1919c.jpg" className={style.video}/>
            <img src="https://img.wattpad.com/c36d6f3cc073f4d9f51e678f3b6ea5d9f14e4453/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f423147515a6c5f5557364e7046673d3d2d313230343033363236312e313664636464613432323239396564333532323735323438383637352e6a7067?s=fit&w=720&h=720" className={style.video}/>
          </div>
          <div className={style.column}>
            <img src="https://i.pinimg.com/originals/b6/07/1a/b6071aac7a563dcf7b3ca75169a02fc0.jpg" className={style.video}/>
            <img src="https://i.pinimg.com/474x/46/b4/0b/46b40b4eb85e98ffabac7ed002a1f6c0.jpg" className={style.video}/>
            <img src="https://www.mundodeportivo.com/alfabeta/hero/2022/03/brawl-stars-Bad-Randoms-en-Beatstar.jpg?width=1200" className={style.video}/>
          </div>
          <div className={style.column}>
            <img src="https://i.pinimg.com/originals/b6/07/1a/b6071aac7a563dcf7b3ca75169a02fc0.jpg" className={style.video}/>
            <img src="https://i.pinimg.com/474x/46/b4/0b/46b40b4eb85e98ffabac7ed002a1f6c0.jpg" className={style.video}/>
            <img src="https://www.mundodeportivo.com/alfabeta/hero/2022/03/brawl-stars-Bad-Randoms-en-Beatstar.jpg?width=1200" className={style.video}/>
          </div>
          <div className={style.column}>
          <img src="https://i.pinimg.com/550x/74/bb/34/74bb340ffe87e31837a04a538f1bbc10.jpg" className={style.video}/>
            <img src="https://i.pinimg.com/474x/e2/e8/9e/e2e89eb6dd581f7f0a8a05a13675f4d4.jpg" className={style.video}/>
            <img src="https://preview.redd.it/pasen-im%C3%A1genes-randoms-me-siento-solo-v0-9xaz3bhzvcca1.jpg?width=640&crop=smart&auto=webp&s=b1980eca2ee84b9badcaadde871b2eb8348e85f8" className={style.video}/>
          </div>
        </div>
      </div>
    </motion.div>
      </Element>
  )
};

export default About