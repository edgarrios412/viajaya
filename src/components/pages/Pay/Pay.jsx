import ShortNav from '../../layout/ShortNav/ShortNav';
import style from './Pay.module.css'
import {Link} from "react-router-dom"
import {MdPayment} from "react-icons/md"
 
const Pay = () => {
  const img = "https://img.freepik.com/fotos-premium/impresionante-fondo-playa-verano-paisaje-al-atardecer-formato-cuadrado-banner-icono-pareja-luna-miel_663265-6789.jpg?w=2000"
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
              <img src={img} className={style.imgProduct}/>
              <div>
              <b>Santa Marta</b>
              <p style={{margin:"3px 0px"}}>13 nov 2023</p>
              <p style={{margin:"3px 0px"}}>2 personas</p>
              <p className={style.price}>1.450.000 p/p</p>
              </div>
              </div>
              <p className={style.subtotal}>Subtotal: <b>$2.900.000</b></p>
              <div className={style.buttons}>
                <button className={style.button}><MdPayment className={style.payIcon}/> Pagar ahora</button>
                <Link to="/"><button style={{width:"200px"}} className={style.button}>Seguir comprando</button></Link>
              </div>
            </div>
        </div>
      </div>
      </>
  )
};

export default Pay