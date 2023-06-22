import { useState } from 'react';
import Modal from '../../layout/Modal/Modal';
import style from './Detail.module.css'
import { Link, useNavigate } from 'react-router-dom';
import ShortNav from '../../layout/ShortNav/ShortNav';
 
const Detail = () => {
    const [open, setOpen] = useState(false)
    const navigate= useNavigate()
    const [count, setCount] = useState(1)
  return(
    <>
    <ShortNav/>
    {open && <Modal pay={() => navigate("/pay")}close={() => setOpen(false)}/>}
      <div className={style.detailContainer}>
        <div className={style.sliderImg}>
            <div className={style.img}></div>
            <div className={style.img}></div>
            <div className={style.img}></div>
        </div>
        <div className={style.bigImg}></div>
        <div className={style.detail}>
            <h2 className={style.title}>Santa Marta</h2>
            <p className={style.location}>Hotel maracana - Todo incluido</p>
            <b className={style.price}>$1.400.000 p/p</b> <span className={style.more} onClick={() => count > 1 ? setCount(count-1) : ""}>-</span><span className={style.cantidad}>{count}</span><span className={style.more} onClick={() => setCount(count+1)}>+</span>
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
      </div>
    </>
  )
};

export default Detail