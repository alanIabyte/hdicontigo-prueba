/* eslint-disable */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loader } from "graphql.macro";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { useCookies } from "react-cookie";
import { Secciones } from "../../contenedor-perdida-total/contenedor-perdida-total-componente/ContenedorPerdidaTotal.styled";
import Seccion from "../../seccion-pasos-progreso";
import {
  ResolucionCampo,
  ResolucionValor,
} from "../../resolucion/resolucion-componente/Resolucion.styled";
import {
  EnlaceBienvenida,
  EnlaceRegistroBienvenida,
  SeparadorEspacio,
} from "../../pantalla-bienvenida/pantalla-bienvenida-componente/PantallaBienvenida.styled";
import Boton from "../../boton/boton-componente/Boton";
import { IRedux } from "../../../interfaces/Redux/IRedux";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import { ContenedorBoton } from "../../pantalla-ingreso-de-poliza/pantalla-ingreso-de-poliza-componente/PantallaIngresoDePoliza.styled";
import {
  IGuardarTipoAtencion,
  IObtenerTipoAtencion,
} from "../../../interfaces/indemnizacion/Iindemnizacion";
import useAlerta from "../../../utils/useAlerta";
import { Alerta } from "../../alerta";
import constantes from "../../../recursos/constantes";
import IndicadorCarga from "../../indicador-carga";
import { EnlaceAlerta, EnlaceAlertaInline, ParrafoAlerta } from "../../pantalla-indemnizacion-opciones/pantalla-indemnizacion-componente/PantallaIndemnizacion.styled";
import BarraAlerta from "../../barra-alerta";
import showConfig from "../../../utils/configs";

const OBTENER_TIPO_ATENCION = loader(
  "../../../graphQL/query/indemnizacion/indemnizacion_obtenerSeleccionTipoAtencion.graphql"
);

const OBTENER_URL_MIT_DEDUCIBLE = loader(
  "../../../graphQL/mutation/cobranza/cobranza_obtenerUrlMitSiniestro.graphql"
);

const GUARDAR_TIPO_ATENCION = loader(
  "../../../graphQL/mutation/indemnizacion/indemnizacion_guardarTipoAtencion.graphql"
);

const DERIVACION_DG_DP = loader(
  "../../../graphQL/mutation/indemnizacion/indemnizacion_derivacion_dg_dp.graphql"
);

const configAlertaDG = {
  textoEncabezado: "Confirmar pago de daños parciales",
  tipoIcono: "DG",
  colorAlerta: "amarillo",
  etiquetaBoton: "Confirmar",
  etiquetaBoton2: "Solicitar reparación",
};

const configAlertaReparacion = {
  textoEncabezado: "Confirmar reparación",
  tipoIcono: "RE",
  colorAlerta: "amarillo",
  etiquetaBoton: "Confirmar",
  etiquetaBoton2: "Solicitar pago de daños parciales",
};

const nombreCookie = constantes.nombreDeCookie;

const SeccionDeducible = ({ desplegarSecciones, tipoAtencionP, resultadoValuacion }: any) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const estadoApp = useSelector((state: IRedux) => state);
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  const { datosReporteCompleto } = estadoApp;
  const { fechasValuacion } = estadoApp;
  const { FechaInicioValuacion } = fechasValuacion || "";
  const { eventoEvaluacionSiniestro, datosDeducible, datosPagoDeduciblePagado } = useSelector((state: IRedux) => state);
  const [valuacionDanios, setValuacionDanios] = useState({
    MontoDeducible: ""
  });
  const [mostrarBotones, setMostrarBotones] = useState(false);
  const [urlMitDeducible, setUrlMitDeducible] = useState("");
  const [estadoCargando, setEstadoCargando] = useState(false);
  /**
   * caso 1:
   * Es pago de daños y se mostrarán los botones de:
   *  Boton 1: Confirmar indemnización
   *  Boton 2: Solicitar reparación
   * 
   * caso 2:
   * Es reparación
   *  Botón 1: Confirmar reparación
   *  Botón 2: Solicitar pago de daños parciales
   */
  const [casoBotones, setCasoBotones] = useState(1);
  const [etiquetaBoton, setEtiquetaBoton] = useState("");
  const [escenarioStatus, setEscenarioStatus] = useState<number>(0);

  const alertaConfirmarDG = useAlerta(configAlertaDG);
  const alertaConfirmarReparacion = useAlerta(configAlertaReparacion);

  const {
    data: dataObtenerTipoAtencion,
    loading: loadingObtenerTipoAtencion,
    error: errorObtenerTipoAtencion,
  } = useQuery<IObtenerTipoAtencion>(OBTENER_TIPO_ATENCION, {
    variables: {
      numeroReporte: estadoApp?.datosReporteCompleto?.numeroReporte,
      numeroSiniestro: estadoApp?.datosReporteCompleto?.numeroSiniestro,
    },
  });

  const [guardarTipoAtencion, { data, loading, error }] =
    useMutation<IGuardarTipoAtencion>(GUARDAR_TIPO_ATENCION);

  const [derivacionDgDp, { data: dataDerivacion, loading: loadingDerivacion, error: errorDerivacion }] =
    useMutation<any>(DERIVACION_DG_DP);

  // ! Implementar uso de URL Mitec
  const [
    obtenerUrlMitDeducible,
    { data: dataUrlMitSiniestro, loading: cargandoUrlMitSiniestro },
  ] = useMutation(OBTENER_URL_MIT_DEDUCIBLE, { fetchPolicy: "network-only" });

  const comenzarIndemnizacion = () => {
    // ! Pago de daños es para cuando el usuario puede reparar su vehiculo o solo tiene daños parciales
    setEstadoCargando(true);
    if (escenarioStatus === 1) {
      // dp
      guardarTipoAtencion({
        variables: {
          tipoAtencion: 3,
          numeroReporte: estadoApp.datosReporteCompleto.numeroReporte,
          numeroSiniestro: estadoApp.datosReporteCompleto.numeroSiniestro,
          token: objetoCookie.access_token,
        },
      });
    } else if (escenarioStatus === 2) {
      // rep
      guardarTipoAtencion({
        variables: {
          tipoAtencion: 6,
          numeroReporte: estadoApp.datosReporteCompleto.numeroReporte,
          numeroSiniestro: estadoApp.datosReporteCompleto.numeroSiniestro,
          token: objetoCookie.access_token,
        },
      });
    }
  };

  useEffect(() => {
    if (!loadingDerivacion && dataDerivacion) {
      setEstadoCargando(false);
      console.log(dataDerivacion, errorDerivacion);
      localStorage.setItem('mostrarAlertaIndemnizacion', "1");
      window.location.reload();
    }
  }, [dataDerivacion, loadingDerivacion, errorDerivacion])

  useEffect(() => {
    if (
      (!loading && error) ||
      (!loading && !data?.indemnizacion_guardarTipoAtencion.completado)
    ) {
      setEstadoCargando(false);
      return;
    }

    if (!loading && data?.indemnizacion_guardarTipoAtencion.completado) {
      // !Solo si es el escenario 1 Daños parciales se aplica la deribación.
      if (escenarioStatus === 1) {
        derivacionDgDp({
          variables: {
            coberturaPoliza: 5, //Daños parciales
            numeroReporte: estadoApp?.datosReporteCompleto?.numeroReporte || estadoApp?.datosReporte?.numeroReporte.toString(),
            token: objetoCookie.access_token,
          }
        });
      } else {
        setEstadoCargando(false);
        localStorage.setItem('mostrarAlertaReparación', "1");
        window.location.reload();
      }
    }
  }, [data, loading, error]);

  useEffect(() => {
    if (
      !loadingObtenerTipoAtencion &&
      dataObtenerTipoAtencion?.indemnizacion_obtenerSeleccionTipoAtencion &&
      dataObtenerTipoAtencion?.indemnizacion_obtenerSeleccionTipoAtencion?.dato
    ) {
      const rsp =
        dataObtenerTipoAtencion?.indemnizacion_obtenerSeleccionTipoAtencion
          ?.mensaje;
      // ! No mostrarmos URL de pago de deducible a menos que el usuario ya haya seleccionado que quiere una indemnización para deducible
      if (rsp === "Success") {
        // ! Como el usuario ya seleccionó un tipo de atención. No hay que mostrarle los botones para que lo vuelva a hacer
        setMostrarBotones(false);
        if (showConfig.showPagoDeducible) {
          obtenerUrlMitDeducible({
            variables: {
              numeroReporte: datosReporteCompleto?.numeroReporte || "",
              usuario: objetoCookie.Telefono||estadoApp?.informacionContacto?.telefono,
              email: estadoApp.informacionContacto?.email|| "",
            },
          });
        }
        return;
      }
      setMostrarBotones(true);
    }
  }, [
    loadingObtenerTipoAtencion,
    errorObtenerTipoAtencion,
    dataObtenerTipoAtencion,
  ]);

  const [pagado, setPagado] = useState<boolean>(false);

  useEffect(() => {
    if (eventoEvaluacionSiniestro.descripciones) {

      const MontoDeducible = obtenerValorDeArregloDeStrings(
        eventoEvaluacionSiniestro.descripciones,
        "MontoDeducible: "
      );

      setValuacionDanios({
        MontoDeducible,
      });

      const estatusValuacion = obtenerValorDeArregloDeStrings(
        eventoEvaluacionSiniestro.descripciones,
        "Status: "
      );

      if (estatusValuacion.toLocaleLowerCase().includes("pago de daños")) {
        setEtiquetaBoton("Confirmar pago de daños parciales");
        setEscenarioStatus(1);
      } else if (estatusValuacion.toLocaleLowerCase().includes("reparacion")) {
        setEtiquetaBoton("Confirmar reparación");
        setEscenarioStatus(2);
      }
    }
  }, [eventoEvaluacionSiniestro]);

  useEffect(() => {
    if (datosPagoDeduciblePagado?.data) {
      const pagado = obtenerValorDeArregloDeStrings(
        datosPagoDeduciblePagado.data,
        "Pagado: "
      );
      
      setPagado(pagado.toLowerCase() === "true");
    }
  }, [datosPagoDeduciblePagado]);

  useEffect(() => {
    if (cargandoUrlMitSiniestro) {
      console.log("cargando liga...");
      return;
    }
    if (
      !cargandoUrlMitSiniestro &&
      dataUrlMitSiniestro?.cobranza_obtenerMitSiniestro &&
      dataUrlMitSiniestro?.cobranza_obtenerMitSiniestro.completado
    ) {
      setUrlMitDeducible(
        dataUrlMitSiniestro?.cobranza_obtenerMitSiniestro.dato.urlTransaccion
      );

      // Agregar la info al redux para que pueda ser tomado por el contenedor de reparación
      dispatch({
        type: "AGREGAR",
        valor: dataUrlMitSiniestro?.cobranza_obtenerMitSiniestro.dato,
        indice: "datosCobranzaMit"
      });
    }
  }, [dataUrlMitSiniestro, cargandoUrlMitSiniestro]);

  const currencyFormat = (num: string) => {
    if (parseFloat(num) <= 0) {
      return "Pendiente";
    }
    return '$' + parseFloat(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  const irIndemnizacionOpciones = () => {
    history.push({
      pathname: "indemnizacion-opciones",
      search: "?tipoAtencion=DP"
    });
  };

  const solicitarReparacion = () => {
    // history.push("encontrar-taller");
    window.location.href = "tel:*434";
  };

  const solicitarDP = () => {
    window.location.href = "tel:*434";
  };

  const [mostrarBoton, setMostrarBoton] = useState<boolean>(false);

  useEffect(() => {
    const datosVehiculo = estadoApp?.datosVehiculo?.data||"";
    const datosSplit = datosVehiculo.split(" ");
    const anioVehiculo = datosSplit[datosSplit.length-1];

    const now = new Date();
    const actual = now.getFullYear();

    const diferencia = actual - parseInt(anioVehiculo);

    if (diferencia <= 7) {
      setMostrarBoton(true);
    }
  }, []);

  const validarConfirmar = () => {
    if (escenarioStatus === 1) {
      // !Pago de daños parciales
      alertaConfirmarDG.mostrar();
    } else if (escenarioStatus === 2) {
      // !Reparación
      alertaConfirmarReparacion.mostrar();
    }
  }

  const abrirPagoLineaMitec = () => {
    window.open(urlMitDeducible);
  }

  return (
    <>
      <Secciones desplegado={desplegarSecciones}>
        {estadoCargando && <IndicadorCarga pantallaCompleta />}
        <Alerta
          {...alertaConfirmarDG}
          manejarCierre={() => alertaConfirmarDG.cerrar()}
          funcionLlamadaBoton={comenzarIndemnizacion}
          funcionLlamadaBoton2={() => {
            window.location.href = "tel:*434";
          }}
        >
          <ParrafoAlerta>
          Considera que el importe de tu indemnización será calculado restando el deducible y cualquier otro concepto que pueda aplicarse según los términos de tu póliza.
          </ParrafoAlerta>
          <ParrafoAlerta><EnlaceAlertaInline onClick={() => irIndemnizacionOpciones()}>Consulta los requisitos</EnlaceAlertaInline> para realizar este trámite.</ParrafoAlerta>
        </Alerta>
        <Alerta
          {...alertaConfirmarReparacion}
          manejarCierre={() => alertaConfirmarReparacion.cerrar()}
          funcionLlamadaBoton={comenzarIndemnizacion}
          funcionLlamadaBoton2={() => {
            window.location.href = "tel:*434";
          }}
        >
        </Alerta>
        <Seccion titulo="Centro de reparación" pendiente={false}>
          <ResolucionCampo>Tipo atención</ResolucionCampo>
          <ResolucionValor>{tipoAtencionP}</ResolucionValor>
        </Seccion>
        <Seccion
          titulo="Inicio de valuación"
          pendiente={
            FechaInicioValuacion === "" || FechaInicioValuacion === undefined
          }
        >
          <ResolucionCampo>Fecha de asignación de valuación</ResolucionCampo>
          <ResolucionValor>
            {FechaInicioValuacion &&
              moment(FechaInicioValuacion).format("DD/MM/YYYY")}
          </ResolucionValor>
        </Seccion>
        <Seccion
          titulo="Estimación de daños"
          pendiente={false}
        >
          <ResolucionCampo>Resultado</ResolucionCampo>
          <ResolucionValor>
            {escenarioStatus === 1 ? "Pago de daños parciales" : "Reparación"}
          </ResolucionValor>
        </Seccion>

        {/* ESTA INFORMACION DEBE PROVENIR DE LA NOTIFICACION  */}
        <Seccion
          titulo="Valuación inicial"
          pendiente={
            valuacionDanios.MontoDeducible === "" ||
            valuacionDanios.MontoDeducible === undefined
          }
        >
          {/* <ResolucionCampo>Costo de reparación:</ResolucionCampo>
          <ResolucionValor>
            {currencyFormat(valuacionDanios?.MontoInicialValuacion)}
          </ResolucionValor> */}

          <ResolucionCampo>Deducible:</ResolucionCampo>
          <ResolucionValor>{currencyFormat(valuacionDanios?.MontoDeducible)}</ResolucionValor>
          {/* Validar si mostramos el botón para pagar con mit */}
          {!pagado && resultadoValuacion !== "Reparación" && urlMitDeducible !== "" ? (
            <Boton pequeno etiqueta="Pagar en línea" tema="estandar" enClick={abrirPagoLineaMitec} />
          ) : <></>}

          <SeparadorEspacio />

          {estadoApp?.tipoAtencionIndemnizacion === "No seleccionado" ? (
            <>
              <ContenedorBoton>
                <Boton
                  customClass="boton-boton--valuacion"
                  etiqueta={etiquetaBoton}
                  tema="estandar"
                  pequeno
                  enClick={validarConfirmar}
                />
              </ContenedorBoton>
              {mostrarBoton && escenarioStatus === 1 && (
                <ContenedorBoton>
                  <Boton
                    customClass="boton-boton--valuacion"
                    etiqueta="Solicitar reparación"
                    tema="simple"
                    pequeno
                    enClick={() => {
                      solicitarReparacion();
                    }}
                    />
                </ContenedorBoton>
              )}
              {escenarioStatus === 2 && (
                <ContenedorBoton>
                  <Boton
                    customClass="boton-boton--valuacion"
                    etiqueta="Solicitar pago de daños parciales"
                    tema="simple"
                    pequeno
                    enClick={() => {
                      solicitarReparacion();
                    }}
                    />
                </ContenedorBoton>
              )}
              {escenarioStatus === 1 && (
                <EnlaceRegistroBienvenida style={{ marginBottom: "20px" }}>
                  <EnlaceBienvenida
                    id="enlaceRegistro"
                    enlace
                    onClick={() => {
                      history.push({
                        pathname: "indemnizacion-opciones",
                        search: "?tipoAtencion=DP",
                      });
                    }}
                  >
                    Conocer el pago de daños
                  </EnlaceBienvenida>
                </EnlaceRegistroBienvenida>
              )}
            </>
          ) : (
            <> </>
          )}
        </Seccion>
      </Secciones>
    </>
  );
};

export default SeccionDeducible;
