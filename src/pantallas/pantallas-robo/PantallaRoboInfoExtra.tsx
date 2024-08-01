/* eslint-disable */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { BarraProgresoReporte, Boton, Encabezado } from "../../componentes";
import { EnvolvedorPantalla } from "../../componentes/componentes-styled-compartidos/Pantalla.styled";
import { PantallaFondoGris } from "../../componentes/pantalla-mis-polizas/pantalla-mis-polizas-componente/PantallaMisPolizas.styled";
import {
  ContenedorBoton,
  Titulo,
} from "../../componentes/pantalla-formulario-informacion-contacto/pantalla-formulario-informacion-contacto/PantallaFormularioInformacionContacto.styled";
import { CuerpoCuestionarioReporte } from "../../componentes/pantalla-cuestionario-reporte/pantalla-cuestionario-reporte-componente/PantallaCuestionarioReporte.styled";
import SeleccionCuestionario from "../../componentes/seleccion-cuestionario";
import { CamposContactoReportes } from "../../componentes/campos-contacto-reportes/CamposContactoReportes";
import { keysValores, IValores } from "./utils";
import ACTIONS_REDUX from "../../reductores/Actions";
import constantes from "../../recursos/constantes";
import useValidateLogin from "../../utils/useValidateLogin";
import { CampoRequeridoSeleccionCuestionario } from "../../componentes/seleccion-cuestionario/seleccion-cuestionario-componente/SeleccionCuestionario.styled";
import { SeparadorLinea } from "../../componentes/pantalla-cuenta/pantalla-cuenta-componente/PantallaCuenta.styled";
import { IRedux } from "../../interfaces/Redux/IRedux";
import CampoTexto from "../../componentes/componentes-v2/campo-texto";

const valores: IValores = {
  telefono: "",
  email: "",
  color: "",
  caracteristicas: "",
  folio: "",
  razonDuplicado: "",
  nombreConductor: "",
};

const valoresCheck: any = {
  violencia: null,
  declaracion: null,
  duplicado: null,
  ultimoConductor: null
};

const nombreCookie = constantes.nombreDeCookie;

export const PantallaRoboInfoExtra = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  const { user, validateUser } = useValidateLogin();

  if (validateUser && valores.telefono === "") {
    valores.telefono = objetoCookie.Usuario;
  }

  const estadoApp = useSelector((state: IRedux) => state);
  const location = useLocation<any>();

  const [goThrough, setGoThrough] = useState(true);
  const [usuarioLogeado, setUsuarioLogeado] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("");

  // Estados del formulario checks
  const [violencia, setViolencia] = useState<boolean|null>(null);
  const [declaracion, setDeclaracion] = useState<boolean|null>(null);
  const [duplicado, setDuplicado] = useState<boolean|null>(null);
  const [ultimoConductor, setUltimoConductor] = useState<boolean|null>(null);

  // Estados del formulario alfanumericos
  // const [razonDuplicado, setRazonDuplicado] = useState("");
  // const [nombreConductor, setNombreConductor] = useState("");
  // const [folio911, setFolio911] = useState("");
  // const [telefono, setTelefono] = useState("");
  // const [email, setEmail] = useState("");
  // const [color, setColor] = useState("");
  // const [caracteristicas, setCaracteristicas] = useState("");

  const [errorViolencia, setErrorViolencia] = useState(false);
  const [errorDeclaracion, setErrorDeclaracion] = useState(false);
  const [errorDuplicado, setErrorDuplicado] = useState(false);
  const [errorUltimoConductor, setErrorUltimoConductor] = useState(false);

  const [errorRazonDuplicado, setErrorRazonDuplicado] = useState(false);
  const [errorNombreConductor, setErrorNombreConductor] = useState(false);
  const [errorTelefono, setErrorTelefono] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorColor, setErrorColor] = useState(false);
  const [errorCaracteristicas, setErrorCaracteristicas] = useState(false);

  const redirect = () => {
    history.goBack();
  };

  // TODO: Terminar de realizar validaciones
  const realizarValidaciones = (soloValidar = true) => {
    setGoThrough(false);
    setErrorViolencia(false);
    setErrorDeclaracion(false);
    setErrorDuplicado(false);
    setErrorUltimoConductor(false);
    setErrorNombreConductor(false);

    let hayErrores = false;

    if (valoresCheck.violencia === null) {
      setErrorViolencia(true);
      hayErrores = true;
    }

    if (valoresCheck.declaracion === null) {
      setErrorDeclaracion(true);
      hayErrores = true;
    }

    if (valoresCheck.duplicado === null) {
      setErrorDuplicado(true);
      hayErrores = true;
    }

    if (!valoresCheck.duplicado && valores.razonDuplicado === "") {
      setErrorRazonDuplicado(true);
      hayErrores = true;
    }

    if (valoresCheck.ultimoConductor === null) {
      setErrorUltimoConductor(true);
      hayErrores = true;
    }

    // !Si no es el último consuctor debe validar que venga el nombre del conductor
    if (valoresCheck.ultimoConductor !== null && !valoresCheck.ultimoConductor && (valores.nombreConductor === null || valores.nombreConductor === "")) {
      setErrorNombreConductor(true);
      hayErrores = true;
    }

    if (!valores.telefono || valores.telefono === null || valores.telefono === "") {
      setErrorTelefono(true);
      hayErrores = true;
    }

    if (!valores.email || valores.email === null || valores.email === "") {
      setErrorEmail(true);
      hayErrores = true;
    }

    if (!valores.color || valores.color === null || valores.color === "") {
      setErrorColor(true);
      hayErrores = true;
    }

    if (!valores.caracteristicas || valores.caracteristicas === null || valores.caracteristicas === "") {
      setErrorCaracteristicas(true);
      hayErrores = true;
    }

    if (soloValidar && hayErrores) {
      setGoThrough(true);
    } else if (soloValidar && !hayErrores) {
      setGoThrough(false);
    } else if (!soloValidar){
      if (hayErrores) {
        setGoThrough(true);
        setTimeout(() => { setGoThrough(false); }, 2000);
        return;
      }
  
      dispatch({
        type: ACTIONS_REDUX.ACTUALIZAR,
        indice: "datosReporteRobo",
        indiceExtra: "conViolencia",
        valor: violencia,
      });
  
      dispatch({
        type: ACTIONS_REDUX.ACTUALIZAR,
        indice: "datosReporteRobo",
        indiceExtra: "datosRoboAdicionales",
        valor: {
          folio911: valores.folio,
          colorVehiculo: valores.color,
          razonDuplicado: valores.razonDuplicado,
          caracteristicas: valores.caracteristicas,
          nombreConductor: valores.nombreConductor,
          declaracion,
          duplicado,
          ultimoConductor,
        },
      });
  
      dispatch({
        type: ACTIONS_REDUX.ACTUALIZAR,
        indice: "datosReporteRobo",
        indiceExtra: "infoContacto",
        valor: {
          telefono: valores.telefono,
          email: valores.email,
        },
      });
  
      // Se valida si el regreso es para resumen
      if (location.state && !!location.state.regreso) {
        if (location.state.regreso === "resumen") {
          history.push({
            pathname: "/resumen-reportes"
          });
          return;
        }
      }
  
      history.push("/ubicacion-robo");
    }

  };

  const alCambiarValor = (e: any, valor: string) => {
    switch(valor) {
      case "razonDuplicado":
        // setRazonDuplicado(e.target.value);
        valores.razonDuplicado = e.target.value;
        setErrorRazonDuplicado(false);
        break;
      case "nombreConductor":
        // setNombreConductor(e.target.value);
        valores.nombreConductor = e.target.value;
        setErrorNombreConductor(false);
        break;
      case "folio911":
        // setFolio911(e.target.value);
        valores.folio = e.target.value;
        break;
      case "telefono":
        // setTelefono(e.target.value);
        valores.telefono = e.target.value;
        setErrorTelefono(false);
        break;
      case "email":
        // setEmail(e.target.value);
        valores.email = e.target.value;
        setErrorEmail(false);
        break;
      case "color":
        // setColor(e.target.value);
        valores.color = e.target.value;
        setErrorColor(false);
        break;
      case "caracteristicas":
        // setCaracteristicas(e.target.value);
        valores.caracteristicas = e.target.value;
        setErrorCaracteristicas(false);
        break;
      default: break;
    }
    realizarValidaciones(true);
  };

  const irAsistenciaHDI = () => {
    history.push({
      pathname: "/asistencia-hdi",
      state: {
        tipoAtencion: "robo"
      },
    });
  }

  useEffect(() => {
    // !Valdar si hay datos en el redux de reporte robo para llenar los campos
    if (estadoApp.datosReporteRobo) {
      if (estadoApp.datosReporteRobo?.conViolencia != null) {
        setViolencia(estadoApp.datosReporteRobo?.conViolencia);
        valoresCheck.violencia = estadoApp.datosReporteRobo?.conViolencia;
      }
      if (estadoApp.datosReporteRobo?.datosRoboAdicionales?.declaracion != null) {
        setDeclaracion(estadoApp.datosReporteRobo?.datosRoboAdicionales.declaracion);
        valoresCheck.declaracion = estadoApp.datosReporteRobo.datosRoboAdicionales?.declaracion;
      }
      if (estadoApp.datosReporteRobo?.datosRoboAdicionales?.duplicado != null) {
        setDuplicado(estadoApp.datosReporteRobo.datosRoboAdicionales.duplicado);
        valoresCheck.duplicado = estadoApp.datosReporteRobo.datosRoboAdicionales.duplicado;
      }

      if (estadoApp.datosReporteRobo.datosRoboAdicionales?.razonDuplicado != null) {
        // setRazonDuplicado(estadoApp.datosReporteRobo.datosRoboAdicionales?.razonDuplicado);
        valores.razonDuplicado = estadoApp.datosReporteRobo.datosRoboAdicionales.razonDuplicado||"";
      }

      if (estadoApp.datosReporteRobo.datosRoboAdicionales?.ultimoConductor != null) {
        setUltimoConductor(estadoApp.datosReporteRobo.datosRoboAdicionales.ultimoConductor);
        valoresCheck.ultimoConductor = estadoApp.datosReporteRobo.datosRoboAdicionales.ultimoConductor;
        if (!estadoApp.datosReporteRobo.datosRoboAdicionales?.ultimoConductor) {
          valores.nombreConductor = estadoApp.datosReporteRobo.datosRoboAdicionales?.nombreConductor||"";
        }
      }


      if (estadoApp.datosReporteRobo.datosRoboAdicionales?.folio911 != null) {
        // setFolio911(estadoApp.datosReporteRobo?.datosRoboAdicionales?.folio911);
        valores.folio = estadoApp.datosReporteRobo?.datosRoboAdicionales?.folio911||"";
      }
      if (estadoApp.datosReporteRobo?.infoContacto?.telefono != null) {
        valores.telefono = estadoApp.datosReporteRobo?.infoContacto?.telefono||"";
      }
      if (estadoApp.datosReporteRobo?.infoContacto?.email != null) {
        valores.email = estadoApp.datosReporteRobo?.infoContacto?.email||"";
      }
      if (estadoApp.datosReporteRobo?.datosRoboAdicionales?.colorVehiculo != null) {
        valores.color = estadoApp.datosReporteRobo?.datosRoboAdicionales.colorVehiculo||"";
      }
      if (estadoApp.datosReporteRobo?.infoContacto?.email != null) {
        valores.caracteristicas = estadoApp.datosReporteRobo?.datosRoboAdicionales?.caracteristicas||"";
      }
    }
  }, [estadoApp.datosReporteRobo]);

  useEffect(() => {
    if (validateUser) {
      setUsuarioLogeado(true);
      setNombreUsuario(objetoCookie.NombreAsegurado);
      // setTelefonoUsuario(objetoCookie.usuario);
      //valores.telefono = user;

      // Si esta logueado hay que setear el valor del telefono en el campo
      valores.telefono = objetoCookie.Usuario;
      setTimeout(() => {
        realizarValidaciones(true);
      }, 500);
    }
  }, []);

  const validaCheck = (check = "", val = false) => {
    switch (check) {
      case "violencia":
        setViolencia(val);
        valoresCheck.violencia = val;
        realizarValidaciones(true);
        break;
      case "declaracion":
        setDeclaracion(val);
        valoresCheck.declaracion = val;
        realizarValidaciones(true);
        break;
      case "duplicado":
        setDuplicado(val);
        valoresCheck.duplicado = val;
        realizarValidaciones(true);
        break;
      case "ultimoConductor":
        setUltimoConductor(val);
        valoresCheck.ultimoConductor = val;
        realizarValidaciones(true);
        break;
      default:
        break;
    }
  };

  return (
    <EnvolvedorPantalla key="envolvedor-pantalla-info-complementaria">
      <Encabezado titulo="Reportar robo total" funcionRegresar={redirect} />

      <PantallaFondoGris style={{ paddingTop: "3rem", overflow: "hidden" }}>
        <BarraProgresoReporte progreso={2} titulo="Información del robo" />
        <SeparadorLinea />
        <Titulo>Ayúdanos a completar la siguiente información:</Titulo>

        <CuerpoCuestionarioReporte>
          <SeleccionCuestionario
            pregunta="¿El robo de tu vehículo fue con violencia?"
            cambiarEstado={(v) => {
              validaCheck("violencia", v);
            }}
            respuesta={violencia}
            mostrarMensajeCampoRequerido={errorViolencia}
          />

          <SeleccionCuestionario
            pregunta="¿Ya hiciste la declaración del robo ante el Ministerio Público?"
            cambiarEstado={(v) => {
              validaCheck("declaracion", v);
            }}
            respuesta={declaracion}
            mostrarMensajeCampoRequerido={errorDeclaracion}
          />

          <SeleccionCuestionario
            pregunta="¿Tienes las llaves y/o su duplicado del vehículo?"
            respuesta={duplicado}
            cambiarEstado={(v) => {
              validaCheck("duplicado", v);
            }}
            mostrarMensajeCampoRequerido={errorDuplicado}
          />

          {!duplicado && duplicado !== null && (
            <div>
              <CampoTexto
                estilo={{ marginBottom: '0' }}
                etiqueta="¿Por qué?"
                marcador="Explica por qué"
                enCambio={(e: HTMLInputElement) =>
                  alCambiarValor(e, "razonDuplicado")
                }
                // foco={focoNombre}
                valor={valores.razonDuplicado}
                id="campoNoDuplicado"
              />
              <CampoRequeridoSeleccionCuestionario
                id="error-razon-duplicado"
                mostrar={errorRazonDuplicado}
                style={{ marginTop: "-30px", marginBottom: "0px" }}
              >
                {"Campo requerido para poder continuar"}
              </CampoRequeridoSeleccionCuestionario>
            </div>
          )}

          {/* Cambiar por la variable que contenga el nombre del usuario, "usuario" es el télefono */}
          {usuarioLogeado && (
            <SeleccionCuestionario
              pregunta={`${nombreUsuario} ¿fuiste la última persona en conducir el vehículo?`}
              respuesta={ultimoConductor}
              cambiarEstado={(v) => {
                validaCheck("ultimoConductor", v);
              }}
              mostrarMensajeCampoRequerido={errorUltimoConductor}
            />
          )}

          {!usuarioLogeado && (
            <SeleccionCuestionario
              pregunta="¿Fuiste la última persona en conducir el vehículo?"
              respuesta={ultimoConductor}
              cambiarEstado={(v) => {
                validaCheck("ultimoConductor", v)
              }}
              mostrarMensajeCampoRequerido={errorUltimoConductor}
            />
          )}

          {!ultimoConductor && ultimoConductor != null && (
            <div>
              <CampoTexto
                etiqueta="Nombre del conductor"
                marcador="Ingresa el nombre del conductor"
                enCambio={(e: HTMLInputElement) =>
                  alCambiarValor(e, "nombreConductor")
                }
                // foco={focoNombre}
                valor={valores.nombreConductor}
                id="campoNombreConductor"
                estilo={{ marginBottom: '0' }}
              />
              <CampoRequeridoSeleccionCuestionario
                id="error-nombre-conductor"
                mostrar={errorNombreConductor}
                style={{ marginTop: "-30px", marginBottom: "0px" }}
              >
                {"Campo requerido para poder continuar"}
              </CampoRequeridoSeleccionCuestionario>
            </div>
          )}

          <div style={{ marginBottom: "40px" }}>
            <CampoTexto
              etiqueta="Folio del reporte del 911"
              marcador="Ingresa el folio de tu reporte al 911"
              enCambio={(e: any) =>
                alCambiarValor(e, "folio911")
              }
              // foco={focoNombre}
              valor={valores.folio}
              id="campoFolio911"
            />
          </div>

          {/* Aquí estan los campos de contacto como el email o telefono a fin de ser reutilizado en otros reportes */}
          <CamposContactoReportes
            valores={{telefono: valores.telefono, email: valores.email, color: valores.color, caracteristicas: valores.caracteristicas}}
            alCambiarValor={alCambiarValor}
            usuarioLogeado={usuarioLogeado}
            errores={{errorTelefono, errorEmail, errorColor, errorCaracteristicas}}
          />
        </CuerpoCuestionarioReporte>
        <ContenedorBoton>
          <Boton
            etiqueta="Continuar"
            enClick={() => {
              realizarValidaciones(false)
            }}
            deshabilitado={goThrough}
          />
        </ContenedorBoton>
        <Boton
          etiqueta="Contacto HDI"
          tema="simple"
          enClick={irAsistenciaHDI}/>
      </PantallaFondoGris>
    </EnvolvedorPantalla>
  );
};
