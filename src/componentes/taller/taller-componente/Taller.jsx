import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Geocode from "react-geocode";
import { useSelector } from "react-redux";
import Ubicacion from "../../ubicacion";
import {
  BotonTaller,
  ContenedorQR,
  ContenedorTaller,
  EnvolvedorTaller,
  ImgQR,
  NombreTaller,
  // UbicacionTaller,
  // UbicacionTallerTexto,
} from "./Taller.styled";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import Configuraciones from "../../../servicios/google-maps";
import useAccionesLog from "../../../utils/useAccionesLog";
import Boton from "../../boton/boton-componente/Boton";

Geocode.setApiKey(Configuraciones.apiKey);
Geocode.setLanguage("es");

const Taller = ({ taller, qr }) => {
  const diccionario = {
    botonTaller: "Descargar Pase",
  };

  const estadoApp = useSelector((state) => state);
  const { runDownloadLog, runSuccesLog } = useAccionesLog(
    estadoApp.informacionContacto.telefono === undefined ||
      estadoApp.informacionContacto.telefono === null
      ? ""
      : estadoApp.informacionContacto.telefono
  );

  const tallerContenido = {
    nombre: obtenerValorDeArregloDeStrings(taller, "NombreTaller: "),
    archivo: obtenerValorDeArregloDeStrings(taller, "Documento: "),
    ubicacion: obtenerValorDeArregloDeStrings(taller, "DireccionTaller: ")
      ? obtenerValorDeArregloDeStrings(taller, "DireccionTaller: ")
      : obtenerValorDeArregloDeStrings(taller, "Direccion: "),
  };

  const [qrContenido, setQrContenido] = useState({
    titulo: "",
    documento: "",
    url: "",
  });

  // console.log(tallerContenido.archivo);

  const [datosUbicacion, asignarDatosUbicacion] = useState([]);

  const [showQr, setShowQr] = useState(false);
  useEffect(() => {
    if (tallerContenido.ubicacion) {
      runSuccesLog(11);
      Geocode.fromAddress(tallerContenido.ubicacion).then((respuesta) => {
        const { lat, lng } = respuesta.results[0].geometry.location;
        asignarDatosUbicacion([
          `Latitud: ${lat}`,
          `Longitud: ${lng}`,
          `esTaller: ${true}`,
          `Direccion: ${tallerContenido.ubicacion}`,
        ]);
      });
    }
  }, []);

  useEffect(() => {
    // console.log("ContenidoQR", qr);
    const reload = JSON.parse(sessionStorage.getItem("ReloadQr"));
    // console.log("ReloadQr", reload);
    if (qr.length === 0) {
      // Si Reload == null : Recargar
      // Si Reload == false : Recargar
      // Si Reload == true : No recargar
      if (!reload) {
        sessionStorage.setItem("ReloadQr", "true");
        window.location.reload();
      } else {
        sessionStorage.setItem("ReloadQr", "false");
      }
    } else {
      sessionStorage.removeItem("ReloadQr");
    }

    setQrContenido({
      titulo: obtenerValorDeArregloDeStrings(qr, "TItulo: "),
      documento: obtenerValorDeArregloDeStrings(qr, "Documento: "),
      url: obtenerValorDeArregloDeStrings(qr, "Url: "),
    });
    const s = JSON.parse(sessionStorage.getItem("ShowQR"));
    setShowQr(s === null ? true : s);
  }, [qr]);

  const runAction = () => runDownloadLog(8);

  const irUlr = (url) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <EnvolvedorTaller>
      <ContenedorTaller>
        <NombreTaller>{tallerContenido.nombre}</NombreTaller>
        {datosUbicacion.length > 0 && (
          <div>
            <Ubicacion datosUbicacion={datosUbicacion} />
            {/* <UbicacionTaller
              href={`https://maps.google.com/?q=${encodeURIComponent(
                tallerContenido.ubicacion
              )}`}
            >
              <UbicacionTallerTexto>
                {tallerContenido.ubicacion}
              </UbicacionTallerTexto>
            </UbicacionTaller> */}
          </div>
        )}
        {tallerContenido.archivo && (
          <a
            target="_blank"
            rel="noreferrer"
            href={tallerContenido.archivo}
            download
          >
            <BotonTaller style={{ cursor: "pointer" }} onClick={runAction}>
              {diccionario.botonTaller}
            </BotonTaller>
          </a>
        )}
        {/* {console.log("contenidoQR", qrContenido)} */}
        {showQr && (
          <ContenedorQR>
            <NombreTaller style={{ marginBottom: "0" }}>
              {qrContenido.titulo}
            </NombreTaller>
            <ImgQR src={qrContenido.documento} alt={qrContenido.titulo} />
            {qrContenido.url !== "" && (
              <Boton
                etiqueta="o da click aquí"
                tema="estandar"
                enClick={() => {
                  irUlr(qrContenido.url);
                }}
              />
            )}
          </ContenedorQR>
        )}
      </ContenedorTaller>
    </EnvolvedorTaller>
  );
};

Taller.propTypes = {
  taller: PropTypes.arrayOf(PropTypes.string),
  qr: PropTypes.arrayOf(PropTypes.string),
};

Taller.defaultProps = {
  taller: [],
  qr: [],
};

export default Taller;
