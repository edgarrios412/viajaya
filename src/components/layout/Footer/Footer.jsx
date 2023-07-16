import style from './Footer.module.css'
import {AiOutlineWhatsApp} from "react-icons/ai"
import {BiLogoFacebookCircle} from "react-icons/bi"
import {FiInstagram} from "react-icons/fi"
 
const Footer = () => {
  return(
    <footer className={style.footer}>
      <div className={style.footerContent}>
      <a className={style.noLink} href="https://www.codeandcoffee.tech" target="_blank"><h5 className={style.createdBy}>Hecho con ☕ por Code & Coffee</h5></a>
      <div className={style.redes}>
        <a className={style.noLink} href="https://wa.link/25yphy" target="_blank"><div className={style.facebook}><AiOutlineWhatsApp className={style.icons} /></div></a>
        <a className={style.noLink} href="https://www.facebook.com/oficialviajaya/" target="_blank"><div className={style.facebook}><BiLogoFacebookCircle className={style.icons}/></div></a>
        <a className={style.noLink} href="https://www.instagram.com/viajaya_pagina_oficial/" target="_blank"><div className={style.facebook}><FiInstagram className={style.icons}/></div></a>
      </div>
      </div>
    </footer>
  )
};

export default Footer