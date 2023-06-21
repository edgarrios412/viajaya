import style from './Modal.module.css'
 
const Modal = ({close, pay}) => {
  return(
    <>
    <div className={style.modalContainer}>
      <div className={style.modal}>
        <h2 className={style.title}>Infraestructura de Telecomunicaciones</h2>
        <p>•	Construcción de torres autosoportadas, riendadas y monopolos<br></br>
•	Construcción de mástiles autosportados en terrazas.<br></br>
•	Mantenimiento general de estructuras de elevación.<br></br>
•	Refuerzos estructurales en cimentaciones y estructura.<br></br>
</p>
<button className={style.button} onClick={pay}>Pagar ahora</button>
        <button className={style.button} onClick={close}>Cerrar</button>
      </div>
    </div>
    </>
  )
};

export default Modal