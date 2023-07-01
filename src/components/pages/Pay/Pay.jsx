import ShortNav from '../../layout/ShortNav/ShortNav';
import style from './Pay.module.css'
import {Link} from "react-router-dom"
import {MdBusAlert, MdPayment} from "react-icons/md"
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import {Toaster, toast} from "react-hot-toast" 
import dayjs from "dayjs"
import {Navigate} from "react-router-dom"

const Pay = () => {

  const [pack, setPack] = useState()

  const dataPay = JSON.parse(localStorage.getItem("pay"))
  const [user,setUser]= useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`/pack/${dataPay?.id}`).then(data => setPack(data.data))
    axios.get(`/user/verify/${localStorage.getItem("token")}`).then(data => {setUser(data.data); setTimeout(() => {
      setLoading(false)
    }, 500)})
  },[])

  if(localStorage.getItem("token") == null){
    return <Navigate to="/login" replace />
}

  const pay = () => {
    const total = `${dataPay?.person*pack?.price}00`
    var checkout = new WidgetCheckout({
      currency: 'COP',
      amountInCents: total,
      reference: new Date().getTime().toString(),
      publicKey: 'pub_test_w28dxS2v9clmkb8UbFrlkw3GxBUx3bsq',
    })
    checkout.open(function ( result ) {
      var transaction = result.transaction
      console.log('Transaction ID: ', transaction.id)
      console.log('Transaction object: ', transaction)
      axios.post("/buy",{
        userId:user.id,
        packId:pack.id,
        person: dataPay.person,
        inicio:dataPay.inicio,
        fin:dataPay.fin,
        comprado: dayjs().format('YYYY-MM-DD'),
      })
      if(transaction.status == "APPROVED") return toast.success("Compra exitosa")
    })
  }

  const passengers = Array.from({ length: dataPay?.person }, (_, index) => (
    <><p className={style.passenger}>Pasajero {index+1}</p>
    <form className={style.form}>
      <input className={style.inputForm} placeholder="Nombre completo"/>
      <input className={style.inputForm} placeholder="Documento"/>
      <input className={style.inputForm} placeholder="Telefono"/>
      <input className={style.inputForm} placeholder="Email"/>
    </form></>))

  const img = "https://img.freepik.com/fotos-premium/impresionante-fondo-playa-verano-paisaje-al-atardecer-formato-cuadrado-banner-icono-pareja-luna-miel_663265-6789.jpg?w=2000"
  return(
    <>
    <ShortNav/>
    <Toaster/>
    {loading ? <div className={style.ldsellipsis}><div></div><div></div><div></div><div></div></div> :
    <div className={style.detailContainer}>
        <div className={style.detailPay}>
            <div className={style.datosComprador}>
              <h2 className={style.title}>Revisa y confirma tu compra</h2>
              {passengers}
            </div>
            <div className={style.resumenCompra}>
              <p className={style.resume}>Resumen de la compra</p>
              <div className={style.details}>
              <img src={img} className={style.imgProduct}/>
              <div>
              <b>Santa Marta</b>
              <p style={{margin:"3px 0px"}}>13 nov 2023</p>
              <p style={{margin:"3px 0px"}}>{dataPay?.person} personas</p>
              <p className={style.price}>${pack?.price} p/p</p>
              </div>
              </div>
              <p className={style.subtotal}>Subtotal: <b>${dataPay?.person*pack?.price}</b></p>
              <div className={style.buttons}>
                <button className={style.button} onClick={pay}><MdPayment className={style.payIcon}/> Pagar ahora</button>
                <Link to="/"><button style={{width:"200px"}} className={style.button}>Seguir comprando</button></Link>
              </div>
            </div>
        </div>
      </div>}
      </>
  )
};

export default Pay