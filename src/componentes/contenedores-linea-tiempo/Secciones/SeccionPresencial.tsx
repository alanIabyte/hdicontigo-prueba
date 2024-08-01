/* eslint-disable */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loader } from "graphql.macro";
import { useMutation, useQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import { Secciones } from "../../contenedor-reporte-ajuste/contenedor-reporte-ajuste-componente/ContenedorReporteAjuste.styled";
import Seccion from "../../seccion-pasos-progreso";
import {
  EnlaceBienvenida,
  EnlaceRegistroBienvenida,
} from "../../pantalla-bienvenida/pantalla-bienvenida-componente/PantallaBienvenida.styled";
import {
  ResolucionCampo,
  ResolucionValor,
} from "../../resolucion/resolucion-componente/Resolucion.styled";
// import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import Boton from "../../boton/boton-componente/Boton";
import { ContenedorBoton } from "../../pantalla-ingreso-de-poliza/pantalla-ingreso-de-poliza-componente/PantallaIngresoDePoliza.styled";
import useAlerta from "../../../utils/useAlerta";
import { Alerta } from "../../alerta";
import {
  EnlaceAlerta,
  ParrafoAlerta,
} from "../../pantalla-indemnizacion-opciones/pantalla-indemnizacion-componente/PantallaIndemnizacion.styled";
import { EnvolvedorImagen } from "../../acordeon-registro-poliza/acordeon-registro-poliza-componente/AcordeonRegistroPoliza.styled";
import IcoHelp from "../../../recursos/iconos/Insumos PT/help.svg";
import { Subtitulo3Negritas } from "../../componentes-styled-compartidos/Textos";
import Taller from "../../taller";
import IngresoTaller from "../../ingreso-taller";
import Valuacion from "../../valuacion";
import {
  IGuardarTipoAtencion,
  IObtenerTipoAtencion,
} from "../../../interfaces/indemnizacion/Iindemnizacion";
import { IRedux } from "../../../interfaces/Redux/IRedux";
import AlertaDaniosGlobales from "../../Alerta-danios-globales";
import "../styles.scss";
import constantes from "../../../recursos/constantes";
import BarraAlerta from "../../barra-alerta";
import { stringify } from "json5";
import IndicadorCarga from "../../indicador-carga";
import configs from "../../../utils/configs";
import { Console } from "console";
import { IEventosNotificaciones } from "../../../interfaces/Graphql/IEventosNotificaciones";

interface IProps {
  desplegarSecciones: boolean;
  tipoAtencionP?: string;
  resultadoValuacion?: string;
  esRobo: boolean;
  vehiculoRecuperado: boolean;
}

const GUARDAR_TIPO_ATENCION = loader(
  "../../../graphQL/mutation/indemnizacion/indemnizacion_guardarTipoAtencion.graphql"
);

const DERIVAR_PT = loader(
  "../../../graphQL/mutation/indemnizacion/indemnizacion_derivacion_pt.graphql"
);

const DERIVAR_DG_DP = loader(
  "../../../graphQL/mutation/indemnizacion/indemnizacion_derivacion_dg_dp.graphql"
);

// const OBTENER_TIPO_ATENCION = loader(
//   "../../../graphQL/query/indemnizacion/indemnizacion_obtenerSeleccionTipoAtencion.graphql"
// );

const configAlertaPT = {
  textoEncabezado: "Indemnización por pérdida total",
  tipoIcono: "perdida total",
  colorAlerta: "amarillo",
  etiquetaBoton: "Confirmar",
  etiquetaBoton2: "Conservar mi vehículo",
};

const configAlertaToolTip = {
  textoEncabezado: "Pérdida total de mi vehículo",
  tipoIcono: "perdida total",
  colorAlerta: "amarillo",
  etiquetaBoton: "Comenzar indemnización",
};

const configAlertaToolTipRoboTotal = {
  textoEncabezado: "Robo total de mi vehículo",
  tipoIcono: "robo total",
  colorAlerta: "amarillo",
  etiquetaBoton: "Comenzar indemnización",
};

const configAlertaToolTipRoboTotalConfirmar = {
  textoEncabezado: "Indemnización por robo total",
  tipoIcono: "robo total",
  colorAlerta: "amarillo",
  etiquetaBoton: "Confirmar",
};

const configConfirmarDanios = {
  textoEncabezado: "Indemnización por daños globales",
  tipoIcono: "danios globales",
  colorAlerta: "rojo",
  etiquetaBoton2: "Siguiente",
};

const configConfirmarDanios2: any = {
  textoEncabezado: "Indemnización por daños globales",
  tipoIcono: "danios globales",
  colorAlerta: "rojo",
  etiquetaBoton2: "Asistencia HDI",
};

/**
 * Esta validación va a revisar la propiedad showDaniosGlobales para habiliarla si esta el true
 */
if (configs.showDaniosGlobales) {
  configConfirmarDanios2["etiquetaBoton"] = "Solicitar pago de daños globales"
}

const nombreCookie = constantes.nombreDeCookie;

export const SeccionPresencial = ({
  desplegarSecciones,
  tipoAtencionP = "",
  resultadoValuacion = "",
  esRobo = false,
  vehiculoRecuperado = false,
}: IProps) => {
  const estadoApp = useSelector((state: IRedux) => state);
  const { tipoAtencionIndemnizacion } = estadoApp;
  const history = useHistory();

  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];

  const [cargando, asignarValorCargando] = useState(false);

  const [datosTaller] = useState<any>(
    estadoApp?.datosTaller && estadoApp?.datosTaller.data
      ? estadoApp?.datosTaller.data
      : []
  );

  const [datosIngresoTaller] = useState<any>(
    estadoApp?.datosIngresoTaller && estadoApp?.datosIngresoTaller.data
      ? estadoApp?.datosIngresoTaller.data
      : []
  );

  const [datosValuacion] = useState<any>(
    estadoApp?.datosValuacion && estadoApp?.datosValuacion.data
      ? estadoApp?.datosValuacion.data
      : estadoApp.datosValuacionMontos && estadoApp.datosValuacionMontos.data
        ? estadoApp.datosValuacionMontos?.data
        : []
  );

  const [mostrarBotones, setMostrarBotones] = useState(true);

  const [esPT, setEsPT] = useState(resultadoValuacion === "Pérdida total");

  // ! GraphQL
  const [
    guardarTipoAtencion,
    {
      data: dataGuardarTipoAtencion,
      loading: loadingGuardarTipoAtencion,
      error: errorGuardarTipoAtencion,
    },
  ] = useMutation<IGuardarTipoAtencion>(GUARDAR_TIPO_ATENCION, {
    fetchPolicy: "no-cache",
  });

  const [
    derivarPT,
    {
      data: dataDerivarPT,
      loading: loadingDerivarPT,
      error: errorDerivarPT
    },
  ] = useMutation<any>(DERIVAR_PT, {
    fetchPolicy: "no-cache",
  });

  const [
    derivarDGDP,
    {
      data: dataDerivarDGDP,
      loading: loadingDerivarDGDP,
      error: errorDerivarDGDP,
    },
  ] = useMutation<any>(DERIVAR_DG_DP, {
    fetchPolicy: "no-cache",
  });

  const alertaConfirmarPT = useAlerta(configAlertaPT);
  const alertaToolTip = useAlerta(configAlertaToolTip);
  const alertaToolTipRoboTotal = useAlerta(configAlertaToolTipRoboTotal);
  const alertaToolTipRoboTotalConfirmar = useAlerta(configAlertaToolTipRoboTotalConfirmar);
  const alertaConfirmarDanios = useAlerta(configConfirmarDanios);
  const alertaConfirmarDanios2 = useAlerta(configConfirmarDanios2);

  const comenzarIndemnizacion = () => {
    if (esPT) {
      alertaConfirmarPT.mostrar();
    } else {
      alertaConfirmarDanios2.mostrar();
    }
  }

  const comenzarIndemnizacionRobo = () => {
    abrirModalConfirmarIndemnizacionRobo();
  };

  const conocerDetalleRobo = () => {
    if (mostrarBotones) {
      history.push({
        pathname: "indemnizacion-opciones",
        search: `?tipoAtencion=RT`,
      });
    }
  }

  const openToolTip = () => alertaToolTip.mostrar();

  const openToolTipRobo = () => alertaToolTipRoboTotal.mostrar();

  const abrirModalConfirmarIndemnizacionRobo = () => alertaToolTipRoboTotalConfirmar.mostrar();

  const abrirModalDaniosGlobales2 = () => {
    alertaConfirmarPT.cerrar();
    alertaConfirmarDanios.cerrar();
    alertaConfirmarDanios2.mostrar();
  };

  const abrirModalDanios = () => {
    alertaConfirmarPT.cerrar();
    alertaConfirmarDanios.mostrar();
  };

  const redireccionIndemnizacion = () => {
    if (mostrarBotones) {
      let queryParam = esPT ? 'PT' : 'DG&proceso=globales';
      history.push({
        pathname: "indemnizacion-opciones",
        search: `?tipoAtencion=${queryParam}`,
      });
    }
  };

  const guardarIndemnizacion = (tipoAtencion: number) => {
    if (mostrarBotones) {
      asignarValorCargando(true);
      guardarTipoAtencion({
        variables: {
          tipoAtencion,
          numeroReporte: estadoApp?.datosReporteCompleto?.numeroReporte || estadoApp?.datosReporte?.numeroReporte.toString(),
          numeroSiniestro: estadoApp?.datosReporteCompleto?.numeroSiniestro || estadoApp?.numeroSiniestro || estadoApp?.numeroSiniestroReporte,
          token: objetoCookie.access_token,
        },
      });
      return;
    }
  };

  const llamarCabina = () => {
    window.location.href = "tel:*434";
  }

  const validarSolicitarDG = () => {
    if (esPT) {
      // !Cuando es pt quiere decir que quiere cambiar a daños globales por lo que se manda a llamar a cabina
      llamarCabina();
    } else {
      // !Aquí entro directamente de un reporte de daños globales por lo que se aplica la selección de tipo atención DG => 2
      guardarIndemnizacion(2);
    }
  }

  const irAsistenciaHDI = () => {
    history.push({
      pathname: "/asistencia-hdi",
      state: {
        tipoAtencion: "robo"
      },
    });
  };

  useEffect(() => {
    if (tipoAtencionIndemnizacion !== "") {
      if (tipoAtencionIndemnizacion === "No seleccionado") {
        setMostrarBotones(true);
        return;
      }
      setMostrarBotones(false);
    }
  }, [tipoAtencionIndemnizacion]);

  useEffect(() => {
    if (loadingDerivarPT) {
      asignarValorCargando(true);
    }
    if (!loadingDerivarPT) {
      asignarValorCargando(false);
    }
    if (!loadingDerivarPT && dataDerivarPT) {
      // Agregar al localstorage para que se muestre la barra de alerta
      localStorage.setItem('mostrarAlertaIndemnizacion', "1");
      console.log(dataDerivarPT, errorDerivarPT);
      window.location.reload();
    }
  }, [dataDerivarPT, loadingDerivarPT, errorDerivarPT]);
  
  useEffect(() => {
    if (loadingDerivarDGDP) {
      asignarValorCargando(true);
    }
    if (!loadingDerivarDGDP) {
      asignarValorCargando(false);
    }
    if (!loadingDerivarDGDP && dataDerivarDGDP) {
      //Agregar al localstorage para que se muestre la barra de alerta de reparación
      localStorage.setItem('mostrarAlertaReparacion', "1");
      console.log(dataDerivarDGDP, errorDerivarDGDP);
      window.location.reload();
    }
  }, [dataDerivarDGDP, loadingDerivarDGDP, errorDerivarDGDP]);

  useEffect(() => {
    if (
      !loadingGuardarTipoAtencion &&
      dataGuardarTipoAtencion?.indemnizacion_guardarTipoAtencion?.completado
    ) {
      // !Si es robo no se aplica ninguna validación ya que no hay derivación para robo
      if (!esRobo) {
        // !Validamos si es pt mandamos la derivación sin el id
        if (esPT) {
          derivarPT({
            variables: {
              numeroReporte: estadoApp?.datosReporteCompleto?.numeroReporte || estadoApp?.datosReporte?.numeroReporte.toString(),
              token: objetoCookie.access_token,
            }
          });
        } else {
          // !No es pt por lo que se deriva en otro servicio
          derivarDGDP({
            variables: {
              coberturaPoliza: 6,
              numeroReporte: estadoApp?.datosReporteCompleto?.numeroReporte || estadoApp?.datosReporte?.numeroReporte.toString(),
              token: objetoCookie.access_token,
            }
          });
        }
      } else {
        localStorage.setItem('mostrarAlertaIndemnizacion', "1");
        window.location.reload();
      }
    }

    if(loadingGuardarTipoAtencion) {
      asignarValorCargando(true);
    }
    if(!loadingGuardarTipoAtencion) {
      asignarValorCargando(false);
    }

  }, [loadingGuardarTipoAtencion, dataGuardarTipoAtencion, errorGuardarTipoAtencion]);

  return (
    <>
      {cargando ? <IndicadorCarga pantallaCompleta /> : null}
      <Alerta
        {...alertaConfirmarPT}
        manejarCierre={alertaConfirmarPT.cerrar}
        funcionLlamadaBoton={() => guardarIndemnizacion(1)}
        funcionLlamadaBoton2={abrirModalDanios}
      >
        <ParrafoAlerta>
          Es importante que sepas que en este proceso la compañía conservará el
          vehículo.
          <br />
        </ParrafoAlerta>
        <EnlaceAlerta onClick={() => { redireccionIndemnizacion(); }}>Ver más información</EnlaceAlerta>
        <ParrafoAlerta>
          ¿Deseas confirmar el pago de indemnización por pérdida total?
        </ParrafoAlerta>
      </Alerta>

      {/* Este componnete tiene 2 alertas, por lo que para ahorrar recursos se separo en uno solo */}
      <AlertaDaniosGlobales
        alertaConfirmarDanios={alertaConfirmarDanios}
        alertaConfirmarDanios2={alertaConfirmarDanios2}
        abrirModalDaniosGlobales2={abrirModalDaniosGlobales2}
        alConfirmarPagoDanios={validarSolicitarDG}
        bieneDG={!esPT}
      />

      <Alerta
        {...alertaToolTip}
        manejarCierre={alertaToolTip.cerrar}
        funcionLlamadaBoton={redireccionIndemnizacion}
      >
        <ParrafoAlerta>
          Lamentablemente, tu vehículo ha sido declarado como pérdida total, ya
          que los daños representan más del 75% del valor de la unidad.
          <br />
        </ParrafoAlerta>
        <Subtitulo3Negritas>¡Comienza tu proceso!</Subtitulo3Negritas>
        <ParrafoAlerta>
          y recibe tu indemnización de manera rápida y sencilla
        </ParrafoAlerta>
      </Alerta>

      <Alerta
        {...alertaToolTipRoboTotal}
        manejarCierre={alertaToolTipRoboTotal.cerrar}
        funcionLlamadaBoton={() => {
          alertaToolTipRoboTotal.cerrar();
          alertaToolTipRoboTotalConfirmar.mostrar();
        }}
      >
        <ParrafoAlerta>
          Lamentablemente, tu vehículo ha sido declarado como pérdida total, por robo.
        </ParrafoAlerta>
        <br />
        <ParrafoAlerta>
          ¡Comienza tu proceso! y recibe tu indemnización de manera rápida y sencilla.
        </ParrafoAlerta>
      </Alerta>

      <Alerta
        {...alertaToolTipRoboTotalConfirmar}
        manejarCierre={alertaToolTipRoboTotalConfirmar.cerrar}
        funcionLlamadaBoton={() => {
          guardarIndemnizacion(1)
        }}
      >
        <ParrafoAlerta>
          Es importante que sepas que, al término del proceso de indemnización cederás los derechos del vehículo a HDI Seguros.
        </ParrafoAlerta>
        <br />
        <ParrafoAlerta>
          ¿Deseas confirmar el pago de indemnización de Pérdida Total por Robo?
        </ParrafoAlerta>
      </Alerta>

      <Secciones desplegado={desplegarSecciones}>
        {esRobo && (
          <>
            <Seccion
              titulo="Estimación del robo"
              pendiente={false}
            >
              {resultadoValuacion === "no procede" ? (
                <>
                  <ResolucionValor>
                    Resultado: El tiempo de verificación de tu siniestro ha concluido, acude a alguna de nuestras oficinas para darte algunas opciones que puedes hacer.
                  </ResolucionValor>
                  <EnlaceRegistroBienvenida style={{ marginBottom: "20px" }}>
                    <EnlaceBienvenida
                      id="enlaceRegistro"
                      enlace
                      onClick={() => { irAsistenciaHDI(); }}
                    >
                      Contacto HDI
                    </EnlaceBienvenida>
                  </EnlaceRegistroBienvenida>
                </>
              ) : (
                <>
                  <ResolucionValor>
                    Resultado: Robo total {" "}
                    {esRobo && mostrarBotones && (
                      <EnvolvedorImagen
                        src={IcoHelp}
                        style={{ width: "15px", cursor: "pointer" }}
                        onClick={openToolTipRobo}
                      />
                    )}
                  </ResolucionValor>
                  {mostrarBotones ? (
                    <>
                      <ContenedorBoton style={{ marginBottom: "10px" }}>
                        <Boton
                          customClass="boton-boton--valuacion"
                          etiqueta={"Solicitar indemnización"}
                          tema="estandar"
                          pequeno
                          enClick={comenzarIndemnizacionRobo}
                        />
                      </ContenedorBoton>
                      {vehiculoRecuperado && (
                        <ContenedorBoton>
                          <Boton
                            customClass="boton-boton--valuacion"
                            etiqueta={"Solicitar reparación"}
                            tema="simple"
                            pequeno
                            enClick={() => {
                              window.location.href = "tel:*434";
                            }}
                            />
                        </ContenedorBoton>
                      )}
                      <EnlaceRegistroBienvenida style={{ marginBottom: "20px" }}>
                        <EnlaceBienvenida
                          id="enlaceRegistro"
                          enlace
                          onClick={conocerDetalleRobo}
                        >
                          Conocer detalle
                        </EnlaceBienvenida>
                      </EnlaceRegistroBienvenida>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </Seccion>
          </>
        )}
        {!esRobo && (
          <>
            {/* Centro de reparaciones - ubicación */}
            <Seccion
              titulo="Centro de reparación"
              pendiente={datosTaller.length === 0}
            >
              <ResolucionCampo>Tipo atención</ResolucionCampo>
              <ResolucionValor>{tipoAtencionP}</ResolucionValor>
              <Taller taller={datosTaller} />
            </Seccion>

            {/* Ingreso al centro de reparación */}
            <Seccion
              titulo="Ingreso al centro de reparación"
              pendiente={datosIngresoTaller.length === 0}
            >
              <IngresoTaller datosIngresoTaller={datosIngresoTaller} />
            </Seccion>

            {/* Valuación o estimación de daños */}
            <Seccion
              titulo="Estimación de daños"
              pendiente={datosValuacion.length === 0}
            >
              <ResolucionValor>
                <Valuacion datosValuacion={datosValuacion} />
                Resultado de la valuación: {resultadoValuacion}
                {esPT && mostrarBotones && (
                  <EnvolvedorImagen
                    src={IcoHelp}
                    style={{ width: "15px", cursor: "pointer" }}
                    onClick={openToolTip}
                  />
                )}
              </ResolucionValor>
              {/* Footer - botones de acciones */}

              {mostrarBotones ? (
                <>
                  <ContenedorBoton style={{ marginBottom: "10px" }}>
                    <Boton
                      customClass="boton-boton--valuacion"
                      etiqueta={esPT ? "Confirmar pérdida total" : "Confirmar pago de daños globales"}
                      tema="estandar"
                      pequeno
                      enClick={comenzarIndemnizacion}
                    />
                  </ContenedorBoton>
                  <ContenedorBoton>
                      <Boton
                        customClass="boton-boton--valuacion"
                        etiqueta={esPT ? "Solicitar daños globales" : "Solicitar pérdida total"}
                        tema="simple"
                        pequeno
                        enClick={() => {
                          window.location.href = "tel:*434";
                        }}
                        />
                    </ContenedorBoton>
                    <EnlaceRegistroBienvenida style={{ marginBottom: "20px" }}>
                      <EnlaceBienvenida
                        id="enlaceRegistro"
                        enlace
                        onClick={redireccionIndemnizacion}
                      >
                        Conocer detalle
                      </EnlaceBienvenida>
                    </EnlaceRegistroBienvenida>
                </>
              ) : (
                <></>
              )}
            </Seccion>
          </>
        )}
      </Secciones>
    </>
  );
};
