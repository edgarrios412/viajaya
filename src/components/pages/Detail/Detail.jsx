import { useEffect, useState } from 'react';
import Modal from '../../layout/Modal/Modal';
import style from './Detail.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ShortNav from '../../layout/ShortNav/ShortNav';
import axios from 'axios';
import {toast, Toaster} from "react-hot-toast"
import "flatpickr/dist/themes/light.css";
import Flatpickr from "react-flatpickr";
import { Spanish } from "flatpickr/dist/l10n/es.js";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useDispatch } from 'react-redux';
import { setDataPay } from '../../../redux/actions/actions';

dayjs.locale("es");
 
const Detail = () => {
    const {id} = useParams()
    const [open, setOpen] = useState(false)
    const navigate= useNavigate()
    const [count, setCount] = useState(1)
    const [pack, setPack] = useState()
    const [img, setImg] = useState(0)
    const [disable, setDisable] = useState(["2023-06-10", "2023-06-11"]);
    const [dateFinal, setDateFinal] = useState()
    // const imgs = ["https://img.freepik.com/fotos-premium/impresionante-fondo-playa-verano-paisaje-al-atardecer-formato-cuadrado-banner-icono-pareja-luna-miel_663265-6789.jpg?w=2000","https://media.gettyimages.com/photos/tropical-beach-background-picture-id1145474071","https://img.freepik.com/fotos-premium/impresionante-fondo-playa-verano-paisaje-al-atardecer-formato-cuadrado-banner-icono-pareja-luna-miel_663265-6789.jpg?w=2000"]
  
    useEffect(() => {
      axios.get(`/pack/${id}`).then(data => setPack(data.data))
    },[])

    const [fecha, setFecha] = useState()
    const dispatch = useDispatch()

    const addCar = () => {
      setOpen(false);
      dispatch(setDataPay({id:pack?.id, person: count, inicio:fecha, fin:dateFinal}))
      toast.success("Agregado al carrito exitosamente")
    }

    const flatpickrOptions = {
      locale: Spanish,
      minDate: dayjs(new Date()).format("YYYY-MM-DD"),
      enableTime: false,
      disable: disable
    };

    const selectDate = (date) => {
      setFecha(dayjs(date).format("YYYY-MM-DD"))
      const fechaFinal = new Date(date);
      fechaFinal.setDate(fechaFinal.getDate() + pack?.days);
      setDateFinal(fechaFinal.toISOString().split('T')[0])
    }

    return(
    <>
    <ShortNav/>
    <Toaster/>
    {open && <Modal pay={() => navigate("/pay")}close={addCar}/>}
      <div className={style.detailContainer}>
        <div className={style.sliderImg}>
            <img src={pack?.images[0]} onClick={() => setImg(0)} className={style.img}></img>
            <img src={pack?.images[1]} onClick={() => setImg(1)} className={style.img}></img>
            <img src={pack?.images[2]} onClick={() => setImg(2)} className={style.img}></img>
        </div>
        <img src={pack?.images[img]} className={style.bigImg}></img>
        <div className={style.detail}>
            <h2 className={style.title}>{pack?.title}</h2>
            <p className={style.location}>Hotel maracana - Todo incluido</p>
            <b className={style.price}>$1.400.000 p/p</b> <span className={style.more} onClick={() => count > 1 ? setCount(count-1) : ""}>-</span><span className={style.cantidad}>{count}</span><span className={style.more} onClick={() => setCount(count+1)}>+</span>
            <Flatpickr
          value={fecha}
          style={{ padding: "5px 15px", borderRadius: "10px", border: "none" }}
          options={flatpickrOptions}
          // ref={refCalendar}
          onChange={([date]) => selectDate(date)}
            />
            <p>{dateFinal}</p>
            <div className={style.tags}>
              {pack?.chars.map(c => <span className={style.tag}>{c.name}</span>)}
                  </div>
            <button onClick={() => setOpen(true)} className={style.addCar}>Agregar al carrito</button>
        </div>
      </div>
    </>
  )
};

export default Detail