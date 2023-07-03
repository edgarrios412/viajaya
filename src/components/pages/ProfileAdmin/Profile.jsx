import { useEffect, useState } from 'react';
import style from './Profile.module.css'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import imgPromo from "../../../assets/promo.jpg"
import {AiOutlineUser} from "react-icons/ai"
import {MdPayment , MdExitToApp, MdOutlineLocalOffer} from "react-icons/md"
import {FiUsers} from "react-icons/fi"
import {BsBoxSeam} from "react-icons/bs"
import {FaChalkboardTeacher} from "react-icons/fa"
import axios from 'axios';
import { FIND_USERS, findPaquetes, setPaquetes, findUsers, setUsers, setClass, findClass, setPagina, filterPacks } from '../../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Map from '../../layout/Map/Map';
import {toast, Toaster} from "react-hot-toast"
import Select from "react-select"
 
const Profile = () => {
    const [page, setPage] = useState(0)
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const [changePass, setChangePass] = useState(false)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    const urlReg = /^(http|https):\/\/([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+\.[a-zA-Z]{2,9}(\/[a-zA-Z0-9_#.-]+\/?)*$/
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneReg = /^\d{10}$/;
    
    // ADMIN
    const [creator, setCreator] = useState(false)
    const [pagination, setPagination] = useState(1)

    // const [clases, dispatch(setClass] = useStat)e()
    const [clase, setClase] = useState()

    const [packs, setPacks] = useState()
    const [pack, setPack] = useState({
      images:[]
    })
    const paquetes = useSelector(s => s.paquetes)
    const users = useSelector(s => s.users)
    const clases = useSelector(s => s.clases)
    const pagina = useSelector(s => s.pagina)
    const maxPagesPacks = useSelector(s => s.maxPagesPacks)
    const maxPagesClass = useSelector(s => s.maxPagesClass)
    const maxPagesUser = useSelector(s => s.maxPagesUser)

    const [chars, setChars] = useState()
    const [promo, setPromo] = useState()
    const [promos, setPromos] = useState()
    const [buy, setBuy] = useState()

    useEffect(() => {
      axios.get("/user").then((data) => {dispatch(setUsers(data.data)); setTimeout(() => {
        setLoading(false)
      }, 500)})
      axios.get("/class").then((data) => dispatch(setClass(data.data)))
      axios.get("/pack").then((data) => dispatch(setPaquetes(data.data)))
      axios.get("/pack/chars").then((data) => setChars(data.data))
      axios.get("/promo").then((data) => setPromo(data.data))
      axios.get(`/user/verify/${localStorage.getItem("token")}`).then((data) => {axios.get(`/user/${data.data.id}`).then((data) => setUser(data.data)); axios.get(`/buy/${data.data.id}`).then((data) => setBuy(data.data))})
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
      axios.post("/class", {...clase, created:user.name}).then(() => {setCreator(false);toast.success("Capacitación creada exitosamente"); axios.get("/class").then((data) => dispatch(setClass(data.data)))})
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
      if(!pack?.lat || !pack?.lng) return toast.error("Debes seleccionar una ubicacion en el mapa")
      axios.post("/pack", {...pack, created:user.name}).then(() => {setCreator(false);toast.success("Paquete creado exitosamente"); axios.get("/pack").then((data) => dispatch(setPaquetes(data.data)))})
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

    if(localStorage.getItem("token") == null){
      return <Navigate to="/login" replace />
  }

  const subirRol = (id,role, bool) => {
    if(bool){
      axios.put("/user", { id: id, role: role}).then((data) => axios.get("/user").then((data) => dispatch(setUsers(data.data))))
      toast.success("Usuario ascendido con exito")
    }else{
      axios.put("/user", { id: id, role: 1}).then((data) => axios.get("/user").then((data) => dispatch(setUsers(data.data))))
      toast.success("Usuario descendido con exito")
    }
  }

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset","viajaya")
    data.append("api_key","612393625364863")
    data.append("timestamp", 0)
    const res = await axios.post("https://api.cloudinary.com/v1_1/dftvenl2z/image/upload", data)
    // console.log(res.data.secure_url)
    setPromo({
      ...promo,
      image:res.data.secure_url
    })
  }

  const uploadImages = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset","viajaya")
    data.append("api_key","612393625364863")
    data.append("timestamp", 0)
    const res = await axios.post("https://api.cloudinary.com/v1_1/dftvenl2z/image/upload", data)
    setPack({
      ...pack,
      images:[...pack.images, res.data.secure_url]
    })
  }

  const updatePaquete = (id) => {
    axios.put("/pack", {id:id, status:"a"})
    .then(() => axios.get("/pack").then((data) => dispatch(setPaquetes(data.data))))
    toast.success("Se ha actualizado el paquete")
  }

  const deletePaquete = (id) => {
    axios.delete(`/pack/${id}`)
    .then((data) => {toast.success(data.data.message); axios.get("/pack").then((data) => dispatch(setPaquetes(data.data)))})
  }

  const actualizarClase = (id) => {
    axios.put("/class", {id:id, status:"a"})
    .then(() => axios.get("/class").then((data) => dispatch(setClass(data.data))))
    toast.success("Se ha actualizado la capacitacion")
  }

  const eliminarClase = (id) => {
    axios.delete(`/class/${id}`)
    .then((data) => {toast.success(data.data.message); axios.get("/class").then((data) => dispatch(setClass(data.data)))})
  }

  const filtrarPaquetes = (e, type) => {
    dispatch(filterPacks(e.target.value, type))
  }

  const [packChars, setPackChars] = useState([])

  const handleChars = (e) => {
    setPack({
      ...pack,
      chars: e.map(c => c.value)
    })
    setPackChars([...packChars, e.at(-1)])
  }

  const options = chars?.map( c => { return{value:c.id, label:c.name}})

  const customStyles = {
    control: (provided) => ({
      ...provided,
      maxHeight: '40px',
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingRight: '55px'
    }),
    multiValue: (provided) => ({
      ...provided,
      position: 'relative',
      maxWidth: '80%',
      whiteSpace: 'nowrap',
      overflow: 'auto',
      textOverflow: 'ellipsis'
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      position: 'absolute',
      top: '0px',
      right: '0px',
      border: 'none'
    })
    }

    console.log(buy)

  return(
    <>
    {loading ? <div className={style.ldsellipsis}><div></div><div></div><div></div><div></div></div> :
    <div className={style.profileContainer}>
      <Toaster/>
      <nav className={style.nav}>
        <h3 className={style.title}>Mi perfil</h3>
        <ul className={style.ul}>
        <li onClick={() => setPage(0)} className={style.li}><AiOutlineUser className={style.icon}/> Información</li>
        <li onClick={() => setPage(1)} className={style.li}><MdPayment className={style.icon}/> Mis compras</li>
        { user?.role == 3 && <li onClick={() => {setPage(2); dispatch(setPagina(1))}} className={style.li}><FiUsers className={style.icon}/> Usuarios</li>}        
        { user?.role == 3 &&<li onClick={() => {setPage(3) ; dispatch(setPagina(1))}} className={style.li}><BsBoxSeam className={style.icon}/> Paquetes</li>}
        { user?.role == 3 &&<li onClick={() => setPage(4)} className={style.li}><MdOutlineLocalOffer className={style.icon}/> Promocion</li>}
        { user?.role >= 2 &&<li onClick={() => {setPage(5) ; dispatch(setPagina(1))}} className={style.li}><FaChalkboardTeacher className={style.icon}/> Capacitaciones</li>}
        <li onClick={() => navigate("/")} className={style.li}><FaChalkboardTeacher className={style.icon}/> Volver</li>
        <li onClick={() => {navigate("/"); localStorage.removeItem("token"); dispatch(setUser(false))}} className={style.li}><MdExitToApp className={style.icon}/> Cerrar sesion</li>
        </ul>
      </nav>
      { page == 0 && <div className={style.view}>
        <div className={style.profile}>
            <img className={style.imgProfile} src="https://cdn.landesa.org/wp-content/uploads/default-user-image.png">
            </img>
            <div className={style.profileDetail}>
                <p className={style.profileName}>{user?.name} {user?.lastname}</p>
                <p className={style.profileEmail}>{user?.email}</p>
                {user?.role == 1 && <p></p>}
                {user?.role == 2 && <p className={style.tagAsesor}>Asesor</p>}
                {user?.role == 3 && <p className={style.tagAdmin}>Admin</p>}

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
          {buy?.length == 0 && <h1>No has comprado nada aún</h1>}
            {buy?.map( b => <div className={style.plan}>
              <div className={style.planTop}>
                <img src={b.pack.images[0]} className={style.imgPlan}/>
                <div className={style.planDetail}>
                  <div className={style.nameAndPrice}>
                    <b className={style.planName}>{b.pack.title}</b>
                    <b className={style.planPrice}>${b.pack.price} p/p</b>
                  </div>
                  <p>{b.pack.location} - Todo incluido</p>
                  <div className={style.tags}>
                    {b.pack.chars.map( c => <span className={style.tag}>{c.name}</span>)}
                  </div>
                </div>
              </div>
              <div className={style.planBottom}>
                    <p className={style.date}>{b.inicio} - {b.fin}</p>
                    <p className={style.date}>COMPRADO EL {b.comprado}</p>
                    <p className={style.date}>{b.person} PERSONAS</p>
              </div>
            </div>)}
        </div>
      </div>}
      { (page == 2 && user?.role == 3) && <div className={style.view}>
      <div className={style.top}>
          {/* <select className={style.select}>
            <option selected>Rol</option>
            <option>Admin</option>
            <option>Asesor</option>
            <option>Usuario</option>
          </select> */}
          <input className={style.inputFind} onChange={findUsuarios} placeholder='Buscar por email'/>
        </div>
        <table>
          <tr>
          <td className={style.topTd}>Nombre</td>
          <td className={style.topTd}>Email</td>
          <td className={style.topTd}>Celular</td>
          <td className={style.topTd}>Rol</td>
          <td className={style.topTd}>Acciones</td>
          </tr>
          {users?.map( u =>
          <tr>
          <td className={style.td}>{u.name} {u.lastname}</td>
          <td className={style.td}>{u.email}</td>
          <td className={style.td}>{u.phone}</td>
          { u.role == 1 && <td className={style.td}>Usuario</td>}
          {u.role == 2 && <td className={style.td}>Asesor</td>}
          {u.role == 3 && <td className={style.td}>Admin</td>}
          {u.role < 3 && <td className={style.td} style={{cursor:"pointer"}} onClick={() => subirRol(u.id, u.role+1, true)}>Ascender</td>}
          {u.role == 3 && <td className={style.td} style={{cursor:"pointer"}} onClick={() => subirRol(u.id, u.role+1, false)}>Volver usuario</td>}
          </tr>)}
        </table>
        <div className={style.pagination}>
          <span className={style.next} onClick={() => pagina > 1 ? dispatch(setPagina(pagina-1)):""}>Atras</span>
          <b className={style.page}>{pagina}</b>
          { maxPagesUser !== pagina && <span className={style.next} onClick={() => dispatch(setPagina(pagina+1))}>Siguiente</span>}
        </div>
      </div>}

      { (page == 3 && user?.role == 3 && !creator) && <div className={style.view}>
        <div className={style.top}>
          <button className={style.newPaquete} onClick={() => setCreator(true)}>Crear paquete</button>
          <select className={style.select} onChange={(e) => filtrarPaquetes(e,"pack")}>
          <option value="all" selected>Todos</option>
          <option value="true">Publicado</option>
          <option value="false">Archivado</option>
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
          <td className={style.td}>{p.created}</td>
          <td className={style.td} style={{cursor:"pointer"}} onClick={() => updatePaquete(p.id)}>{p.status == false ? "Publicar":"Archivar"}</td>
          <td className={style.td} style={{cursor:"pointer"}} onClick={() => deletePaquete(p.id)}>Borrar</td>
          </tr>)}
        </table>
        <div className={style.pagination}>
          <span className={style.next} onClick={() => pagina > 1 ? dispatch(setPagina(pagina-1)) : ""}>Atras</span>
          <b className={style.page}>{pagina}</b>
          { maxPagesPacks !== pagina && <span className={style.next} onClick={() => dispatch(setPagina(pagina+1))}>Siguiente</span>}
        </div>
      </div>}
      { (page == 3 && user?.role == 3 && creator) && 
      <div className={style.view}>
        <div className={style.creator}>
          <div className={style.formPaquete}>
            <form onSubmit={(e) => e.preventDefault()}>
              <input className={style.inputForm} onChange={handlePack} value={pack?.title} name="title" placeholder="Nombre del paquete"/>
              <input type="number" onChange={handlePack} value={pack?.days} name="days" className={style.inputForm} placeholder="Duracion (dias)"/>
              <Select  className={style.inputForm1} styles={customStyles} isMulti placeholder="Caracteristicas" onChange={handleChars} options={options} />
              <input className={style.inputForm} onChange={handlePack} value={pack?.price} name="price" placeholder="Precio"/>
              <input className={style.inputForm} onChange={handlePack} value={pack?.location} name="location" placeholder="Direccion del hotel"/>
              <input className={style.inputForm} onChange={handlePack} value={pack?.titcityle} name="city" placeholder="Ciudad"/>
              <textarea className={style.inputFormText} onChange={handlePack} value={pack?.detail} name="detail" placeholder="Descripcion"/>
              <div style={{display:"flex", width:"200px", justifyContent:"space-beetween"}}>
              <button className={style.buttonCreate} onClick={() => setCreator(false)}>Volver</button>
              <button className={style.buttonCreate} onClick={createPack}>Crear</button>
              </div>
            </form>
          </div>
          <div className={style.imgs}>
            <div className={style.imgContainer}>
            <img className={style.img} src={!pack?.images.length ? "https://morenoa.com/wp-content/themes/consultix/images/no-image-found-360x250.png" : pack?.images.at(-1)}/>
            { pack?.images.length < 3 && <input type="file" className={style.upload} onChange={uploadImages}/>}
            </div>
            <p className={style.tip}>Selecciona al menos 3 imagenes {"("+pack?.images.length+"/3)"}</p>
            <div className={style.mapa}>
              <Map height={30} width={26} fn={setLocation}/>
            </div>
          </div>
        </div>
      </div>}
      { (page == 4 && user?.role == 3) && <div className={style.view}>
        <div className={style.editContainer}>
          <div className={style.edit}>
            <div className={style.imgPromoContainer}>
          <img src={promo?.image} className={style.imgPromo}></img>
          <input type="file" className={style.inputFile} onChange={uploadImage}/>
          </div>
          <textarea value={promo?.details} onChange={handlePromo} name="details" className={style.detalles}></textarea>
          </div>
          <button className={style.buttonPromo} onClick={updatePromo}>Guardar</button>
        </div>
      </div>}
      { (page == 5 && user?.role >= 2 && !creator) && <div className={style.view}>
      <div className={style.top}>
        { user?.role == 3 && <button className={style.newPaquete} onClick={() => setCreator(true)}>Crear capacitacion</button>}
        <select className={style.select} onChange={(e) => filtrarPaquetes(e,"class")}>
          <option value="all" selected>Todos</option>
          <option value="true">Publicado</option>
          <option value="false">Archivado</option>
          </select>
          <input className={style.inputFind} onChange={findClase} placeholder='Buscar capacitacion'/>
        </div>
        <table>
          <tr>
          <td className={style.topTd}>Nombre de la capacitacion</td>
          <td className={style.topTd}>Link</td>
          <td className={style.topTd}>Creado por</td>
          {user?.role == 3 && <td className={style.topTd}>Estado</td>}
          {user?.role == 3 && <td className={style.topTd}>Acciones</td>}
          </tr>
          { clases && clases.map( c => <tr>
          <td className={style.td}>{c.title}</td>
          <td className={style.td}>{c.link}</td>
          <td className={style.td}>{c.created}</td>
          {user?.role == 3 && <td className={style.td} style={{cursor:"pointer"}} onClick={() => actualizarClase(c.id)}>{c.status == false ? "Publicar":"Archivar"}</td>}
          {user?.role == 3 && <td className={style.td} style={{cursor:"pointer"}} onClick={() => eliminarClase(c.id)}>Borrar</td>}
          </tr>)}
        </table>
        <div className={style.pagination}>
          <span className={style.next} onClick={() => pagina > 1 ? dispatch(setPagina(pagina-1)):""}>Atras</span>
          <b className={style.page}>{pagina}</b>
          { maxPagesClass !== pagina && <span className={style.next} onClick={() => dispatch(setPagina(pagina+1))}>Siguiente</span>}
        </div>
      </div>}
      { (page == 5 && user?.role == 3 && creator) && <div className={style.view}>
        <form className={style.formCapacitacion}>
        <input className={style.inputCapacitacion} onChange={handleClass} value={clase?.title} name="title" placeholder="Nombre de la capacitacion"/>
        <input className={style.inputCapacitacion} onChange={handleClass} value={clase?.link} name="link" placeholder="Link"/>
        </form>
        <button className={style.buttonPromo} onClick={createClass}>Crear capacitacion</button>
        <button className={style.buttonPromo} onClick={() => setCreator(false)}>Volver</button>
      </div>}
    </div>}
    </>
  )
};

export default Profile