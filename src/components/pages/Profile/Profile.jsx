import { useState } from 'react';
import style from './Profile.module.css'
import { useNavigate } from 'react-router-dom';
 
const Profile = () => {
    const [page, setPage] = useState(0)
    const navigate = useNavigate()
  return(
    <div className={style.profileContainer}>
      <nav className={style.nav}>
        <h3 className={style.title}>Mi perfil</h3>
        <ul className={style.ul}>
        <li onClick={() => setPage(0)} className={style.li}>Información</li>
        <li onClick={() => setPage(1)} className={style.li}>Mis compras</li>
        <li onClick={() => navigate("/")} className={style.li}>Salir</li>
        </ul>
      </nav>
      { page == 0 && <div className={style.view}>
        <div className={style.profile}>
            <img className={style.imgProfile} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkzpwts1u7OsADocIJpyR-PAoLVHYLfGuU9gwHobM&s">
            </img>
            <div className={style.profileDetail}>
                <p className={style.profileName}>Edgar Vilchez</p>
                <p className={style.profileEmail}>edgarrios412@gmail.com</p>
            </div>
        </div>
        <div className={style.editProfile}>
            <form className={style.form}>
                <div className={style.divisor}>
                <input className={style.input} placeholder="Nombre"/>
                <input className={style.input} placeholder="Apellido"/>
                </div>
                <div className={style.divisor}>
                <input className={style.input} placeholder="Email"/>
                <input className={style.input} placeholder="Telefono"/>
                </div>
                <div className={style.buttons}>
                    <button className={style.button}>Guardar</button>
                    <button className={style.button}>Cambiar contraseña</button>
                </div>
            </form>
        </div>
      </div>}
      { page == 1 && <div className={style.view}>
        <div className={style.planContainer}>
            <div className={style.plan}></div>
            <div className={style.plan}></div>
            <div className={style.plan}></div>
        </div>
      </div>}
    </div>
  )
};

export default Profile