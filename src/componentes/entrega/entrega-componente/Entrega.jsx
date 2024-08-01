import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Geocode from "react-geocode";
import { useSelector } from "react-redux";
import IconoCerrar from "@material-ui/icons/CloseRounded";
import Ubicacion from "../../ubicacion";
import Visualizador from "../../visualizador";
import {
  BotonGarantias,
  ContenedorFotos,
  ContenedorIconoCierre,
  ContenedorImagenGarantia,
  ContenedorTaller,
  Cuerpo,
  EncabezadoModal,
  EnvolvedorEntrega,
  EnvolvedorModalGarantias,
  LigaUbicacion,
  ModalContenedor,
  NombreTaller,
  SeparadorEspacio,
  TituloFotos,
  TituloGarantia,
  CuerpoGarantia,
  TituloModal,
} from "./Entrega.styled";
import garantiaImagen from "../../../recursos/imagenes/garantia_hdi.png";
import Boton from "../../boton";
import Configuraciones from "../../../servicios/google-maps";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import useAccionesLog from "../../../utils/useAccionesLog";
import useValidateLogin from "../../../utils/useValidateLogin";

Geocode.setApiKey(Configuraciones.apiKey);
Geocode.setLanguage("es");

const Entrega = (props) => {
  const estadoApp = useSelector((estado) => estado);
  let datosTaller = {
    nombre: "",
    ubicacion: "",
  };

  const { user } = useValidateLogin();
  const { runSuccesLog } = useAccionesLog(user || "");

  if (estadoApp.datosTaller && estadoApp.datosTaller.data) {
    datosTaller = {
      nombre: obtenerValorDeArregloDeStrings(
        estadoApp.datosTaller.data,
        "NombreTaller: "
      ),
      ubicacion: obtenerValorDeArregloDeStrings(
        estadoApp.datosTaller.data,
        "DireccionTaller: "
      ),
    };
  }

  const { imagenes } = props;
  const [datosUbicacionTaller, asignarDatosUbicacionTaller] = useState([]);
  const [mostrarGarantias, asignarValorMostrarGarantias] = useState(false);

  useEffect(() => {
    if (datosTaller.ubicacion) {
      runSuccesLog(11);
      Geocode.fromAddress(datosTaller.ubicacion).then((respuesta) => {
        const { lat, lng } = respuesta.results[0].geometry.location;
        asignarDatosUbicacionTaller([
          `Latitud: ${lat}`,
          `Longitud: ${lng}`,
          `esTaller: ${true}`,
        ]);
      });
    }
  }, []);

  const diccionario = {
    tituloFotos: "Revisa las fotos de tu vehículo reparado",
    botonGarantias: "Ver garantía de reparación",
    cuerpo:
      // eslint-disable-next-line max-len
      "Al asistir al centro de reparación, te recomendamos revisar el inventario del vehículo registrado al momento de su ingreso.",
    tituloModal: "Garantía de reparación",
    tituloGarantia: "Garantía de Calidad en Hojalatería y Pintura",
    cuerpoModal:
      // eslint-disable-next-line max-len
      "Si nuestro servicio de hojalatería y pintura asociada a una reparación por accidente no fue del todo satisfactorio, se vuelve a hacer este servicio.",
  };

  const ModalGarantias = () => (
    <EnvolvedorModalGarantias mostrar={mostrarGarantias}>
      <ModalContenedor>
        <EncabezadoModal>
          <TituloModal>{diccionario.tituloModal}</TituloModal>
          <ContenedorIconoCierre
            onClick={() => {
              asignarValorMostrarGarantias(false);
            }}
          >
            <IconoCerrar />
          </ContenedorIconoCierre>
        </EncabezadoModal>
        <TituloGarantia>{diccionario.tituloGarantia}</TituloGarantia>
        <SeparadorEspacio />
        <SeparadorEspacio />
        <CuerpoGarantia>{diccionario.cuerpoModal}</CuerpoGarantia>
        <SeparadorEspacio />
      </ModalContenedor>
    </EnvolvedorModalGarantias>
  );

  return (
    <EnvolvedorEntrega>
      <ModalGarantias />
      {imagenes.length !== 0 && (
        <ContenedorFotos>
          <TituloFotos>{diccionario.tituloFotos}</TituloFotos>
          <SeparadorEspacio />
          <Visualizador fotos={imagenes} />
        </ContenedorFotos>
      )}
      <ContenedorImagenGarantia src={garantiaImagen} />
      <BotonGarantias>
        <Boton
          etiqueta={diccionario.botonGarantias}
          tema="simple-verde"
          enClick={() => {
            asignarValorMostrarGarantias(true);
          }}
          botonDelgado
        />
      </BotonGarantias>
      <ContenedorTaller>
        {datosUbicacionTaller.length !== 0 && (
          <Ubicacion datosUbicacion={datosUbicacionTaller} />
        )}
        <NombreTaller>{datosTaller.nombre}</NombreTaller>
        <LigaUbicacion>{datosTaller.ubicacion}</LigaUbicacion>
      </ContenedorTaller>
      <Cuerpo>{diccionario.cuerpo}</Cuerpo>
    </EnvolvedorEntrega>
  );
};

Entrega.defaultProps = {
  imagenes: [],
};

Entrega.propTypes = {
  imagenes: PropTypes.arrayOf(PropTypes.string),
};

export default Entrega;
