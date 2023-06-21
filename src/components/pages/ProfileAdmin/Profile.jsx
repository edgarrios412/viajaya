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
        <li onClick={() => setPage(2)} className={style.li}>Usuarios</li>
        <li onClick={() => setPage(3)} className={style.li}>Paquetes</li>
        <li onClick={() => setPage(4)} className={style.li}>Promocion</li>
        <li onClick={() => setPage(5)} className={style.li}>Capacitaciones</li>
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
      { page == 2 && <div className={style.view}>
        <table>
          <tr>
          <td>Nombre</td>
          <td>Email</td>
          <td>Celular</td>
          <td>Rol</td>
          <td>Estado</td>
          <td>Acciones</td>
          </tr>
          <tr>
          <td>Edgar</td>
          <td>edgarrios412@gmail.com</td>
          <td>3118268264</td>
          <td>Admin</td>
          <td>Publicado</td>
          <td>Archivar</td>
          </tr>
        </table>
      </div>}

      { page == 3 && <div className={style.view}>
        <table>
          <tr>
          <td>Nombre del paquete</td>
          <td>Detalles</td>
          <td>Creado por</td>
          <td>Estado</td>
          <td>Acciones</td>
          </tr>
          <tr>
          <td>Miami</td>
          <td>No hay descripcion</td>
          <td>Admin</td>
          <td>Publicado</td>
          <td>Archivar</td>
          </tr>
        </table>
      </div>}
      { page == 4 && <div className={style.view}>
        <div className={style.editContainer}>
          <div className={style.edit}>
          <div className={style.imgPromo}></div>
          <textarea className={style.detalles}></textarea>
          </div>
          <button className={style.button}>Guardar</button>
        </div>
      </div>}
      { page == 5 && <div className={style.view}>
        <table>
          <tr>
          <td>Nombre de la capacitacion</td>
          <td>Link</td>
          <td>Creado por</td>
          <td>Estado</td>
          <td>Acciones</td>
          </tr>
          <tr>
          <td>Miami</td>
          <td>www.xd.com</td>
          <td>Admin</td>
          <td>Publicado</td>
          <td>Archivar</td>
          </tr>
        </table>
      </div>}
    </div>
  )
};

export default Profile