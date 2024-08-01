/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { v4 } from "uuid";
import moment from "moment";
import "moment/locale/es-mx";
import IconoVisible from "@material-ui/icons/VisibilityRounded";
import IconoNoVisible from "@material-ui/icons/VisibilityOffRounded";
import { loader } from "graphql.macro";
import {
  useLazyQuery,
  useMutation,
  useSubscription,
} from "@apollo/react-hooks";
import { useCookies } from "react-cookie";
import Constantes from "../../../recursos/constantes";
import codigosError from "../recursos/codigosError6.json";
import {
  AlertaImagen,
  MensajeError,
  Titulo,
  SeparadorEspacio,
  ContenedorBoton,
} from "./PantallaRegistroUsuario.styled";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import Encabezado from "../../encabezado";
import Boton from "../../boton";
import BarraAlerta from "../../barra-alerta";
import CampoTexto from "../../campo-texto";
import PantallaIngresoDePolizaOcr from "../../pantalla-ingreso-de-poliza-ocr";
import { Alerta } from "../../alerta";
import IndicadorCarga from "../../indicador-carga";
import "react-dates/lib/css/_datepicker.css";
import "./estilos.scss";
import polizaImg from "../recursos/poliza1.png";
import serieImg from "../recursos/serie5.png";
import rfcImg from "../recursos/rfc4.png";
import rfcImgGmm from "../../../recursos/imagenes/img-rfc-gmm.jpg";
import polizaGmm from "../../../recursos/imagenes/img-poliza-gmm.jpg";
import polizaDanosImg from "../recursos/polizaDanos2.png";
import {
  validarContrasenia,
  validarPoliza,
  validarTelefono,
  validarRFC,
} from "../../../helpers";
import useAlerta from "../../../utils/useAlerta";
import {
  configAlertaGeolocation,
  configAlertaErrorGeolocation,
  diccionario,
} from "./config";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import useAccionesLog from "../../../utils/useAccionesLog";

const CamposRegistroGMM = lazy(() =>
  import(
    "../../pantalla-registro-usuario/pantalla-registro-usuario-componente/CamposRegistroGMM"
  )
);

const REGISTRAR_USUARIO_GMM = loader(
  "../../../graphQL/mutation/seguridad/seguridad_registraUsuarioGastosMedicos.graphql"
);

const SUSCRIPCION_NOTIFICACIONES = loader(
  "../../../graphQL/subscription/reporte/evento_actualizaciones_reportes.graphql"
);

const INICIAR_SESION = loader(
  "../../../graphQL/mutation/seguridad/iniciar_sesion.graphql"
);
const { nombreDeCookie } = Constantes;

const valores = {
  poliza: "",
  inciso: "",
  rfc: "",
  telefono: "",
  contrasenia: "",
  confirmarContrasenia: "",
};

// !! ======= Definicio del componente
const PantallaRegistroGMM = (props) => {
  const { tipoPolizaButton } = props;
  const dispatch = useDispatch();
  const alertaGeolocation = useAlerta(configAlertaGeolocation);
  const alertaErrorGeolocation = useAlerta(configAlertaErrorGeolocation);
  const { runEnterLog, runCancelLog, runSuccesLog } = useAccionesLog("");
  const { poliza: polizaParam, rfc: rfcParam } = useParams();
  const history = useHistory();
  const estadoApp = useSelector((estado) => estado);
  const [cookie, establecerCookie] = useCookies([nombreDeCookie]);
  const objetoCookie = cookie[nombreDeCookie];
  const usuario =
    objetoCookie && objetoCookie.Usuario ? objetoCookie.Usuario : "0";
  console.log("");
  // otro más

  const [NumPolizaEstado, asignarValorNumPoliza] = useState(
    estadoApp.datosIngresoPolizaCobranza &&
      estadoApp.datosIngresoPolizaCobranza.poliza
      ? estadoApp.datosIngresoPolizaCobranza.poliza
      : ""
  );

  if (objetoCookie && objetoCookie.Usuario && objetoCookie.access_token) {
    const validado = estadoApp.usuarioValidado;
    if (!validado) {
      history.push("/registro-usuario-sms", {
        telefono: usuario,
      });
    }
  }

  if (
    NumPolizaEstado !== undefined &&
    (valores.poliza === "" || valores.poliza === undefined)
  ) {
    valores.poliza = NumPolizaEstado;
  }

  // !! ---------------------------- QUERY GRAPHQL GMM =======================================
  const [
    registrarUsuarioGMM,
    { loading: loadingGMM, error: errorGMM, data: dataGMM },
  ] = useLazyQuery(REGISTRAR_USUARIO_GMM, {
    fetchPolicy: "no-cache",
  });

  //! Suscripcion para las notificaciones
  const { data: eventosSubscripcion } = useSubscription(
    SUSCRIPCION_NOTIFICACIONES,
    {
      variables: { numeroReporte: 0 },
    }
  );

  const [iniciarSesion, { loading, error, data }] = useMutation(INICIAR_SESION);
  const [focoPoliza, asignarValorfocoPoliza] = useState("");
  const [focoRFC, asignarValorFocoRFC] = useState("");
  const [focoTelefono, asignarValorFocoTelefono] = useState("");
  const [focoInciso, asignarValorFocoInciso] = useState("");
  const [focoContrasenia, asignarValorFocoContrasenia] = useState("");
  const [focoConfirmarContrasenia, asignarValorFocoConfirmarContrasenia] =
    useState("");
  const [mostrarBarraAlerta, asignarValorMostrarBarraAlerta] = useState(false);
  const [mensajeAlerta, asignarValorMensajeAlerta] = useState(
    diccionario.mensajeDeErrorDefault
  );
  const [allowContrasenia, setAllowContrasenia] = useState(false);
  const [allowTelefono, setAllowTelefono] = useState(false);
  const [allowPoliza, setAllowPoliza] = useState(false);
  const [allowSerie, setAllowSerie] = useState(false);
  const [allowConfirmarContrasenia, setAllowConfirmarContrasenia] =
    useState(false);
  const [allowRFC, setAllowRFC] = useState(false);
  const [allowInciso, setAllowInciso] = useState(false);
  const [eventoRegistrar] = useState(false);
  const [mostrarLectorOcr, asignarValorMostrarLectorOcr] = useState(false);
  const [mostrarModalPoliza, asignarValorMostrarModalPoliza] = useState(false);
  const [mostrarModalSerie, asignarValorMostrarModalSerie] = useState(false);
  const [mostrarModalRFC, asignarValorMostrarModalRFC] = useState(false);
  const [mostrarModal, asignarValorMostrarModal] = useState(false);
  const [cargando, asignarValorCargando] = useState(false);
  const [errorPoliza, asignarErrorPoliza] = useState("");
  const [errorRFC, asignarErrorRFC] = useState("");
  const [errorTelefono, asignarErrorTelefono] = useState("");
  const [errorContrasenia, asignarErrorContrasenia] = useState("");
  const [errorConfirmarContrasenia, asignarErrorConfirmarContrasenia] =
    useState("");
  const [tipoPoliza] = useState(tipoPolizaButton);

  const [contrasenaVisible, asignarContrasenaVisible] = useState(true);
  const [confirmarContrasenaVisible, asignarConfirmarContrasenaVisible] =
    useState(true);

  const [polizaState, asignarPolizaState] = useState(polizaParam || "");
  const [rfcState, asignarRfcState] = useState(rfcParam || "");
  const [incisoState] = "1";

  const alCambiarNumeroDePoliza = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.poliza = valor;
    }
  };

  const alCambiarInciso = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.inciso = valor;
    }
  };

  const persistirNumSeriePoliza = () => {
    asignarValorNumPoliza(valores.poliza);
    asignarPolizaState(polizaParam || valores.poliza);
    asignarRfcState(rfcParam || valores.rfc);
    if (NumPolizaEstado !== "" && valores.poliza !== "") {
      asignarValorNumPoliza(valores.poliza);
      valores.poliza = NumPolizaEstado;
    }
  };

  const alCambiarRFC = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.rfc = valor;
    }
  };
  const alCambiarTelefono = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.telefono = valor;
    }
  };
  const alCambiarContrasenia = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.contrasenia = valor;
    }
  };
  const alCambiarConfirmarContrasenia = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.confirmarContrasenia = valor;
    }
  };

  const registrar = () => {
    persistirNumSeriePoliza();
    const { rfc } = valores;

    // Inicia proceso de obtención de geolocalizacion
    asignarValorCargando(true);
    const numPoliza = `3-${valores.poliza}-1`.trim();
    registrarUsuarioGMM({
      variables: {
        lineaNegocio: "GMM",
        numeroPoliza: numPoliza,
        rfc,
        numeroTelefono: valores.telefono,
        contrasena: `${valores.contrasenia}_1`,
        contrasenaConfirma: `${valores.confirmarContrasenia}_1`,
      },
    });
  };

  const hacerValidaciones = () => {
    const { poliza, rfc, telefono, contrasenia, confirmarContrasenia } =
      valores;
    persistirNumSeriePoliza();
    asignarValorMensajeAlerta("");
    asignarValorMostrarBarraAlerta(false);
    setAllowPoliza(false);
    setAllowSerie(false);
    setAllowRFC(false);
    setAllowInciso(false);
    setAllowTelefono(false);
    setAllowContrasenia(false);
    setAllowConfirmarContrasenia(false);

    validarPoliza(poliza, diccionario.errores, "GMM").then((respuesta) => {
      asignarValorfocoPoliza(respuesta.foco);
      asignarErrorPoliza(respuesta.error);
      setAllowPoliza(respuesta.valida);
    });

    validarRFC(rfc, diccionario.errores).then((respuesta) => {
      asignarValorFocoRFC(respuesta.foco);
      asignarErrorRFC(respuesta.error);
      setAllowRFC(respuesta.valida);
    });

    validarTelefono(telefono, diccionario.errores).then((respuesta) => {
      asignarValorFocoTelefono(respuesta.foco);
      asignarErrorTelefono(respuesta.error);
      setAllowTelefono(respuesta.valida);
    });

    validarContrasenia(contrasenia, diccionario.errores).then((respuesta) => {
      asignarValorFocoContrasenia(respuesta.foco);
      asignarErrorContrasenia(respuesta.error);
      setAllowContrasenia(respuesta.valida);
    });

    if (confirmarContrasenia.length > 8) {
      if (contrasenia === confirmarContrasenia) {
        asignarValorFocoConfirmarContrasenia("");
        asignarErrorConfirmarContrasenia("");
        setAllowConfirmarContrasenia(true);
      } else {
        asignarValorFocoConfirmarContrasenia("error");
        asignarErrorConfirmarContrasenia(
          diccionario.errores.contrasenaNoCoincide
        );
        setAllowConfirmarContrasenia(false);
      }
    } else {
      asignarValorFocoConfirmarContrasenia("error");
      asignarErrorConfirmarContrasenia(diccionario.errores.campoRequerido);
      setAllowConfirmarContrasenia(false);
    }

    // setEventoRegistrar(!eventoRegistrar);
  };

  // !! =========================== Aqui se realiza la ejecucion del query para registrar la poliza de GMM

  const irARegistroSMS = () => {
    dispatch({
      type: "AGREGAR",
      valor: { vin: "", poliza: "", rfc: "" },
      indice: "datosIngresoPolizaCobranza",
    });
    valores.contrasenia = "";
    valores.confirmarContrasenia = "";
    valores.rfc = "";
    valores.inciso = "";
    valores.poliza = "";
    history.push("/registro-usuario-sms", {
      telefono: valores.telefono,
    });
  };

  const limpiarErrores = () => {
    asignarValorFocoRFC("");
    asignarValorFocoInciso("");
    asignarValorfocoPoliza("");
    asignarErrorPoliza("");
    asignarErrorRFC("");
  };

  const enfocarError = (codigo) => {
    switch (codigosError[codigo]) {
      case "poliza":
        asignarValorfocoPoliza("error");
        break;
      case "RFC":
        asignarValorFocoRFC("error");
        break;
      case "telefono":
        asignarValorFocoTelefono("error");
        break;
      case "contrasena":
        asignarValorFocoContrasenia("error");
        break;
      case "registro":
        asignarValorMostrarBarraAlerta(true);
        asignarValorMensajeAlerta(diccionario.errores.errorRegistro);
        break;
      case "polizainciso":
        asignarValorfocoPoliza("error");
        asignarValorFocoInciso("error");
        break;
      default:
        asignarValorCargando(false);
        asignarValorMostrarBarraAlerta(true);
        asignarValorMensajeAlerta(diccionario.errores.errorGenerico);
    }
  };

  // const esCierto = (valor) => valor === true;

  useEffect(() => {
    runEnterLog(3);
  }, []);

  useEffect(() => {
    if (mostrarBarraAlerta === false) {
      if (
        allowPoliza &&
        allowRFC &&
        allowTelefono &&
        allowContrasenia &&
        allowConfirmarContrasenia
      ) {
        registrar();
      }
    }
  }, [
    eventoRegistrar,
    allowInciso,
    allowConfirmarContrasenia,
    allowPoliza,
    allowSerie,
    allowTelefono,
    allowRFC,
    allowContrasenia,
  ]);

  useEffect(() => {
    valores.poliza = polizaParam || "";
    valores.rfc = rfcParam || "";
    valores.inciso = "1";
    dispatch({
      type: "AGREGAR",
      valor: { vin: "", poliza: "", rfc: "" },
      indice: "datosIngresoPolizaCobranza",
    });
    limpiarErrores();
  }, [tipoPoliza]);

  useEffect(() => {
    if (!loading && data) {
      if (
        data.iniciar_sesion &&
        data.iniciar_sesion.dato &&
        data.iniciar_sesion.dato.access_token
      ) {
        // Guardar cookie y redirigir
        const diaHoraDeInicioDeSesion = moment().unix();
        const nuevoObjetoDeInicioDeSesion = JSON.parse(
          JSON.stringify(data.iniciar_sesion.dato)
        );
        nuevoObjetoDeInicioDeSesion.fechaYHoraDeInicioDeSesion =
          diaHoraDeInicioDeSesion;
        establecerCookie(
          nombreDeCookie,
          JSON.stringify(nuevoObjetoDeInicioDeSesion),
          {
            path: "/",
          }
        );
        dispatch({
          type: "AGREGAR",
          valor: {
            data: nuevoObjetoDeInicioDeSesion.NombreAsegurado,
          },
          indice: "NombreUsuarioPerfil",
        });
        dispatch({
          type: "AGREGAR",
          valor: {
            telefono: nuevoObjetoDeInicioDeSesion.Telefono,
            email: nuevoObjetoDeInicioDeSesion.CorreoElectronico,
          },
          indice: "informacionContacto",
        });
        asignarValorCargando(false);
        irARegistroSMS();
      } else if (data.iniciar_sesion && data.iniciar_sesion.mensaje) {
        asignarValorMensajeAlerta(data.iniciar_sesion.mensaje);
        asignarValorMostrarBarraAlerta(true);
      }
      asignarValorCargando(false);
    } else if (loading) {
      asignarValorCargando(true);
    } else if (error) {
      asignarValorCargando(false);
    }
  }, [loading, data]);

  const suscriptionLogic = () => {
    if (
      eventosSubscripcion &&
      eventosSubscripcion.escucha_evento_actualizacion_reporte &&
      eventosSubscripcion.escucha_evento_actualizacion_reporte.tipoMensaje
    ) {
      const evento = eventosSubscripcion.escucha_evento_actualizacion_reporte;
      if (evento.tipoMensaje === 24) {
        const valorNotificacion = obtenerValorDeArregloDeStrings(
          evento.dato.descripciones,
          "Exitoso: "
        );
        if (valorNotificacion === "true") {
          // Una vez llega la notificacion y su valor es el numero de telefono, todo se registro correctamente y procedo al SMS
          runSuccesLog(3);
          iniciarSesion({
            variables: {
              usuario: valores.telefono,
              contrasena: `${valores.contrasenia}_1`,
              latitud: "",
              longitud: "",
              plataforma: "HDI Contigo",
            },
          });
          asignarValorCargando(false);
        } else {
          asignarValorCargando(false);
          const valorNotificacionRegistro = obtenerValorDeArregloDeStrings(
            evento.dato.descripciones,
            "Mensaje: "
          );
          asignarValorMensajeAlerta(valorNotificacionRegistro);
          asignarValorMostrarBarraAlerta(true);
        }
      }
    }
  };

  useEffect(() => {
    if (
      !loadingGMM &&
      dataGMM &&
      dataGMM.seguridad_registraUsuarioGastosMedicos
    ) {
      if (dataGMM?.seguridad_registraUsuarioGastosMedicos.completado) {
        dispatch({
          type: "AGREGAR",
          valor: {
            telefono: valores.telefono,
            contrasenia: valores.contrasenia,
          },
          indice: "datosUsuarioCobranza",
        });
        //  Iniciar sesion
        asignarValorCargando(true);
        suscriptionLogic();
      } else {
        asignarValorCargando(false);
        if (
          dataGMM?.seguridad_registraUsuarioGastosMedicos.mensaje ===
          "Excepcion"
        ) {
          asignarValorMensajeAlerta(diccionario.errores.verificarCampos);
          asignarValorMostrarBarraAlerta(true);
        } else {
          asignarValorMensajeAlerta(
            dataGMM?.seguridad_registraUsuarioGastosMedicos.mensaje
          );
          asignarValorMostrarBarraAlerta(true);
          enfocarError(dataGMM?.seguridad_registraUsuarioGastosMedicos.codigo);
        }
      }
    } else if (loadingGMM) {
      asignarValorCargando(true);
    } else if (errorGMM) {
      asignarValorCargando(false);
      asignarValorMensajeAlerta(diccionario.errores.errorGenerico);
      asignarValorMostrarBarraAlerta(true);
    } else if (!loadingGMM) {
      asignarValorCargando(false);
    }
  }, [loadingGMM, dataGMM, errorGMM, eventosSubscripcion]);

  useEffect(() => {
    if (mostrarBarraAlerta) {
      asignarValorCargando(false);
    }
  }, [mostrarBarraAlerta]);

  const iconoContrasenaNoVisible = <IconoNoVisible />;
  const iconoContrasenaVisible = <IconoVisible />;

  // !! ============================ Retornamos HTML
  return mostrarLectorOcr ? (
    <PantallaIngresoDePolizaOcr
      alAceptar={(valorOcr) => {
        asignarValorNumPoliza(valorOcr);
        asignarValorMostrarLectorOcr(false);
      }}
      alCancelar={() => {
        asignarValorMostrarLectorOcr(false);
      }}
    />
  ) : (
    // !! Modal para indicar donde encontrar el no. de poliza e inciso ================
    <EnvolvedorPantalla key={v4()}>
      {cargando ? <IndicadorCarga /> : null}
      <Alerta
        {...alertaGeolocation}
        funcionLlamadaBoton={() => {
          asignarValorCargando(true);
          alertaGeolocation.cerrar();
        }}
        funcionLlamadaBoton2={() => {
          alertaErrorGeolocation.mostrar();
        }}
      />
      <Alerta
        {...alertaErrorGeolocation}
        funcionLlamadaBoton={() => {
          alertaErrorGeolocation.cerrar();
        }}
      />
      <Alerta
        textoEncabezado={
          tipoPoliza === "AUTR"
            ? diccionario.intruccionesPoliza
            : tipoPoliza === "DAN"
            ? diccionario.linkInstruccionesPolizaDAN
            : diccionario.linkInstruccionesPolizaGMM
        }
        textoCuerpoJsx={
          <AlertaImagen
            src={
              tipoPoliza === "AUTR"
                ? polizaImg
                : tipoPoliza === "DAN"
                ? polizaDanosImg
                : polizaGmm
            }
            alt=""
          />
        }
        mostrarModal={mostrarModalPoliza}
        manejarCierre={() => {
          asignarValorMostrarModalPoliza(false);
        }}
        mostrarIcono={false}
        margenMinimo
      />
      <Alerta
        textoEncabezado={diccionario.intruccionesSerie}
        textoCuerpoJsx={<AlertaImagen src={serieImg} alt="" />}
        mostrarModal={mostrarModalSerie}
        manejarCierre={() => {
          asignarValorMostrarModalSerie(false);
        }}
        mostrarIcono={false}
        margenMinimo
      />
      <Alerta
        textoEncabezado={diccionario.alerta.titulo}
        colorAlerta="rojo"
        textoCuerpo={diccionario.alerta.cuerpo}
        mostrarModal={mostrarModal}
        manejarCierre={() => {
          asignarValorMostrarModal(false);
        }}
        etiquetaBoton={diccionario.alerta.etiquetaBoton}
        funcionLlamadaBoton={() => {
          history.push("/");
          window.location.href = "tel:*434";
        }}
      />
      <Alerta
        textoEncabezado={diccionario.linkInstruccionesRFC}
        textoCuerpoJsx={
          <AlertaImagen
            src={tipoPoliza === "GMM" ? rfcImgGmm : rfcImg}
            alt=""
          />
        }
        mostrarModal={mostrarModalRFC}
        manejarCierre={() => {
          asignarValorMostrarModalRFC(false);
        }}
        mostrarIcono={false}
        margenMinimo
      />
      <Encabezado
        titulo={diccionario.encabezado}
        funcionRegresar={() => {
          // history.push(paginaAnterior);
          // sessionStorage.removeItem("estadoRedux");
          runCancelLog(3);
          history.goBack();
        }}
      />

      <Pantalla>
        <BarraAlerta
          etiqueta={mensajeAlerta}
          mostrarAlerta={mostrarBarraAlerta}
          manejarCierre={() => {
            asignarValorMostrarBarraAlerta(false);
          }}
          estilo="error"
          posicionAbsoluta
        />

        <Titulo id="titulo">{diccionario.titulo}</Titulo>
        <Suspense fallback={null}>
          <CamposRegistroGMM
            alCambiarNumeroDePoliza={alCambiarNumeroDePoliza}
            alCambiarInciso={alCambiarInciso}
            focoPoliza={focoPoliza}
            focoInciso={focoInciso}
            polizaState={polizaState}
            incisoState={incisoState}
            persistirNumSeriePoliza={persistirNumSeriePoliza}
            asignarValorMostrarModalPoliza={asignarValorMostrarModalPoliza}
            alCambiarRFC={alCambiarRFC}
            focoRFC={focoRFC}
            rfcState={rfcState}
            asignarValorMostrarModalRFC={asignarValorMostrarModalRFC}
            errorPoliza={errorPoliza}
            errorRFC={errorRFC}
          />
        </Suspense>

        <CampoTexto
          id="campoTelefono"
          etiqueta={diccionario.etiquetaTelefono}
          enCambio={alCambiarTelefono}
          foco={focoTelefono}
          valor={valores.telefono}
          numeroDeCaracteres={10}
          expresionRegular={/^(\s*|\d+)$/}
        />
        {errorTelefono !== "" && (
          <MensajeError id="errorTelefono">{errorTelefono}</MensajeError>
        )}
        <SeparadorEspacio />
        <CampoTexto
          id="campoContrasenia"
          etiqueta={diccionario.etiquetaContrasenia}
          enCambio={alCambiarContrasenia}
          foco={focoContrasenia}
          valor={valores.contrasenia}
          esContrasena={contrasenaVisible}
          icono={
            contrasenaVisible
              ? iconoContrasenaNoVisible
              : iconoContrasenaVisible
          }
          enClickIcono={() => {
            persistirNumSeriePoliza();
            asignarContrasenaVisible(!contrasenaVisible);
          }}
        />
        {errorContrasenia !== "" && (
          <MensajeError id="errorTelefono">{errorContrasenia}</MensajeError>
        )}
        <SeparadorEspacio />
        <CampoTexto
          id="campoConfirmarContrasenia"
          etiqueta={diccionario.etiquetaConfirmarContrasenia}
          enCambio={alCambiarConfirmarContrasenia}
          foco={focoConfirmarContrasenia}
          valor={valores.confirmarContrasenia}
          esContrasena={confirmarContrasenaVisible}
          icono={
            confirmarContrasenaVisible
              ? iconoContrasenaNoVisible
              : iconoContrasenaVisible
          }
          enClickIcono={() => {
            persistirNumSeriePoliza();
            asignarConfirmarContrasenaVisible(!confirmarContrasenaVisible);
          }}
        />
        {errorConfirmarContrasenia !== "" && (
          <MensajeError id="errorTelefono">
            {errorConfirmarContrasenia}
          </MensajeError>
        )}
        <SeparadorEspacio />
        <ContenedorBoton className="primer-boton">
          <Boton
            etiqueta={diccionario.etiquetaBotonCompletarRegistro}
            tema="estandar"
            enClick={hacerValidaciones}
          />
        </ContenedorBoton>
      </Pantalla>
    </EnvolvedorPantalla>
  );
};
export default PantallaRegistroGMM;
