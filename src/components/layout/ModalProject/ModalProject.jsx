import style from './Modal.module.css'
import Slider from 'react-slick';
 
const ModalProject = ({close, id}) => {
  const settings = {
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    style:{
      margin:"15px 50px",
    }
  };
  return(
    <>
    <div className={style.modalContainer}>
      <div className={style.modal}>
        <h2 className={style.title}>TORRE AUTOSOPORTADA DE 60 M</h2>
        <h5 className={style.cliente}>Cliente: JCP - TIGO</h5>
        <p className={style.desc}> Construcción de RBS con torre triangular de 60m, cimentación, montaje y pintura de torre, sistema de puesta a tierra, cerramiento en malla eslabonada de 18x12m, acabado final, muro de contención, estabilización de taludes norte y laterales, cunetas. 
        <br></br><b>Ubicación: El Castillo - Meta</b></p>
        <Slider {...settings}>
        </Slider>
        <button className={style.button} onClick={close}>Cerrar</button>
      </div>
    </div>
    </>
  )
};

export default ModalProject