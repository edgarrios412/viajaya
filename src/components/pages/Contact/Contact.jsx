import style from './Contact.module.css'
import {FiMail, FiPhone} from "react-icons/fi"
import {Element} from "react-scroll" 
import { Toaster, toast } from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';
import { useAnimation,motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Contact = () => {
  
  const [contact, setContact] = useState()

  const {ref, inView} = useInView({
    // threshold:0.1
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

  const changeContact = (e) => {
    setContact({
      ...contact,
      [e.target.name] : e.target.value
    })
  }

  const sendMail = (e) => {
    e.preventDefault()
    axios.post("/user/contact", contact).then((data) => toast.success(data.data.message))
  }

  return(
  <Element name="contactanos">
    <Toaster></Toaster>
    <motion.div ref={ref} animate={animation} className={style.contact} id="contactanos">
      <h2 className={style.titleSection}>Trabaja con nosotros</h2>
      <div className={style.contactContainer}>
        <div className={style.infoContacto}>
          <h2 className={style.subtitleSection}>Informacion de contacto</h2>
          <div className={style.correos}>
        <div>
          <FiMail className={style.icon}/>
        </div>
        <div className={style.emails}>
          <h4 className={style.email}>EMAIL1</h4>
          <h4 className={style.email}>EMAIL2</h4>
        </div>
        </div>
        <div className={style.correos}>
        <div>
        <FiPhone className={style.icon}/>
        </div>
        <div className={style.numbers}>
          <a className={style.noLink} target="_blank" href="https://bit.ly/3IY4PGk"><h4 className={style.number}>{"(+57)"} NUMBER1</h4></a>
          <a className={style.noLink} target="_blank" href="https://bit.ly/3MQvqXe"><h4 className={style.number}>{"(+57)"} NUMBER2</h4></a>
        </div>
        </div>
        <div className={style.mapouter}>
          <div className={style.gmap_canvas}>
          <iframe width="100%" height="100%" id="gmap_canvas" src="https://maps.google.com/maps?q=Calle 42 numero 5118 Villavicencio&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
          </div>
        </div>
        </div>
        <form className={style.formContacto}>
          <div className={style.divisores}>
          <input className={style.input} onChange={changeContact} value={contact?.name} name="name" placeholder="Nombre"/>
          <input className={style.input} onChange={changeContact} value={contact?.phone} name="phone" placeholder="Telefono"/>
          </div>
          <div className={style.divisores}>
          <input className={style.input} onChange={changeContact} value={contact?.mail} name="mail" placeholder="Correo"/>
          <input className={style.input} onChange={changeContact} value={contact?.subject} name="subject" placeholder="Asunto"/>
          </div>
          <textarea className={style.inputsms} onChange={changeContact} value={contact?.message} name="message" placeholder="Mensaje"/>
          <button onClick={sendMail} className={style.button}>Enviar</button>
        </form>
      </div>
    </motion.div>
    </Element>
  )
};

export default Contact