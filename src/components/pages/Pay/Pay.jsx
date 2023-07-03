import ShortNav from '../../layout/ShortNav/ShortNav';
import style from './Pay.module.css'
import {Link, useNavigate} from "react-router-dom"
import {MdBusAlert, MdPayment} from "react-icons/md"
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import {Toaster, toast} from "react-hot-toast" 
import dayjs from "dayjs"
import {Navigate} from "react-router-dom"

const Pay = () => {

  const [passenger, setPassenger] = useState()
  const [pack, setPack] = useState()
  const refe = new Date().getTime().toString()
  const dataPay = JSON.parse(localStorage.getItem("pay"))
  const [user,setUser]= useState()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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
      reference: refe,
      publicKey: 'pub_test_w28dxS2v9clmkb8UbFrlkw3GxBUx3bsq',
    })
    checkout.open(function ( result ) {
      var transaction = result.transaction
      if(transaction.status == "APPROVED"){
        toast.success("Compra exitosa")
        axios.post("/buy",{
          transaction: transaction,
          userId:user.id,
          packId:pack.id,
          person: dataPay.person,
          inicio:dataPay.inicio,
          fin:dataPay.fin,
          email: user.email,
          passenger: passenger,
          comprado: dayjs().format('YYYY-MM-DD'),
        })
        // TODO: ENVIAR COMPROBANTE Y DATOS DE LOS PASAJEROS AL CORREO DE VIAJAYA
        setTimeout(() => {
          navigate("/profile")
        },2000)
      }else{
        toast.error("No pudimos realizar el pago")
      }
    })
  }

  const handlePassengers = (e) => {
    setPassenger({
      ...passenger,
      [e.target.name] : e.target.value
    })
  }

  const passengers = Array.from({ length: dataPay?.person }, (_, index) => (
    <><p className={style.passenger}>Pasajero {index+1}</p>
    <form className={style.form}>
      <input className={style.inputForm} name={`name${index+1}`} value={passenger && passenger[`name${index+1}`]} onChange={handlePassengers} placeholder="Nombre completo"/>
      <input className={style.inputForm} name={`doc${index+1}`} value={passenger &&passenger[`doc${index+1}`]} onChange={handlePassengers} placeholder="Documento"/>
      <input className={style.inputForm} name={`phone${index+1}`} value={passenger &&passenger[`phone${index+1}`]} onChange={handlePassengers} placeholder="Telefono"/>
      <input className={style.inputForm} name={`mail${index+1}`} value={passenger &&passenger[`mail${index+1}`]} onChange={handlePassengers} placeholder="Email"/>
    </form></>))

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
              <img src={pack?.images[0]} className={style.imgProduct}/>
              <div>
              <b>{pack?.title}</b>
              <p style={{margin:"3px 0px"}}>{dataPay?.inicio}</p>
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