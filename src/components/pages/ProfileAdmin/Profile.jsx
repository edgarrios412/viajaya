import { useState } from 'react';
import style from './Profile.module.css'
import { Link, useNavigate } from 'react-router-dom';
import promo from "../../../assets/promo.jpg"
 
const Profile = () => {
    const [page, setPage] = useState(0)
    const navigate = useNavigate()
    const [creator, setCreator] = useState(false)
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
            <Link to="/detail"><div className={style.plan}>
              <div className={style.planTop}>
                <img className={style.imgPlan}/>
                <div className={style.planDetail}>
                  <div className={style.nameAndPrice}>
                    <b className={style.planName}>SANTA MARTA</b>
                    <b className={style.planPrice}>$1.400.000 p/p</b>
                  </div>
                  <p>Hotel maracana - Todo incluido</p>
                  <div className={style.tags}>
                    <span className={style.tag}>Estacionamiento</span>
                    <span className={style.tag}>Wifi</span>
                    <span className={style.tag}>Jacuzzi</span>
                    <span className={style.tag}>Estacionamiento</span>
                    <span className={style.tag}>Estacionamiento</span>
                    <span className={style.tag}>Wifi</span>
                    <span className={style.tag}>Jacuzzi</span>
                    <span className={style.tag}>Estacionamiento</span>
                  </div>
                </div>
              </div>
              <div className={style.planBottom}>
                    <p className={style.date}>3 NOV - 7 NOV 2023</p>
                    <p className={style.date}>COMPRADO EL 25 DE JUNIO DE 2023</p>
                    <p className={style.date}>3 PERSONAS</p>
              </div>
            </div></Link>
            <div className={style.plan}>
              <div className={style.planTop}>
                <img className={style.imgPlan}/>
                <div className={style.planDetail}>
                  <div className={style.nameAndPrice}>
                    <b className={style.planName}>SANTA MARTA</b>
                    <b className={style.planPrice}>$1.400.000 p/p</b>
                  </div>
                  <p>Hotel maracana - Todo incluido</p>
                  <div className={style.tags}>
                    <span className={style.tag}>Estacionamiento</span>
                    <span className={style.tag}>Wifi</span>
                    <span className={style.tag}>Jacuzzi</span>
                    <span className={style.tag}>Estacionamiento</span>
                    <span className={style.tag}>Estacionamiento</span>
                    <span className={style.tag}>Wifi</span>
                    <span className={style.tag}>Jacuzzi</span>
                    <span className={style.tag}>Estacionamiento</span>
                  </div>
                </div>
              </div>
              <div className={style.planBottom}>
                    <p className={style.date}>3 NOV - 7 NOV 2023</p>
                    <p className={style.date}>COMPRADO EL 25 DE JUNIO DE 2023</p>
                    <p className={style.date}>3 PERSONAS</p>
              </div>
            </div>
            <div className={style.plan}>
              <div className={style.planTop}>
                <img className={style.imgPlan}/>
                <div className={style.planDetail}>
                  <div className={style.nameAndPrice}>
                    <b className={style.planName}>SANTA MARTA</b>
                    <b className={style.planPrice}>$1.400.000 p/p</b>
                  </div>
                  <p>Hotel maracana - Todo incluido</p>
                  <div className={style.tags}>
                    <span className={style.tag}>Estacionamiento</span>
                    <span className={style.tag}>Wifi</span>
                    <span className={style.tag}>Jacuzzi</span>
                    <span className={style.tag}>Estacionamiento</span>
                    <span className={style.tag}>Estacionamiento</span>
                    <span className={style.tag}>Wifi</span>
                    <span className={style.tag}>Jacuzzi</span>
                    <span className={style.tag}>Estacionamiento</span>
                  </div>
                </div>
              </div>
              <div className={style.planBottom}>
                    <p className={style.date}>3 NOV - 7 NOV 2023</p>
                    <p className={style.date}>COMPRADO EL 25 DE JUNIO DE 2023</p>
                    <p className={style.date}>3 PERSONAS</p>
              </div>
            </div>
        </div>
      </div>}
      { page == 2 && <div className={style.view}>
      <div className={style.top}>
          <input placeholder='Rol'/>
          <input placeholder='Buscar por email'/>
        </div>
        <table>
          <tr>
          <td className={style.topTd}>Nombre</td>
          <td className={style.topTd}>Email</td>
          <td className={style.topTd}>Celular</td>
          <td className={style.topTd}>Rol</td>
          <td className={style.topTd}>Estado</td>
          <td className={style.topTd}>Acciones</td>
          </tr>
          <tr>
          <td className={style.td}>Edgar Vilchez</td>
          <td className={style.td}>edgarrios412@gmail.com</td>
          <td className={style.td}>3118268264</td>
          <td className={style.td}>Admin</td>
          <td className={style.td}>Publicado</td>
          <td className={style.td}>Archivar</td>
          </tr>
          <tr>
          <td className={style.td}>Edgar Vilchez</td>
          <td className={style.td}>edgarrios412@gmail.com</td>
          <td className={style.td}>3118268264</td>
          <td className={style.td}>Admin</td>
          <td className={style.td}>Publicado</td>
          <td className={style.td}>Archivar</td>
          </tr>
        </table>
      </div>}

      { (page == 3 && !creator) && <div className={style.view}>
        <div className={style.top}>
          <button className={style.newPaquete} onClick={() => setCreator(true)}>Crear paquete</button>
          <input placeholder='Estado'/>
          <input placeholder='Buscar paquete'/>
        </div>
        <table>
          <tr>
          <td className={style.topTd}>Nombre del paquete</td>
          <td className={style.topTd}>Detalles</td>
          <td className={style.topTd}>Creado por</td>
          <td className={style.topTd}>Estado</td>
          <td className={style.topTd}>Acciones</td>
          </tr>
          <tr>
          <td className={style.td}>Miami</td>
          <td className={style.td}>No hay descripcion</td>
          <td className={style.td}>Admin</td>
          <td className={style.td}>Publicado</td>
          <td className={style.td}>Archivar</td>
          </tr>
        </table>
      </div>}
      { (page == 3 && creator) && 
      <div className={style.view}>
        <div className={style.creator}>
          <div className={style.formPaquete}>
            <form>
              <input className={style.inputForm} placeholder="Nombre del paquete"/>
              <input className={style.inputForm} placeholder="Fechas disponibles"/>
              <input className={style.inputForm} placeholder="Caracteristicas"/>
              <input className={style.inputForm} placeholder="Precio"/>
              <input className={style.inputForm} placeholder="Direccion del hotel"/>
              <input className={style.inputForm} placeholder="Ciudad"/>
              <textarea className={style.inputFormText} placeholder="Descripcion"/>
              <button className={style.buttonPromo} style={{margin:"20px 0px 0px 100px"}} onClick={() => setCreator(false)}>Crear paquete</button>
            </form>
          </div>
          <div className={style.imgs}>
            <img src="https://morenoa.com/wp-content/themes/consultix/images/no-image-found-360x250.png"/>
            <p className={style.tip}>Selecciona al menos 3 imagenes</p>
            <div className={style.mapa}>
              Soy un mapa
            </div>
          </div>
        </div>
      </div>}
      { page == 4 && <div className={style.view}>
        <div className={style.editContainer}>
          <div className={style.edit}>
          <img src={promo} className={style.imgPromo}></img>
          <textarea className={style.detalles}></textarea>
          </div>
          <button className={style.buttonPromo}>Guardar</button>
        </div>
      </div>}
      { page == 5 && <div className={style.view}>
      <div className={style.top}>
          <input placeholder='Estado'/>
          <input placeholder='Buscar capacitacion'/>
        </div>
        <table>
          <tr>
          <td className={style.topTd}>Nombre de la capacitacion</td>
          <td className={style.topTd}>Link</td>
          <td className={style.topTd}>Creado por</td>
          <td className={style.topTd}>Estado</td>
          <td className={style.topTd}>Acciones</td>
          </tr>
          <tr>
          <td className={style.td}>Miami</td>
          <td className={style.td}>www.xd.com</td>
          <td className={style.td}>Admin</td>
          <td className={style.td}>Publicado</td>
          <td className={style.td}>Archivar</td>
          </tr>
        </table>
        <button className={style.buttonPromo}>Crear capacitacion</button>
      </div>}
    </div>
  )
};

export default Profile