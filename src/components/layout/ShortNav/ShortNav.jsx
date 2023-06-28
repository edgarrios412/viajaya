import style from './ShortNav.module.css'
import {BsCart4} from "react-icons/bs" 
import {FaRegUserCircle} from "react-icons/fa"
import { Link } from 'react-router-dom';

const ShortNav = () => {
  return(
    <nav className={style.nav}>
      <Link to="/">Inicio</Link>
      <Link to="/pay"><BsCart4 className={style.car}/></Link>
      <Link to="/profile">
      <div className={style.profile}>
      <FaRegUserCircle className={style.user}/>
      <span className={style.nameUser}>Edgar</span>
      </div>
      </Link>
    </nav>
  )
};

export default ShortNav