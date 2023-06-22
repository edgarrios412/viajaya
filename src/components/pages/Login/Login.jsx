import { useState } from 'react';
import style from './Login.module.css'
import { Link } from 'react-router-dom';
 
const Login = () => {
    const [login, setLogin] = useState(true)
  return(
    <div className={style.login}>
        {login ? <div className={style.loginContainer}>
            <h2 className={style.title}>Iniciar sesion</h2>
            <form className={style.form}>
                <input type="email" className={style.input} placeholder="Email"/>
                <input type="password" className={style.input} placeholder="Contraseña"/>
                <Link to="/profile"><input type="button" value="Entrar" className={style.button}/></Link>
            </form>
            <p className={style.register}>¿Aun no tienes cuenta?<p onClick={() => setLogin(false)} className={style.buttonRegister}>Registrate</p></p>
        </div>:
        <div className={style.loginContainer}>
        <h2 className={style.title}>Registrarme</h2>
        <form className={style.form}>
            <input type="email" className={style.input} placeholder="Nombre"/>
            <input type="password" className={style.input} placeholder="Apellido"/>
            <input type="email" className={style.input} placeholder="Telefono"/>
            <input type="password" className={style.input} placeholder="Email"/>
            <input type="email" className={style.input} placeholder="Contraseña"/>
            <input type="password" className={style.input} placeholder="Repetir contraseña"/>
            <Link to="/profile"><input type="button" value="Registrarme" className={style.button}/></Link>
        </form>
        <p className={style.register}>¿Ya tienes cuenta?<p onClick={() => setLogin(true)} className={style.buttonRegister}>Ingresa</p></p>
    </div>
        }
    </div>
  )
};

export default Login