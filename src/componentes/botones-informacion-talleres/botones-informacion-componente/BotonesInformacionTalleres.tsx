/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import React from 'react'
import { IDatoTalleresCodigoPostal } from '../../../interfaces/reparacion/Reparacion';
import {
  ContenedorHeader,
  ContenedorPrincipalBusquedaTalleres,
  IconoHeader,
  ContenedorTexto,
} from '../../../pantallas/pantalla-talleres-busqueda/PantallaBusquedaTalleres.styled';
import { TituloMisPolizas } from '../../pantalla-mis-polizas/pantalla-mis-polizas-componente/PantallaMisPolizas.styled';
import { SeparadorEspacio } from '../../pantalla-bienvenida/pantalla-bienvenida-componente/PantallaBienvenida.styled';
import IconoAuto from "../../../recursos/iconos/contigo/ico_autos_white-bg.svg";
// import IconoOficina from "../../../recursos/iconos/contigo/Encuentra-taller/oficina.svg";
import IconoTelefono from "../../../recursos/iconos/contigo/Encuentra-taller/telefono.svg";
import IconoUbicacion from "../../../recursos/iconos/contigo/Encuentra-taller/ubicacion.svg";

interface IProps {
  taller: IDatoTalleresCodigoPostal,
  coordenadasIniciales: {
    lng: number;
    lat: number;
  }
}


const BotonesInformacionTalleres = ({ taller, coordenadasIniciales }: IProps) => {
  const llamar = () => {
    window.open(`tel:*${taller.telefono}`);
  }
  
  const comoLlegar = () => {
    const origen = `${coordenadasIniciales.lat},${coordenadasIniciales.lng}`;
    const destino = `${taller.direccion}, ${taller.ciudad}, ${taller.estado}`;
    const url = `https://www.google.com/maps/dir/${encodeURIComponent(origen)}/${encodeURIComponent(destino)}`;
    window.open(url, '_blank');
  }

  return (
    <ContenedorPrincipalBusquedaTalleres>
      <ContenedorHeader>
        <IconoHeader src={IconoAuto} />
        <TituloMisPolizas
          style={{ fontSize: "16px" }}
        >
          {taller.suc_asociado}
        </TituloMisPolizas>
      </ContenedorHeader>
      <ContenedorTexto>{`${taller.direccion} C.P. ${taller.codigo_postal}, ${taller.ciudad}, ${taller.estado}.`}</ContenedorTexto>
      <SeparadorEspacio />
      <ContenedorTexto> <b>Teléfonos:</b> {taller.telefono !== "" && taller.telefono !== " " ? taller.telefono : "No disponible"} </ContenedorTexto>
      <ContenedorTexto> <b>Horario:</b> --- </ContenedorTexto>
      <SeparadorEspacio />
      <ContenedorHeader style={{ cursor: "pointer" }} onClick={() => { llamar(); }}>
        <IconoHeader src={IconoTelefono} />
        <TituloMisPolizas
          style={{ fontSize: "16px" }}
        >
          Llamar a la sucursal
        </TituloMisPolizas>
      </ContenedorHeader>
      <ContenedorHeader style={{ cursor: "pointer" }} onClick={() => { comoLlegar(); }}>
        <IconoHeader src={IconoUbicacion} />
        <TituloMisPolizas
          style={{ fontSize: "16px" }}
        >
          Como llegar
        </TituloMisPolizas>
      </ContenedorHeader>
    </ContenedorPrincipalBusquedaTalleres>
  )
};

export default BotonesInformacionTalleres;
