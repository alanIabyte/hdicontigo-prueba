/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect, lazy, Suspense, memo } from "react";
import { v4 } from "uuid";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import { useCookies } from "react-cookie";
import {
  EnvolvedorPantallaPolizas,
  PantallaFondoGris,
  ContenedorPolizas,
  TituloMisPolizas,
  ContenedorBuscadorPolizas,
  BuscadorPolizas,
  PieDePaginaMisPolizas,
  ContenedorBoton,
  ContenedorSinSiniestros,
  EtiquetaBuscador,
} from "./PantallaMisPolizas.styled";
import EncabezadoPolizasSiniestradas from "../../encabezado-polizas-siniestradas";
import Boton from "../../boton";
import BarraAlerta from "../../barra-alerta";
import IndicadorCarga from "../../indicador-carga";
import { PolizaLoader, PolizaLoaderResponsive } from "../../loaders";
import { ReactComponent as IconoCarro } from "../../../recursos/iconos/ico_carro_ok.svg";
import useValidateLogin from "../../../utils/useValidateLogin";
import useRedirect from "../../../utils/useRedirect";
import useAccionesLog from "../../../utils/useAccionesLog";
import {
  EnvolvedorIcono,
  EnvolvedorImagen,
} from "../../pantalla-mis-reembolsos/pantalla-mis-reembolsos-componente/PantallaMisReembolsos.styled";
import IconHelp from "../../../recursos/iconos/ico_help.svg";
import useAlerta from "../../../utils/useAlerta";
import { configAlertaRegistroVigencia } from "./configs";
import MenuBottomComponente from "../../menu-bottom";
import { validaDispositivoCelular } from "../../../utils/validaDispositivo";
import { Pantalla } from "../../componentes-styled-compartidos/Pantalla.styled";
import EncabezadoSimple from "../../encabezado-simple";
import constantes from "../../../recursos/constantes";

const Poliza = lazy(() => import("../../poliza"));
const Alerta = lazy(() => import("../../alerta/alerta-componente/Alerta"));

const OBTENER_POLIZAS_COBRANZA = loader(
  "../../../graphQL/query/cobranza/cobranza_consultaPolizasCobranza.graphql"
);

const OBTENER_DIAS_GRACIA = loader(
  "../../../graphQL/query/cobranza/cobranza_consultaDiasGracia.graphql"
);

const INACTIVA_POLIZA_COBRANZA = loader(
  "../../../graphQL/query/cobranza/cobranza_inactivaPolizaCliente.graphql"
);

const diccionario = {
  titulo: "Mis Pólizas",
  busqueda: "Ingresa tu póliza",
  etiquetaBotonAgregar: "Agregar póliza",
  sinPolizas1: "No tienes pólizas",
  sinPolizas2: "registradas",
  mensajeDeErrorDefault:
    "Tu solicitud no pudo ser procesada, por favor contacta a tu agente.",
  mensajePolizasCercaCancelar:
    "Tienes pólizas a cancelar en los próximos días.",
  errorCancelar: "No se puede borrar la poliza.",
};

const valores = {
  busqueda: "",
};

const nombreCookie = constantes.nombreDeCookie;

const PantallaMisPolizas = () => {
  const screenWidth = screen.width;
  const estadoApp = useSelector((estado) => estado);
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  const [cargando, asignarValorCargando] = useState(true);
  const { runCancelLog } = useAccionesLog(
    estadoApp.informacionContacto ? estadoApp.informacionContacto.telefono : ""
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const { user: usuario, validateUser } = useValidateLogin();
  const alertRegistroTardio = useAlerta(configAlertaRegistroVigencia);
  const { redirectRoot, redirect } = useRedirect("/registro-poliza");
  if (!validateUser) {
    redirectRoot();
  }

  const [alertaFuncionesLimitadas, setAlertaFuncionesLimitadas] =
    useState(false);
  const [mostrarBarraAlerta, asignarValorMostrarBarraAlerta] = useState(false);
  const [mensajeAlerta, asignarValorMensajeAlerta] = useState(
    diccionario.mensajeDeErrorDefault
  );
  const [tipoMensajeAlerta, asignarValorTipoMensajeAlerta] = useState("error");
  const [polizasEncontradas, asignarValorPolizasEncontradas] = useState([]);
  const [mostrarEliminarConfirmacion, setMostrarEliminarConfirmacion] =
    useState(false);
  const [modalDesactivaPolizaSucces, setModalDesactivaPolizaSuccess] =
    useState(false);

  const {
    data: polizas,
    loading: loadingPolizas,
    refetch: refetchPolizas,
  } = useQuery(OBTENER_POLIZAS_COBRANZA, {
    variables: {
      telefono: usuario,
      token: objetoCookie.access_token,
    },
    fetchPolicy: "cache-first",
  });

  const {
    data: dataDias,
    loading: enCargaDias,
    refetch: refetchDiasGracia,
    error: errorDias,
  } = useQuery(OBTENER_DIAS_GRACIA, {
    variables: { telefono: usuario },
    fetchPolicy: "no-cache",
  });

  const [inactivarPoliza, { loading, error, data }] = useLazyQuery(
    INACTIVA_POLIZA_COBRANZA,
    {
      fetchPolicy: "no-cache",
    }
  );

  const [listaDiasGracia, asignarValorDiasGracia] = useState(
    dataDias?.cobranza_consultaDiasGracia?.dato || []
  );

  // const darFormatoFecha = (fecha) => new Date(fecha).toLocaleDateString();

  useEffect(() => {
    dispatch({
      type: "AGREGAR",
      valor: [],
      indice: "recibosPorPagar",
    });
    dispatch({
      type: "AGREGAR",
      valor: false,
      indice: "mantenerCoberturasAbierto",
    });
    dispatch({
      type: "AGREGAR",
      valor: false,
      indice: "funcionesLimitadasDomiciliacion",
    });
  }, []);

  const [verMenuInferior, setVerMenuInferior] = useState(false);

  useEffect(() => {
    setVerMenuInferior(validaDispositivoCelular());
    // asignarValorCargando(true);
    valores.busqueda = "";
  }, []);

  useEffect(() => {
    if (location.state) {
      if (!location.state.completo) {
        runCancelLog(3);
      }
    }
  }, []);

  const formatoPolizaAuto = (poliza) => {
    const faltantes = 10 - poliza.split("-")[1].length;
    const objString = [];
    for (let i = 0; i < poliza.split("-")[1].length; i += 1) {
      objString.push(poliza.split("-")[1].charAt(i));
    }

    for (let j = 0; j < faltantes; j += 1) {
      objString.unshift("0");
    }
    return objString.join("");
  };

  const eliminarPoliza = () => {
    const { lineaNegocio, poliza } = estadoApp.datosPolizaDesactivar;
    // console.log(lineaNegocio, poliza);
    const faltantes = 5 - poliza.split("-")[0].length;
    const objString = [];
    for (let i = 0; i < poliza.split("-")[0].length; i += 1) {
      objString.push(poliza.split("-")[0].charAt(i));
    }

    for (let j = 0; j < faltantes; j += 1) {
      objString.unshift("0");
    }

    let numPoliza = poliza;
    if (lineaNegocio === "AUTR") {
      numPoliza = formatoPolizaAuto(poliza);
    }

    if (lineaNegocio === "GMM") {
      inactivarPoliza({
        variables: {
          lineaNegocio: "GMM",
          numeroPoliza: poliza,
          cis: 1,
          numeroTelefono: usuario,
          agencia: "00003",
          correo:
            estadoApp?.informacionContacto?.email || `${usuario}@cambiaremail`,
          token: objetoCookie.access_token,
        },
      });
    } else {
      console.log(objetoCookie);
      inactivarPoliza({
        variables: {
          lineaNegocio,
          numeroPoliza:
            lineaNegocio === "AUTR" ? numPoliza : poliza.split("-")[1],
          cis: poliza.split("-")[2],
          numeroTelefono: usuario,
          agencia: objString.join(""),
          correo:
            estadoApp?.informacionContacto?.email || `${usuario}@cambiaremail`,
          token: objetoCookie.access_token,
        },
      });
    }
  };

  const desactivarPoliza = (lineaNegocio, poliza) => {
    //  console.log("desactivar poliza");
    dispatch({
      type: "AGREGAR",
      valor: { lineaNegocio, poliza },
      indice: "datosPolizaDesactivar",
    });
    setMostrarEliminarConfirmacion(true);
  };

  useEffect(() => {
    if (
      !loadingPolizas &&
      polizas &&
      polizas.cobranza_consultaPolizasCobranza
    ) {
      asignarValorCargando(false);
      refetchDiasGracia({
        telefono: usuario,
      });
    } else if (loadingPolizas) {
      // asignarValorCargando(true);
    }
  }, [polizas, loadingPolizas]);

  useEffect(() => {
    if (enCargaDias) {
      asignarValorCargando(true);
    }

    if (!enCargaDias && dataDias && dataDias.cobranza_consultaDiasGracia) {
      const listaDias = dataDias.cobranza_consultaDiasGracia.dato;
      if (!listaDias) {
        asignarValorCargando(false);
        console.log("No hay dias de gracia");
        dispatch({
          type: "AGREGAR",
          valor: false,
          indice: "funcionesLimitadasDomiciliacion",
        });
        return;
      }

      asignarValorCargando(false);
      asignarValorDiasGracia(dataDias.cobranza_consultaDiasGracia.dato);

      if (listaDias.some((el) => el.notificacionDias.split(" ")[1] < 15)) {
        asignarValorMensajeAlerta(diccionario.mensajePolizasCercaCancelar);
        asignarValorTipoMensajeAlerta("");
        asignarValorMostrarBarraAlerta(true);
      }
      dispatch({
        type: "AGREGAR",
        valor: false,
        indice: "funcionesLimitadasDomiciliacion",
      });
      asignarValorCargando(false);
    }

    if (!enCargaDias && !dataDias) {
      asignarValorCargando(false);
      setAlertaFuncionesLimitadas(true);
      dispatch({
        type: "AGREGAR",
        valor: true,
        indice: "funcionesLimitadasDomiciliacion",
      });
      return;
    }

    if (!enCargaDias && errorDias) {
      asignarValorCargando(false);
      setAlertaFuncionesLimitadas(true);
      dispatch({
        type: "AGREGAR",
        valor: true,
        indice: "funcionesLimitadasDomiciliacion",
      });
    }
  }, [dataDias, enCargaDias, errorDias]);

  useEffect(() => {
    if (!loading && data && data.cobranza_inactivaPolizaCliente) {
      const resp = data?.cobranza_inactivaPolizaCliente;
      if (!resp.completado) {
        // En caso de negacion
        asignarValorCargando(false);
        asignarValorMensajeAlerta(resp.mensaje);
        setMostrarEliminarConfirmacion(false);
        asignarValorTipoMensajeAlerta("error");
        asignarValorMostrarBarraAlerta(true);
        dispatch({
          type: "BORRAR",
          indice: "datosPolizaDesactivar",
        });
        refetchPolizas({ telefono: usuario });
        return;
      }

      if (resp.completado) {
        if (resp.mensaje === diccionario.errorCancelar) {
          refetchPolizas({ telefono: usuario });
          refetchDiasGracia({
            telefono: usuario,
          });
          asignarValorCargando(false);
          asignarValorMensajeAlerta(resp.mensaje);
          setMostrarEliminarConfirmacion(false);
          asignarValorTipoMensajeAlerta("error");
          asignarValorMostrarBarraAlerta(true);
          dispatch({
            type: "BORRAR",
            indice: "datosPolizaDesactivar",
          });
          return;
        }

        // refetchPolizas({ telefono: usuario });
        refetchPolizas({ telefono: usuario });
        asignarValorCargando(true);
        refetchDiasGracia({
          telefono: usuario,
        });
        setMostrarEliminarConfirmacion(false);
        setModalDesactivaPolizaSuccess(true);
        dispatch({
          type: "BORRAR",
          indice: "datosPolizaDesactivar",
        });
      }
    }

    if (loading) {
      asignarValorCargando(true);
      setMostrarEliminarConfirmacion(false);
      dispatch({
        type: "BORRAR",
        indice: "datosPolizaDesactivar",
      });
      return;
    }

    if (error) {
      asignarValorCargando(false);
      setMostrarEliminarConfirmacion(false);
      dispatch({
        type: "BORRAR",
        indice: "datosPolizaDesactivar",
      });
    }
  }, [loading, data, error]);

  const alCambiarBusqueda = (evento) => {
    if (evento) {
      valores.busqueda = evento.target.value.toUpperCase();
      const polizasFiltradas =
        polizas?.cobranza_consultaPolizasCobranza?.dato.filter(
          (poliza) =>
            poliza.descripcion.toUpperCase().includes(valores.busqueda) ||
            poliza.polizaFormato.includes(valores.busqueda) ||
            poliza.lineaNegocio.toUpperCase().includes(valores.busqueda)
        );
      asignarValorPolizasEncontradas(polizasFiltradas);
    }
  };

  const alClickearFoto = () => {};

  useEffect(() => {
    if (polizas?.cobranza_consultaPolizasCobranza?.dato) {
      if (
        location.state &&
        location.state.paginaAnterior === "/mis-reembolsos"
      ) {
        valores.busqueda = "GMM";
        const polizasFiltradas =
          polizas?.cobranza_consultaPolizasCobranza?.dato.filter(
            (poliza) => poliza.lineaNegocio === "GMM"
          );
        asignarValorPolizasEncontradas(polizasFiltradas);
        return;
      }

      if (location.state && location?.state?.busqueda) {
        valores.busqueda = "AUTR";
        const polizasFiltradas =
          polizas?.cobranza_consultaPolizasCobranza?.dato.filter(
            (poliza) => poliza.lineaNegocio === "AUTR"
          );
        asignarValorPolizasEncontradas(polizasFiltradas);
        return;
      }

      const res = polizas?.cobranza_consultaPolizasCobranza?.dato;
      asignarValorPolizasEncontradas(res);
    }
  }, [polizas]);

  return (
    <EnvolvedorPantallaPolizas key={v4()}>
      {cargando ? <IndicadorCarga /> : null}

      {verMenuInferior && <EncabezadoSimple />}

      {!verMenuInferior && (
        <EncabezadoPolizasSiniestradas mostrarMenu={!verMenuInferior} />
      )}
      <PantallaFondoGris>
        <BarraAlerta
          etiqueta={mensajeAlerta}
          mostrarAlerta={mostrarBarraAlerta}
          manejarCierre={() => {
            asignarValorMostrarBarraAlerta(false);
          }}
          estilo={tipoMensajeAlerta}
          posicionAbsoluta
        />
        <Suspense fallback={null}>
          <Alerta
            mostrarModal={mostrarEliminarConfirmacion}
            colorAlerta="rojo"
            textoEncabezado="¿Estas seguro de que quieres eliminar esta póliza?"
            temaBoton="estandar"
            temaBoton2="simple"
            tipoIcono="alerta"
            etiquetaBoton="Aceptar"
            etiquetaBoton2="Cancelar"
            manejarCierre={() => setMostrarEliminarConfirmacion(false)}
            funcionLlamadaBoton={() => eliminarPoliza()}
            funcionLlamadaBoton2={() => setMostrarEliminarConfirmacion(false)}
          />
          <Alerta
            mostrarModal={modalDesactivaPolizaSucces}
            colorAlerta="azul"
            textoEncabezado="Tu póliza se ha eliminado correctamente."
            temaBoton="estandar"
            tipoIcono="palomita"
            etiquetaBoton="Aceptar"
            manejarCierre={() => setModalDesactivaPolizaSuccess(false)}
            funcionLlamadaBoton={() => setModalDesactivaPolizaSuccess(false)}
          />
          <Alerta
            mostrarModal={alertaFuncionesLimitadas}
            colorAlerta="amarillo"
            textoEncabezado="Hemos tenido un problema al consultar tus días de gracia"
            textoCuerpo="Es probable que no tengas acceso completo a funciones como: domiciliación de la póliza. <br > Pero podrás ver el estado de la domiciliación y datos bancarios."
            etiquetaBoton="Entiendo"
            funcionLlamadaBoton={() => setAlertaFuncionesLimitadas(false)}
            manejarCierre={() => setAlertaFuncionesLimitadas(false)}
          />
          <Alerta
            {...alertRegistroTardio}
            manejarCierre={alertRegistroTardio.cerrar}
            funcionLlamadaBoton={alertRegistroTardio.cerrar}
          />
        </Suspense>
        <ContenedorPolizas polizas={0}>
          <EnvolvedorImagen
            src={IconHelp}
            style={{
              cursor: "pointer",
              width: "20px",
              marginBottom: "15px",
              position: "relative",
              top: "42px",
              left: "120px",
              display: "inherit",
            }}
            onClick={alertRegistroTardio.mostrar}
          />{" "}
          <TituloMisPolizas id="titulo">{diccionario.titulo}</TituloMisPolizas>
          <ContenedorBuscadorPolizas>
            {/* <IconoLupa style={{ fontSize: 20 }} /> */}
            <EtiquetaBuscador>Buscar Póliza</EtiquetaBuscador>
            <BuscadorPolizas
              placeholder={diccionario.busqueda}
              defaultValue={valores.busqueda}
              onChange={alCambiarBusqueda}
              autoFocus={valores.busqueda !== ""}
            />
          </ContenedorBuscadorPolizas>
          {polizasEncontradas?.length === 0 && !loadingPolizas && (
            <ContenedorSinSiniestros>
              <IconoCarro> </IconoCarro>
              <br />
              {diccionario.sinPolizas1}
              <br />
              {diccionario.sinPolizas2}
            </ContenedorSinSiniestros>
          )}
          {loadingPolizas &&
            polizasEncontradas.length === 0 &&
            screen.width > 425 && (
              <Suspense fallback={null}>
                <PolizaLoader />
              </Suspense>
            )}
          {loadingPolizas &&
            polizasEncontradas.length === 0 &&
            screenWidth <= 425 && (
              <Suspense fallback={null}>
                <PolizaLoaderResponsive />
              </Suspense>
            )}
          {polizasEncontradas?.map((poliza) => (
            <Suspense fallback={null}>
              <Poliza
                tipo={poliza.lineaNegocio}
                numeroPoliza={poliza.polizaFormato}
                nombrePoliza={poliza.descripcion}
                vigencia={poliza.fechaTermino}
                estatus={poliza.estatus}
                enClickEnFoto={alClickearFoto}
                datos={poliza}
                key={poliza.poliza}
                desactivar={desactivarPoliza}
                listaDiasGracia={listaDiasGracia}
                solicitarReembolsoButton={false}
                aplicaReembolso={poliza.aplicaReembolso}
              />
            </Suspense>
          ))}
        </ContenedorPolizas>
      </PantallaFondoGris>
      <PieDePaginaMisPolizas bottomSinBar={verMenuInferior ? "1" : "0"}>
        <ContenedorBoton>
          <Boton
            etiqueta={diccionario.etiquetaBotonAgregar}
            tema="estandar"
            enClick={() => {
              redirect({ paginaAnterior: "/mis-polizas" });
            }}
          />
        </ContenedorBoton>
      </PieDePaginaMisPolizas>
      {verMenuInferior ? <MenuBottomComponente /> : <></>}
    </EnvolvedorPantallaPolizas>
  );
};

export default memo(PantallaMisPolizas);
