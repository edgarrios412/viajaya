import style from './Contact.module.css'
import {FiMail, FiPhone} from "react-icons/fi"
import {Element} from "react-scroll" 
import { useForm, ValidationError } from '@formspree/react';
import { Toaster, toast } from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';
import { useAnimation,motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRef } from 'react';


const Contact = () => {
  const [state, handleSubmit] = useForm("mdovrwop");
  const rname = useRef()
  const rservice = useRef()
  const rmail = useRef()
  const rtel = useRef()
  const rmsg = useRef()
  if (state.succeeded) {
      toast.success("Email enviado satisfactoriamente");
      rtel.current.value = ""
    rmsg.current.value = ""
    rservice.current.value = ""
    rname.current.value = ""
    rmail.current.value = ""
  }


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
          <h4 className={style.email}>camilo.prieto@pryval.com</h4>
          <h4 className={style.email}>elena.valderrama@pryval.com</h4>
        </div>
        </div>
        <div className={style.correos}>
        <div>
        <FiPhone className={style.icon}/>
        </div>
        <div className={style.numbers}>
          <a className={style.noLink} target="_blank" href="https://bit.ly/3IY4PGk"><h4 className={style.number}>{"(+57)"} 301 388 2960 </h4></a>
          <a className={style.noLink} target="_blank" href="https://bit.ly/3MQvqXe"><h4 className={style.number}>{"(+57)"} 301 340 9922</h4></a>
        </div>
        </div>
        <div className={style.mapouter}>
          <div className={style.gmap_canvas}>
          <iframe width="100%" height="100%" id="gmap_canvas" src="https://maps.google.com/maps?q=Calle 42 numero 5118 Villavicencio&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
          </div>
        </div>
        </div>
        <form onSubmit={handleSubmit} method="POST" className={style.formContacto}>
          <div className={style.divisores}>
          <input className={style.input} ref={rname} name="nombre" placeholder="Nombre"/>
          <input className={style.input} ref={rtel} name="telefono" placeholder="Telefono"/>
          </div>
          <div className={style.divisores}>
          <input className={style.input} ref={rmail} name="correo" placeholder="Correo"/>
          <input className={style.input} ref={rservice} name="servicio" placeholder="Tipo de servicio que require"/>
          </div>
          <textarea className={style.inputsms} ref={rmsg} name="mensaje" placeholder="Mensaje"/>
          <button type="submit" className={style.button}>Enviar</button>
        </form>
      </div>
    </motion.div>
    </Element>
  )
};

export default Contact