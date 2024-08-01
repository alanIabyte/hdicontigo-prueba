/* eslint-disable */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import { Redirect, useHistory, useLocation } from "react-router-dom";

import { useCookies } from "react-cookie";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import useAlerta from "../../../utils/useAlerta";
import { loader } from "graphql.macro";
import {
  EnvolvedorPantalla,
  Pantalla
} from "../../componentes-styled-compartidos/Pantalla.styled";
import IconoConsultar from "../recursos/ico_consultar_reembolsos.svg";
import IconoDescargar from "../recursos/ico_descargar_documentos.svg";
import IconoSolicitar from "../recursos/ico_solicitar_reembolso.svg";
import { Alerta } from "../../alerta";
import { validaDispositivoCelular } from "../../../utils/validaDispositivo";
import {
  Contenedor,
  ContenedorBotones,
  ContenidoAcordeon,
  Encabezado,
  MensajePequeno,
  ParrafoAcordeon,
  Titulo,
  TituloAcordeon,
  EnvolvedorIcono,
  EnvolvedorImagen
} from "./PantallaMisReembolsos.styled.jsx";
import PantallaReembolsoDescarga from "../../pantalla-reembolso-descarga";
import PantallaConsultaReembolsos from "../../pantalla-consulta-reembolsos";
import PantallaSolicitarReembolso from "../../pantalla-reembolsos-solicitar";
import constantes from "../../../recursos/constantes";
import EncabezadoPolizasSiniestradas from "../../encabezado-polizas-siniestradas";
import { configAlertaError } from "../../../helpers/configs/configsAlerta";
import IndicadorCarga from "../../indicador-carga";
import { showGMM } from "../../../utils/merge_congif";
import { Subtitulo2Negritas } from "../../componentes-styled-compartidos/Textos";
import { useSelector } from "react-redux";
import MenuBottomComponente from "../../menu-bottom";
import useValidateLogin from "../../../utils/useValidateLogin";
const diccionario = {
  titulo: "Solicitud de la póliza "
  // subtitulo: "Elige la opcion que deseas realizar",
};

const nombreCookie = constantes.nombreDeCookie;
const OBTENER_REEMBOLSOS_POLIZA = loader(
  "../../../graphQL/query/poliza/gmm_consultarReembolsos.graphql"
);

const OBTENER_POLIZAS_COBRANZA = loader(
  "../../../graphQL/query/cobranza/cobranza_consultaPolizasCobranza.graphql"
);

const OBTENER_POLIZA_GMM = loader(
  "../../../graphQL/query/poliza/gmm_consultaPoliza.graphql"
);

const OBTENER_INICIO = loader(
  "../../../graphQL/query/poliza/obtener_inicio.graphql"
);

const PantallaMisReembolsos = ({ show }) => {
  const location = useLocation();
  const history = useHistory();
  const estadoApp = useSelector((state) => state);
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  const usuario =
    objetoCookie && objetoCookie.Usuario ? objetoCookie.Usuario : "0";

  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    history.push("/");
  }

  if (!showGMM) {
    history.push("/");
  }
  const { validateUser } = useValidateLogin();
  let header = "misReembolsos";
  if (!validateUser) {
    header = "noLogin";
  }
  const alertaError = useAlerta(configAlertaError);
  const [estadoOpciones, establecerEstadoOpciones] = useState("");
  const [estadoPantalla, establecerEstadoPantalla] = useState(true);
  const [estadoReembolsosGMM, establecerEstadoReembolsosGMM] = useState([]);
  const [aseguradosGMM, establecerAseguradosGMM] = useState([]);
  const [estadoCargando, establecerEstadoCargando] = useState(true);
  const [numPoliza, setNumPoliza] = useState("");
  const [vigencia, establecerVigencia] = useState("");
  const [vigenciaInicio, establecerVigenciaInicio] = useState("");

  const [verMenuInferior, setVerMenuInferior] = useState(false);
  const [reembolsos, setReembolsos] = useState([]);

  const [queryObtenerReembolsos, { dataReembolsos, loadingReembolsos }] = useLazyQuery(
    OBTENER_REEMBOLSOS_POLIZA
  );

  const [
    obtenerPolizasCobranza,
    {
      data: dataPolizasCobranza,
      loading: loadingPolizasCobranza,
      error: errorPolizasCobranza
    }
  ] = useLazyQuery(OBTENER_POLIZAS_COBRANZA);

  const [llamarPolizas, { data: polizas, loading: loadingPolizas }] =
    useLazyQuery(OBTENER_INICIO, {
      variables: { telefono: usuario },
      fetchPolicy: "no-cache"
    });

  const [
    obtenerPolizaGMM,
    { data: dataPolizaGmm, loading: loadingPolizaGMM, error: errorPolizaGMM }
  ] = useLazyQuery(OBTENER_POLIZA_GMM, {
    fetchPolicy: "cache-and-network"
  });

  const establecerOpcionSeleccionada = (opcion) => {
    establecerEstadoPantalla(false);
    establecerEstadoOpciones(opcion);
  };

  const eliminarCeros = (poliza) => poliza.slice(4, 10);

  const botonesRenderizado = [
    {
      titulo: "Solicitar reembolso",
      descripcion: "Genera un reembolso",
      opcion: "solicitar",
      icono: IconoSolicitar
    },
    {
      titulo: "Descargar documentos",
      descripcion: "Descargar documentos para solicitar un reembolso",
      opcion: "descargar",
      icono: IconoDescargar
    },
    {
      titulo: "Consultar reembolsos",
      descripcion: "Ver el status de tus reembolsos generados",
      opcion: "consultar",
      icono: IconoConsultar
    }
  ];

  useEffect(() => {
    if (validateUser) {
      setVerMenuInferior(validaDispositivoCelular());
    }
  }, []);

  const guardarAseguradosYReembolsos = (numeroPoliza, asegurados) => {
    setNumPoliza(numeroPoliza);
    establecerAseguradosGMM(asegurados);
    queryObtenerReembolsos({
      variables: { numeroPoliza, numeroTelefono: usuario }
    });
  };

  const llamarPolizasGeneral = () => {
    if (estadoApp.consultaHome > 1) {
      console.log(estadoApp.consultaHome);
      console.log("mas de 1");
      history.push({
        pathname: "/mis-polizas",
        state: {
          paginaAnterior: "/mis-reembolsos"
        }
      });
    } else {
      obtenerPolizasCobranza({ variables: { telefono: usuario, token: objetoCookie.access_token } });
    }

    // llamarPolizas();
  };

  useEffect(() => {

    console.log(reembolsos);

    if (reembolsos) {

      establecerEstadoReembolsosGMM(reembolsos);
      establecerEstadoCargando(false);

    }
  }, [reembolsos]);

  useEffect(() => {

    if (location.state) {

      const { paginaAnterior, poliza } = location.state;
      if (paginaAnterior === "/mis-polizas") {
        establecerVigencia(poliza.poliza.fechaFinVigencia);
        setNumPoliza(poliza.poliza);
        obtenerPolizaGMM({
          variables: { numeroPoliza: poliza.poliza, numeroTelefono: usuario }
        });
      } else if (paginaAnterior === "/detalle-poliza") {
        const { polizaReembolso } = location.state;

        if (polizaReembolso.poliza.paquete === "MEDICA VITAL") {
          establecerVigencia(polizaReembolso.poliza.fechaFinVigencia);
          setNumPoliza(polizaReembolso.poliza.numeroPoliza);
          guardarAseguradosYReembolsos(
            polizaReembolso.poliza.numeroPoliza,
            polizaReembolso.asegurados
          );
          const a = queryObtenerReembolsos({
            variables: { numeroPoliza: polizaReembolso.poliza.numeroPoliza, numeroTelefono: usuario }
          });

          a.then((a) => {
            setReembolsos(a.data.gmm_consultarReembolsos.dato.reembolsos)
          });
        }
      } else if (paginaAnterior === "/resumen-reembolso") {
        const { numeroPoliza } = location.state;
        setNumPoliza(numeroPoliza);
        obtenerPolizaGMM({
          variables: { numeroPoliza, numeroTelefono: usuario }
        });
      } else if (paginaAnterior === "/resumen-reembolso-v2") {
        // ! SOLICITUD REEMBOLSOS V2
        const { numeroPoliza } = location.state;
        setNumPoliza(numeroPoliza);
        obtenerPolizaGMM({
          variables: { numeroPoliza, numeroTelefono: usuario }
        });
        setTimeout(() => {
          queryObtenerReembolsos({
            variables: { numeroPoliza, numeroTelefono: usuario }
          });
          establecerOpcionSeleccionada("consultar");
        }, 3000);
      }
    } else {
      llamarPolizasGeneral();
    }
  }, []);

  useEffect(() => {
    if (
      !loadingPolizas &&
      polizas?.cobranza_consultaHome.completado &&
      polizas?.cobranza_consultaHome.dato
    ) {
      const { totalPolizasGmm } = polizas.cobranza_consultaHome?.dato;
      if (totalPolizasGmm >= 2 || totalPolizasGmm === 0) {
        console.log("Mas de una");
        history.push("/mis-polizas", { paginaAnterior: "/mis-reembolsos" });
        return;
      }
      obtenerPolizasCobranza({ variables: { telefono: usuario, token: objetoCookie.access_token } });
    }
  }, [polizas, loadingPolizas]);

  useEffect(() => {
    if (
      !loadingPolizasCobranza &&
      dataPolizasCobranza &&
      dataPolizasCobranza?.cobranza_consultaPolizasCobranza?.dato
    ) {
      const res = dataPolizasCobranza.cobranza_consultaPolizasCobranza.dato;
      let polizaGMM = res.filter((poliza) => poliza.lineaNegocio === "GMM");
      if (res && polizaGMM.length != 0) {
        polizaGMM = polizaGMM[0];
        console.log(polizaGMM);
        console.log(polizaGMM.poliza);
        setNumPoliza(polizaGMM.poliza);
        obtenerPolizaGMM({
          variables: {
            numeroPoliza: polizaGMM.poliza,
            numeroTelefono: usuario
          }
        });
      }
    }

    if (!loadingPolizasCobranza && errorPolizasCobranza) {
      console.log("Hay error!");
    }
  }, [dataPolizasCobranza, loadingPolizasCobranza]);

  useEffect(() => {
    if (!loadingPolizaGMM && dataPolizaGmm?.gmm_consultaPoliza?.dato) {
      const res = dataPolizaGmm.gmm_consultaPoliza.dato;
      if (res.poliza.paquete === "MEDICA VITAL") {
        // console.log("datos poliza GMM: ", res);
        establecerVigenciaInicio(res.poliza.fechaInicioVigencia);
        establecerVigencia(res.poliza.fechaFinVigencia);
        guardarAseguradosYReembolsos(numPoliza, res.asegurados);
      } else {
        history.push("/mis-polizas");
      }
    }
    //! Agregar un condicional para cuando el servidor no responde, recargar la pagina
  }, [dataPolizaGmm, loadingPolizaGMM]);

  return (
    <>
      {estadoPantalla && (
        <EnvolvedorPantalla key={v4()}>
          <Alerta
            {...alertaError}
            manejarCierre={() => {}}
            funcionLlamadaBoton={() => {
              history.goBack();
            }}
          />
          {!verMenuInferior && (
            <EncabezadoPolizasSiniestradas mostrarMenu={!verMenuInferior} />
          )}

          <Pantalla>
            {estadoCargando ? <IndicadorCarga /> : null}
            <Titulo id="titulo" style={{ height: "auto" }}>
              {diccionario.titulo} {numPoliza}
            </Titulo>
            {/* <Subtitulo2Negritas style={{ marginRight: "auto" }}>
              Póliza {eliminarCeros(numPoliza)}
            </Subtitulo2Negritas> */}
            <MensajePequeno
              id="mensajePequeno"
              style={{ marginTop: "40px", color: "black" }}
            >
              {diccionario.subtitulo}
            </MensajePequeno>
            <ContenedorBotones>
              {botonesRenderizado.map((buttonRender) => (
                <Contenedor
                  show={show}
                  key={v4()}
                  onClick={() =>
                    establecerOpcionSeleccionada(buttonRender.opcion)
                  }
                >
                  <Encabezado>
                    <EnvolvedorIcono>
                      <EnvolvedorImagen src={buttonRender.icono} />
                    </EnvolvedorIcono>
                    <ContenidoAcordeon>
                      <TituloAcordeon>{buttonRender.titulo}</TituloAcordeon>
                    </ContenidoAcordeon>
                  </Encabezado>
                </Contenedor>
              ))}
            </ContenedorBotones>
          </Pantalla>
          {verMenuInferior ? <MenuBottomComponente /> : <></>}
        </EnvolvedorPantalla>
      )}

      {estadoOpciones === "descargar" && !estadoPantalla ? (
        <PantallaReembolsoDescarga
          establecerEstadoPantalla={establecerEstadoPantalla}
          establecerEstadoOpciones={establecerEstadoOpciones}
        />
      ) : estadoOpciones === "consultar" && !estadoPantalla 
      && reembolsos.length > 0
      ? (
        <PantallaConsultaReembolsos
          establecerEstadoPantalla={establecerEstadoPantalla}
          establecerEstadoOpciones={establecerEstadoOpciones}
          reembolsos={reembolsos}
        />
      ) : (
        estadoOpciones === "solicitar" &&
        !estadoPantalla && (
          <PantallaSolicitarReembolso
            establecerEstadoPantalla={establecerEstadoPantalla}
            establecerEstadoOpciones={establecerEstadoOpciones}
            asegurados={aseguradosGMM}
            numeroPoliza={numPoliza}
            vigencia={vigencia}
            vigenciaInicio={vigenciaInicio}
          />
        )
      )}
    </>
  );
};

PantallaMisReembolsos.propTypes = {
  show: PropTypes.bool
};

PantallaMisReembolsos.defaultProps = {
  show: true
};

export default PantallaMisReembolsos;
