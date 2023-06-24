import style from './Modal.module.css'
import Slider from 'react-slick';
 
const ModalProject = ({close, detail}) => {
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
        <h2 className={style.title}>TITULO</h2>
        <h5 className={style.cliente}>Precio</h5>
        <p className={style.desc}>{detail}</p>
        <Slider {...settings}>
        </Slider>
        <button className={style.button} onClick={close}>Cerrar</button>
      </div>
    </div>
    </>
  )
};

export default ModalProject