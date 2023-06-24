import { useEffect, useState } from 'react';
import style from './Profile.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import imgPromo from "../../../assets/promo.jpg"
import {AiOutlineUser} from "react-icons/ai"
import {MdPayment , MdExitToApp, MdOutlineLocalOffer} from "react-icons/md"
import {FiUsers} from "react-icons/fi"
import {BsBoxSeam} from "react-icons/bs"
import {FaChalkboardTeacher} from "react-icons/fa"
import axios from 'axios';
import { FIND_USERS, findPaquetes, setPaquetes, findUsers, setUsers, setClass, findClass, setPagina } from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Map from '../../layout/Map/Map';
import {toast, Toaster} from "react-hot-toast"
 
const Profile = () => {
    const [page, setPage] = useState(0)
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const [changePass, setChangePass] = useState(false)
    const dispatch = useDispatch()

    const urlReg = /^(http|https):\/\/([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+\.[a-zA-Z]{2,9}(\/[a-zA-Z0-9_#.-]+\/?)*$/
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneReg = /^\d{10}$/;
    
    // ADMIN
    const [creator, setCreator] = useState(false)
    const [pagination, setPagination] = useState(1)

    // const [clases, dispatch(setClass] = useStat)e()
    const [clase, setClase] = useState()

    const [packs, setPacks] = useState()
    const [pack, setPack] = useState()
    const paquetes = useSelector(s => s.paquetes)
    const users = useSelector(s => s.users)
    const clases = useSelector(s => s.clases)
    const pagina = useSelector(s => s.pagina)
    const maxPagesPacks = useSelector(s => s.maxPagesPacks)
    const maxPagesClass = useSelector(s => s.maxPagesClass)
    const maxPagesUser = useSelector(s => s.maxPagesUser)


    const [promo, setPromo] = useState()
    const [promos, setPromos] = useState()

    useEffect(() => {
      axios.get("/user").then((data) => dispatch(setUsers(data.data)))
      axios.get("/class").then((data) => dispatch(setClass(data.data)))
      axios.get("/pack").then((data) => dispatch(setPaquetes(data.data)))
      axios.get("/promo").then((data) => setPromo(data.data))
      axios.get(`/user/verify/${localStorage.getItem("token")}`).then((data) => axios.get(`/user/${data.data.id}`).then((data) => setUser(data.data)))
    }, [])

    const handleClass = (e) => {
      const {name, value} = e.target
      setClase({
        ...clase,
        [name]:value
      })
    }

    const createClass = () => {
      if(!clase?.title.length || clase?.title.length < 5) return toast.error("El titulo debe tener al menos 5 caracteres")
      if(!urlReg.test(clase?.link)) return toast.error("Debes ingresar un link valido")
      axios.post("/class", clase).then(() => {setCreator(false);toast.success("Capacitación creada exitosamente"); axios.get("/class").then((data) => dispatch(setClass(data.data)))})
    }

    const handlePack = (e) => {
      const {name, value} = e.target
      setPack({
        ...pack,
        [name]:value
      })
    }

    const createPack = () => {
      if(!pack?.title.length || pack?.title.length < 5) return toast.error("El titulo debe tener al menos 5 caracteres")
      if(!pack?.detail.length || pack?.detail.length < 2) return toast.error("La descripcion debe tener al menos 2 caracteres")
      axios.post("/pack", pack).then(() => {setCreator(false);toast.success("Paquete creado exitosamente"); axios.get("/pack").then((data) => dispatch(setPaquetes(data.data)))})
    }

    const findPack = (e) => {
      dispatch(findPaquetes(e.target.value))
    }

    const findClase = (e) => {
      dispatch(findClass(e.target.value))
    }

    const handlePromo = (e) => {
      const {name, value} = e.target
      setPromo({
        ...promo,
        [name]:value
      })
    }

    const updatePromo = () => {
      axios.put("/promo", promo).then(() => {toast.success("Promocion actualizada exitosamente"); axios.get("/promo").then((data) => setPromo(data.data))})
    }

    const handleUser = (e) => {
      const {name, value} = e.target
      setUser({
        ...user,
        [name]:value
      })
    }

    const findUsuarios = (e) => {
      dispatch(findUsers(e.target.value))
    }

    const updateUser = () => {
      if(changePass){
        if(!user?.password2.length || user?.password2.length < 8) return toast.error("La contraseña debe tener al menos 8 caracteres")
        if(user.passwordLast == user.password){
          if(user.password2 == user.password3){
            axios.put("/user", {...user, password:user.password2}).then(() => {toast.success("Contraseña actualizada"); setChangePass(false)})
          }else return toast.error("Las contraseñas no coinciden")
        }else return toast.error("Esa no es tu contraseña")
      }else{
      if(!user?.name.length || user?.name.length < 2) return toast.error("El nombre debe tener al menos 2 caracteres")
      if(!user?.lastname.length || user?.lastname.length < 2) return toast.error("El apellido debe tener al menos 2 caracteres")
      if(!emailReg.test(user?.email)) return toast.error("Ingresa un email valido")
      if(!phoneReg.test(user?.phone)) return toast.error("Ingresa un numero valido")
      axios.put("/user", user).then(() => toast.success("Datos actualizados"))
      }
    }

    const setLocation = (loc) => {
      const {lat,lng} = loc
      setPack({
        ...pack,
        lat:lat,
        lng:lng
      })
    }

  return(
    <div className={style.profileContainer}>
      <Toaster/>
      <nav className={style.nav}>
        <h3 className={style.title}>Mi perfil</h3>
        <ul className={style.ul}>
        <li onClick={() => setPage(0)} className={style.li}><AiOutlineUser className={style.icon}/> Información</li>
        <li onClick={() => setPage(1)} className={style.li}><MdPayment className={style.icon}/> Mis compras</li>
        { user?.name == "Admin" && <li onClick={() => {setPage(2); dispatch(setPagina(1))}} className={style.li}><FiUsers className={style.icon}/> Usuarios</li>}        
        { user?.name == "Admin" &&<li onClick={() => {setPage(3) ; dispatch(setPagina(1))}} className={style.li}><BsBoxSeam className={style.icon}/> Paquetes</li>}
        { user?.name == "Admin" &&<li onClick={() => setPage(4)} className={style.li}><MdOutlineLocalOffer className={style.icon}/> Promocion</li>}
        { user?.name == "Admin" &&<li onClick={() => {setPage(5) ; dispatch(setPagina(1))}} className={style.li}><FaChalkboardTeacher className={style.icon}/> Capacitaciones</li>}
        <li onClick={() => navigate("/")} className={style.li}><FaChalkboardTeacher className={style.icon}/> Volver</li>
        <li onClick={() => {navigate("/"); localStorage.removeItem("token"); dispatch(setUser(false))}} className={style.li}><MdExitToApp className={style.icon}/> Cerrar sesion</li>
        </ul>
      </nav>
      { page == 0 && <div className={style.view}>
        <div className={style.profile}>
            <img className={style.imgProfile} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkzpwts1u7OsADocIJpyR-PAoLVHYLfGuU9gwHobM&s">
            </img>
            <div className={style.profileDetail}>
                <p className={style.profileName}>{user?.name} {user?.lastname}</p>
                <p className={style.profileEmail}>{user?.email}</p>
            </div>
        </div>
        <div className={style.editProfile}>
            <form className={style.form} onSubmit={e => e.preventDefault()}>
                { !changePass ? <><div className={style.divisor}>
                <input className={style.input} key={1} onChange={handleUser} name="name" value={user?.name} placeholder="Nombre"/>
                <input className={style.input} key={2} onChange={handleUser} name="lastname" value={user?.lastname} placeholder="Apellido"/>
                </div>
                <div className={style.divisor}>
                <input className={style.input} key={3} onChange={handleUser} name="email" value={user?.email} placeholder="Email"/>
                <input className={style.input} key={4} onChange={handleUser} name="phone" value={user?.phone} placeholder="Telefono"/>
                </div></>:<>
                <div className={style.divisor}>
                <input className={style.input} key={10} onChange={handleUser} value={user?.password2} name="password2" placeholder="Nueva contraseña"/>
                <input className={style.input} key={11} onChange={handleUser} value={user?.password3} name="password3" placeholder="Repite la contraseña"/>
                </div>
                <div className={style.divisor}>
                <input className={style.input} key={12} onChange={handleUser} value={user?.passwordLast} name="passwordLast" placeholder="Contraseña anterior"/>
                </div></>}
                <div className={style.buttons}>
                    <button className={style.button} onClick={updateUser}>Guardar</button>
                    { !changePass ? <button className={style.button} onClick={() => setChangePass(true)}>Cambiar contraseña</button>:
                    <button className={style.button} onClick={() => setChangePass(false)}>Volver</button>}
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
      { (page == 2 && user?.name == "Admin") && <div className={style.view}>
      <div className={style.top}>
          <select className={style.select}>
            <option selected>Rol</option>
            <option>Admin</option>
            <option>Asesor</option>
            <option>Usuario</option>
          </select>
          <input className={style.inputFind} onChange={findUsuarios} placeholder='Buscar por email'/>
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
          {users?.map( u =>
          <tr>
          <td className={style.td}>{u.name} {u.lastname}</td>
          <td className={style.td}>{u.email}</td>
          <td className={style.td}>{u.phone}</td>
          <td className={style.td}>{u.password}</td>
          <td className={style.td}>Publicado</td>
          <td className={style.td}>Archivar</td>
          </tr>)}
        </table>
        <div className={style.pagination}>
          <span className={style.next} onClick={() => pagina > 1 ? dispatch(setPagina(pagina-1)):""}>Atras</span>
          <b className={style.page}>{pagina}</b>
          { maxPagesUser !== pagina && <span className={style.next} onClick={() => dispatch(setPagina(pagina+1))}>Siguiente</span>}
        </div>
      </div>}

      { (page == 3 && user?.name == "Admin" && !creator) && <div className={style.view}>
        <div className={style.top}>
          <button className={style.newPaquete} onClick={() => setCreator(true)}>Crear paquete</button>
          <select className={style.select}>
          <option selected>Estado</option>
          <option>No publicado</option>
          <option>Publicado</option>
          <option>Archivado</option>
          </select>
          <input className={style.inputFind} onChange={findPack} placeholder='Buscar paquete'/>
        </div>
        <table>
          <tr>
          <td className={style.topTd}>Nombre del paquete</td>
          <td className={style.topTd}>Detalles</td>
          <td className={style.topTd}>Creado por</td>
          <td className={style.topTd}>Estado</td>
          <td className={style.topTd}>Acciones</td>
          </tr>
          { paquetes?.map(p => <tr>
          <td className={style.td}>{p.title}</td>
          <td className={style.td}>{p.detail}</td>
          <td className={style.td}>Admin</td>
          <td className={style.td}>Publicado</td>
          <td className={style.td}>Archivar</td>
          </tr>)}
        </table>
        <div className={style.pagination}>
          <span className={style.next} onClick={() => pagina > 1 ? dispatch(setPagina(pagina-1)) : ""}>Atras</span>
          <b className={style.page}>{pagina}</b>
          { maxPagesPacks !== pagina && <span className={style.next} onClick={() => dispatch(setPagina(pagina+1))}>Siguiente</span>}
        </div>
      </div>}
      { (page == 3 && user?.name == "Admin" && creator) && 
      <div className={style.view}>
        <div className={style.creator}>
          <div className={style.formPaquete}>
            <form onSubmit={(e) => e.preventDefault()}>
              <input className={style.inputForm} onChange={handlePack} value={pack?.title} name="title" placeholder="Nombre del paquete"/>
              <input className={style.inputForm} placeholder="Fechas disponibles"/>
              <input className={style.inputForm} placeholder="Caracteristicas"/>
              <input className={style.inputForm} placeholder="Precio"/>
              <input className={style.inputForm} placeholder="Direccion del hotel"/>
              <input className={style.inputForm} placeholder="Ciudad"/>
              <textarea className={style.inputFormText} onChange={handlePack} value={pack?.detail} name="detail" placeholder="Descripcion"/>
              <button className={style.buttonPromo} style={{margin:"20px 0px 0px 100px"}} onClick={createPack}>Crear paquete</button>
            </form>
          </div>
          <div className={style.imgs}>
            <img src="https://morenoa.com/wp-content/themes/consultix/images/no-image-found-360x250.png"/>
            <p className={style.tip}>Selecciona al menos 3 imagenes</p>
            <div className={style.mapa}>
              <Map height={30} width={26} fn={setLocation}/>
            </div>
          </div>
        </div>
      </div>}
      { (page == 4 && user?.name == "Admin") && <div className={style.view}>
        <div className={style.editContainer}>
          <div className={style.edit}>
          <img src={imgPromo} className={style.imgPromo}></img>
          <textarea value={promo?.details} onChange={handlePromo} name="details" className={style.detalles}></textarea>
          </div>
          <button className={style.buttonPromo} onClick={updatePromo}>Guardar</button>
        </div>
      </div>}
      { (page == 5 && user?.name == "Admin" && !creator) && <div className={style.view}>
      <div className={style.top}>
        <button className={style.newPaquete} onClick={() => setCreator(true)}>Crear capacitacion</button>
      <select className={style.select}>
          <option selected>Estado</option>
          <option>No publicado</option>
          <option>Publicado</option>
          <option>Archivado</option>
          </select>
          <input className={style.inputFind} onChange={findClase} placeholder='Buscar capacitacion'/>
        </div>
        <table>
          <tr>
          <td className={style.topTd}>Nombre de la capacitacion</td>
          <td className={style.topTd}>Link</td>
          <td className={style.topTd}>Creado por</td>
          <td className={style.topTd}>Estado</td>
          <td className={style.topTd}>Acciones</td>
          </tr>
          { clases && clases.map( c => <tr>
          <td className={style.td}>{c.title}</td>
          <td className={style.td}>{c.link}</td>
          <td className={style.td}>Admin</td>
          <td className={style.td}>Publicado</td>
          <td className={style.td}>Archivar</td>
          </tr>)}
        </table>
        <div className={style.pagination}>
          <span className={style.next} onClick={() => pagina > 1 ? dispatch(setPagina(pagina-1)):""}>Atras</span>
          <b className={style.page}>{pagina}</b>
          { maxPagesClass !== pagina && <span className={style.next} onClick={() => dispatch(setPagina(pagina+1))}>Siguiente</span>}
        </div>
      </div>}
      { (page == 5 && user?.name == "Admin" && creator) && <div className={style.view}>
        <form className={style.formCapacitacion}>
        <input className={style.inputCapacitacion} onChange={handleClass} value={clase?.title} name="title" placeholder="Nombre de la capacitacion"/>
        <input className={style.inputCapacitacion} onChange={handleClass} value={clase?.link} name="link" placeholder="Link"/>
        </form>
        <button className={style.buttonPromo} onClick={createClass}>Crear capacitacion</button>
      </div>}
    </div>
  )
};

export default Profile