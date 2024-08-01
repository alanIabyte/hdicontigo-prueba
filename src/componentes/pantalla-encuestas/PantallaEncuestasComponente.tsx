/* eslint-disable no-unused-expressions */
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useHistory } from "react-router-dom";
import { loader } from "graphql.macro";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import EncabezadoPolizasSiniestradas from "../encabezado-polizas-siniestradas";
import {
  Contenedor,
  ContenedorBotones,
  ContenidoAcordeon,
  Encabezado,
  EnvolvedorIcono,
  EnvolvedorImagen,
  ParrafoAcordeon,
  TituloAcordeon,
} from "../acordeon-registro-poliza/acordeon-registro-poliza-componente/AcordeonRegistroPoliza.styled";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../componentes-styled-compartidos/Pantalla.styled";
import {
  MensajePequeno,
  Titulo,
} from "../pantalla-registro-usuario/pantalla-registro-usuario-componente/PantallaRegistroUsuario.styled";
import IndicadorCarga from "../indicador-carga";
import IconoReporte from "../../recursos/iconos/contigo/ico_mis_sin.svg";
import constantes from "../../recursos/constantes";
import {
  IObtenerPolizas,
  IPoliza,
  Poliza,
  Reporte,
} from "../../interfaces/polizas/IPoliza";

const diccionario = {
  titulo: "¡Califica nuestro servicio!",
  subtitulo:
    "Tu opinión es clave para ayudarnos a mejorar tu experiencia. Selecciona el reporte del que deseas ver tus encuestas pendientes:",
  subtitulosinreportes: "Por el momento no cuentas con encuestas pendientes. ",
};

const OBTENER_POLIZAS = loader(
  "../../graphQL/query/poliza/obtener_polizas.graphql"
);

const nombreCookie = constantes.nombreDeCookie;

const PantallaEncuestasComponente = () => {
  const history = useHistory();
  const appState = useSelector((state: any) => state);
  const [cookie, , removerCookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  const usuario = objetoCookie ? objetoCookie.Usuario : "5555555555";
  const {
    data: polizas,
    loading: enCarga,
    error,
  } = useQuery<IObtenerPolizas>(OBTENER_POLIZAS, {
    variables: { telefono: usuario },
    fetchPolicy: "no-cache",
  });

  // States
  const [loadingState, setLoadingState] = useState(true);
  const [foundPolicies, setFoundPolicies] = useState<Reporte[]>([]);

  const reedirigir = (reporte: any) => {
    console.log(reporte);
    history.push("/elegir-encuesta", { reporte });
  };

  useEffect(() => {
    if (enCarga) {
      setLoadingState(true);
      return;
    }

    if (!polizas || !polizas.obtener_polizas || !polizas.obtener_polizas.dato) {
      setLoadingState(false);
      return;
    }

    const filteredPolizas = polizas.obtener_polizas.dato.filter(
      (poliza: Poliza) =>
        poliza.reportes.some((reporte: Reporte) => reporte.encuestasPend)
    );

    const policyClaims = filteredPolizas.flatMap(
      ({ poliza: { datosVehiculo }, reportes }: any) =>
        reportes
          .filter((reporte: Reporte) => reporte.encuestasPend)
          .map((reporte: Reporte) => ({
            ...reporte,
            nombreAuto: datosVehiculo,
          }))
    );

    setFoundPolicies(policyClaims);
    setLoadingState(false);
  }, [polizas, enCarga, error]);

  return (
    <EnvolvedorPantalla key={v4()}>
      {loadingState && <IndicadorCarga pantallaCompleta />}
      <EncabezadoPolizasSiniestradas
        regresar
        funcionRegresar={() => history.goBack()}
      />
      <Pantalla>
        <Titulo id="titulo">{diccionario.titulo}</Titulo>
        <MensajePequeno>
          {foundPolicies.length > 0
            ? diccionario.subtitulo
            : diccionario.subtitulosinreportes}
        </MensajePequeno>
        <ContenedorBotones>
          {foundPolicies?.map((reporte) => (
            <Contenedor show onClick={() => reedirigir(reporte)}>
              <Encabezado>
                <EnvolvedorIcono>
                  <EnvolvedorImagen src={IconoReporte} />
                </EnvolvedorIcono>
                <ContenidoAcordeon>
                  <TituloAcordeon>
                    Vehiculo: <span>{reporte.nombreAuto}</span>
                  </TituloAcordeon>
                  <ParrafoAcordeon>
                    Fecha del reporte: {reporte.fechaReporte}
                  </ParrafoAcordeon>
                </ContenidoAcordeon>
              </Encabezado>
            </Contenedor>
          ))}
        </ContenedorBotones>
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

export default PantallaEncuestasComponente;
