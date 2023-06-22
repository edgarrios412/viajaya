import ShortNav from '../../layout/ShortNav/ShortNav';
import style from './Pay.module.css'
import {Link} from "react-router-dom"
 
const Pay = () => {
  return(
    <>
    <ShortNav/>
    <div className={style.detailContainer}>
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
      </div>
      </>
  )
};

export default Pay