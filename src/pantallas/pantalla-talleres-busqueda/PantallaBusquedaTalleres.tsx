/* eslint-disable */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { loader } from "graphql.macro";
import { useLazyQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { IRedux } from "../../interfaces/Redux/IRedux";
import {
  TituloMisPolizas,
  MensajePequeno,
} from "../../componentes/pantalla-detalle-poliza/pantalla-detalle-poliza-componente/PantallaDetallePoliza.styled";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes/componentes-styled-compartidos/Pantalla.styled";
import Encabezado from "../../componentes/encabezado/encabezado-componente/Encabezado";
import Mapa from "../../componentes/pantalla-ubicacion-mapa/pantalla-ubicacion-mapa-componente/Mapa";
import useGeolocation from "../../utils/useGeolocation";
import CampoTexto from "../../componentes/campo-texto";
import { IObjectKeys } from "../pantallas-robo/utils";
import { SeparadorEspacio } from "../../componentes/pantalla-bienvenida/pantalla-bienvenida-componente/PantallaBienvenida.styled";
import Boton from "../../componentes/boton/boton-componente/Boton";
import { ContenedorBoton } from "../../componentes/pantalla-formulario-informacion-contacto/pantalla-formulario-informacion-contacto/PantallaFormularioInformacionContacto.styled";
import { ContenedorMapa } from "../../componentes/ubicacion/ubicacion-componente/Ubicacion.styled";
import { ContenedorGoogleMap } from "../../componentes/pantalla-ubicacion-mapa/pantalla-ubicacion-mapa-componente/PantallaUbicacionMapa.styled";
import {
  IDatoTalleresCodigoPostal,
  IRespuestaObtenerTalleresCP,
} from "../../interfaces/reparacion/Reparacion";
import { EncabezadoPasosProgreso, IndicadorCarga } from "../../componentes";
import BotonesInformacionTalleres from "../../componentes/botones-informacion-talleres";
import { BotonIcono, EnvolvedorEncabezado, TituloContenedor } from "../../componentes/encabezado/encabezado-componente/Encabezado.styled";
import RegresarIcono from "@material-ui/icons/ChevronLeftRounded";
import { ContentMapT, EncabezadoEncontrarTaller, TextoVerdeEncontrarTaller } from "./PantallaBusquedaTalleres.styled";
import { TextoVerde } from "../../componentes/caja-resumen/caja-resumen-componente/CajaResumen.styled";
import { ContenedorTexto } from "../../componentes/encabezado-pasos-progreso/encabezado-pasos-progreso-componente/EncabezadoPasosProgreso.styled";
import { Map, Circle, Marker, GoogleApiWrapper } from "google-maps-react";
import Marcador from "../../componentes/ubicacion/recursos/marcador.svg";
import ConfiguracinesMap from "../../servicios/google-maps";

const valores: IObjectKeys = {
  codigoPostal: "",
};

const OBTENER_TALLERES = loader(
  "../../graphQL/query/talleres/indemnizacion_obtenerTalleresCodigoPostal.graphql"
);

const PantallaBusquedaTalleres = (props: any) => {
  const {google} = props;
  const history = useHistory();
  const [coordenadasIniciales, setCoordenadasIniciales] = useState({
    lng: 0,
    lat: 0,
  });
  const estadoApp = useSelector((estado: IRedux) => estado);
  const [estadoCargando, setEstadoCargando] = useState(false);
  const [talleresOficinas, setTalleresOficinas] = useState<
    IDatoTalleresCodigoPostal[] | []
  >([]);
  const { hasPermission, getAsyncLocation } = useGeolocation();

  const [buscarTalleres, { data, loading, error }] =
    useLazyQuery<IRespuestaObtenerTalleresCP>(OBTENER_TALLERES);

  const alCambiarValor = (e: any, valor: string) => {
    valores[valor] = e.target.value;
  };

  const buscarTalleresOficinas = () => {
    setEstadoCargando(true);
    buscarTalleres({
      variables: {
        codigoPostal: valores.codigoPostal,
      },
    });
  };

  const [tituloEncabezado, setTituloEncabezado] = useState<string>("");

  useEffect(() => {
    hasPermission().then((resp) => {
      if (resp) {
        getAsyncLocation().then((respCoords) => {
          console.log(respCoords);
          setCoordenadasIniciales({
            lng: respCoords.longitude,
            lat: respCoords.latitude,
          });
        });
      }
    });
    if (estadoApp?.datosVehiculo?.data) {
      setTituloEncabezado(estadoApp?.datosVehiculo?.data);
    }
  }, []);

  useEffect(() => {
    if (
      (!loading && error) ||
      (!loading && !data?.indemnizacion_obtenerTalleresCodigoPostal.mensaje)
    ) {
      console.log("Hay error");
      return;
    }

    if (
      !loading &&
      data?.indemnizacion_obtenerTalleresCodigoPostal.completado
    ) {
      const resp = data?.indemnizacion_obtenerTalleresCodigoPostal.dato;
      console.log(resp);
      setTalleresOficinas(resp);
    }

    if (loading) {
      setEstadoCargando(true);
    } else {
      setEstadoCargando(false);
    }
  }, [data, loading, error]);

  const funcionRegresar = () => {
    history.goBack();
  }

  return (
    <>
      <EnvolvedorPantalla>
        <EncabezadoEncontrarTaller key="EncabezadoTalleres">
          <BotonIcono type="button" onClick={funcionRegresar}>
            <RegresarIcono fontSize="large" id="botonRegresar" />
          </BotonIcono>
          <ContenedorTexto style={{ margin: "2rem auto" }}>El siniestro de tu</ContenedorTexto>
          <TituloContenedor id="tituloEncabezado">
            {tituloEncabezado}
          </TituloContenedor>
        </EncabezadoEncontrarTaller>
        {estadoCargando && <IndicadorCarga pantallaCompleta />}
        <Pantalla style={{ height: "calc(100vh - 180px)", overflowY: "auto", position: "relative" }}>
          <TituloMisPolizas>Asignar taller de reparación</TituloMisPolizas>

          <MensajePequeno>
            <b>Comunícate</b> con tu oficina de atención más cercana y te
            asignaremos el taller que mejor te convenga.
          </MensajePequeno>
          {talleresOficinas.length <= 0 ? (
            <CampoTexto
              etiqueta="Introduce tu código postal"
              enCambio={(e: any) => alCambiarValor(e, "codigoPostal")}
              marcador="Ingresa tu código postal"
            />
          ) : (
            <></>
          )}
          <SeparadorEspacio />

          {coordenadasIniciales.lat !== 0 && talleresOficinas.length === 0 && (
            <>
              {/* <ContentMapT>
                <Map
                  google={google}
                  zoom={16}
                  initialCenter={{ lat: coordenadasIniciales.lat, lng: coordenadasIniciales.lng }}
                  zoomControl={false}
                  fullscreenControl={false}
                  streetViewControl={false}
                  mapTypeControl={false}
                  draggable={false}
                  style={
                    {
                      height: "300px",
                    }
                  }
                >
                  <Circle
                    radius={32}
                    center={{ lat: coordenadasIniciales.lat, lng: coordenadasIniciales.lng }}
                    fillColor="#036BE4"
                    strokeWeight={0}
                    fillOpacity={0.15}
                  />
                  <Marker
                    draggable={false}
                    position={{ lat: coordenadasIniciales.lat, lng: coordenadasIniciales.lng }}
                    icon={{
                      url: Marcador,
                    }}
                  />
                </Map>
              </ContentMapT>
              <SeparadorEspacio />
              <ContenedorBoton>
                <Boton
                  etiqueta="Encontrar mi oficina HDI"
                  enClick={buscarTalleresOficinas}
                />
              </ContenedorBoton> */}
            </>
          )}

          {talleresOficinas.length >= 1 &&
            talleresOficinas.map((taller) => (
              <>
                <BotonesInformacionTalleres
                  taller={taller}
                  coordenadasIniciales={coordenadasIniciales}
                />
                <SeparadorEspacio />
              </>
            ))}
          <SeparadorEspacio />
          <Boton
            etiqueta="Llamar a HDI"
            tema="simple"
            enClick={() => {
              window.open("tel:*434");
            }}
          />
        </Pantalla>
      </EnvolvedorPantalla>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: ConfiguracinesMap.apiKey||""
})(PantallaBusquedaTalleres);
