import { useState } from 'react';
import Modal from '../../layout/Modal/Modal';
import style from './Detail.module.css'
import { Link } from 'react-router-dom';
 
const Detail = () => {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState(0)
  return(
    <>
    {open && <Modal pay={() => {setStep(1);setOpen(false)}}close={() => setOpen(false)}/>}
      { step == 0 && <div className={style.detailContainer}>
        <div className={style.sliderImg}>
            <div className={style.img}></div>
            <div className={style.img}></div>
            <div className={style.img}></div>
        </div>
        <div className={style.bigImg}></div>
        <div className={style.detail}>
            <h2 className={style.title}>Santa Marta</h2>
            <p className={style.location}>Hotel maracana - Todo incluido</p>
            <span className={style.precio}>Precio</span> <span className={style.cantidad}>1</span>
            <p className={style.fecha}>13-12-2023   14-04-2023</p>
            <p className={style.fecha}>13-12-2023   14-04-2023</p>
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
            <button onClick={() => setOpen(true)} className={style.addCar}>Agregar al carrito</button>
        </div>
      </div>}
      { step == 1 && <div className={style.detailContainer}>
        <div className={style.detailPay}>
            <div className={style.datosComprador}>
              <h2 className={style.title}>Revisa y confirma tu compra</h2>
              <p className={style.passenger}>Pasajero 1</p>
              <form className={style.form}>
                <input className={style.inputForm} placeholder="Nombre completo"/>
                <input className={style.inputForm} placeholder="Documento"/>
                <input className={style.inputForm} placeholder="Telefono"/>
                <input className={style.inputForm} placeholder="Email"/>
              </form>
            </div>
            <div className={style.resumenCompra}>
              <p className={style.resume}>Resumen de la compra</p>
              <div className={style.details}>

              </div>
              <div className={style.buttons}>
                <button className={style.button}>Pagar ahora</button>
                <Link to="/"><button style={{width:"200px"}} className={style.button}>Seguir comprando</button></Link>
              </div>
            </div>
        </div>
      </div>}
    </>
  )
};

export default Detail