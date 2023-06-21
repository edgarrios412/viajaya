import { useState } from 'react';
import Modal from '../../layout/Modal/Modal';
import style from './Detail.module.css'
 
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
                <div className={style.tag}></div>
            </div>
            <button onClick={() => setOpen(true)} className={style.addCar}>Agregar al carrito</button>
        </div>
      </div>}
      { step == 1 && <div className={style.detailContainer}>
        <div className={style.detailPay}>
            Detalles del pago
        </div>
      </div>}
    </>
  )
};

export default Detail