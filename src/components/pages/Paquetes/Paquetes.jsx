import style from './Paquetes.module.css'
import {Element} from "react-scroll"
import ModalProject from '../../layout/ModalProject/ModalProject';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation, motion} from 'framer-motion';
import { useEffect } from 'react';
import {Link} from "react-router-dom"
import {RiRefreshFill} from "react-icons/ri"
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Tooltip
} from "react-leaflet";
import myIcon from "../../layout/Map/Iconos"
import { useRef } from "react";
import { map } from 'leaflet';
import axios from 'axios';

const MAP_LAYER_ATTRIBUTION =
  "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";


const Paquetes = () => {
  const [projectId, setProjectId] = useState(null)
  const {ref, inView} = useInView({
    threshold:0.05
  })
  const animation = useAnimation()


  // MAPA

  const [zoom, setZoom] = useState(15)
  const [coord, setCoord] = useState([5.0267284, -74.0093039]);
  const mapRef= useRef()
  const [travels, setTravels] = useState([])

  useEffect(() => {
    if(inView){
      animation.start({
        opacity:1,
        transition:{
          type: "spring",
          duration:1,
          bounce:0.3
        }
      })
    }else{
      animation.start({
        opacity:0
      })
    }
  },[inView])

  useEffect(() => {
    axios.get("/pack").then((data) => setTravels(data.data))
  },[])

  return(
    <>
    { projectId && <ModalProject id={projectId} close={() => setProjectId(null)}/>}
    <Element name="proyectos">
    <motion.div ref={ref} animate={animation} className={style.paquetes} id="proyectos">
      <h2 className={style.titleSection}>Paquetes</h2>
      <div className={style.selectContainer}>
        <RiRefreshFill className={style.refresh}/>
        <select className={style.select}>
          <option selected>Caracteristicas</option>
        </select>
      </div>
      <div className={style.container}>
        <div className={style.paquetesContainer}>
          {travels && travels.map( t =>
          <div className={style.paquete} onClick={() => mapRef.current.flyTo([t.lat,t.lng],15)}>
          <div className={style.planTop}>
                <img className={style.imgPlan}/>
                <div className={style.planDetail}>
                  <div className={style.nameAndPrice}>
                    <b className={style.planName}>{t.title}</b>
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
          </div>)}
        </div>
        <div className={style.mapa}>
        <div>
    <div className={style.mapContainer} style={{height:`60vh`,width:`36vw`}}>
      <MapContainer
        ref={mapRef}
        center={coord}
        zoom={zoom}
        scrollWheelZoom={false}
        className={style.map}
        style={{height:`60vh`,width:`36vw`}}
      >
        <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
        <Marker draggable={true} position={[5.0267284, -74.0093039]} icon={myIcon}>
          <Popup>
            <div>Voy hasta acá</div>
          </Popup>
          </Marker>
        {travels.map((p,i) => <Marker key={i} position={[p.lat,p.lng]}>
        <Popup>Viaje #{i}</Popup>
      </Marker>)}
      {/* <LocationMarker/> */}
      </MapContainer>
    </div>
    </div>
        </div>
      </div>
    </motion.div>
    </Element>
    </>
  )
};

export default Paquetes