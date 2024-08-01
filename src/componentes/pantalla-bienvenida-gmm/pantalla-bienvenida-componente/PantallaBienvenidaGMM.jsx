/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import { useCookies } from "react-cookie";
import { v4 } from "uuid";
import moment from "moment";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import IconoVisible from "@material-ui/icons/VisibilityRounded";
import IconoNoVisible from "@material-ui/icons/VisibilityOffRounded";
import logo from "../../../recursos/imagenes/logo-alt.png";
import loginGMM from "../../../recursos/imagenes/img_login.png";
import IconoContigo from "../../../recursos/iconos/ico-contigo.svg";
import logoContigo from "../../../recursos/iconos/ico_contigo.svg";

import constantes from "../../../recursos/constantes";
import { Alerta } from "../../alerta";
import BarraAlerta from "../../barra-alerta";
import CampoTexto from "../../campo-texto";
import ModalTexto from "../../modal-texto";
import {
  ContenedorLogoBienvenida,
  ContenedorPantallaBienvenida,
  EnlaceBienvenida,
  EnlaceRegistroBienvenida,
  EnvolvedorPantallaBienvenida,
  ImagenBienvenida,
  Instrucciones,
  LogoBienvenida,
  MensajeError,
  PieDePaginaBienvenida,
  RegresarBoton,
  SeparadorBienvenida,
  SeparadorEspacio,
  TituloBienvenida,
} from "./PantallaBienvenida.styled";
import IndicadorCarga from "../../indicador-carga";
import Boton from "../../boton/boton-componente/Boton";
import terminos from "../../../recursos/paginas/TerminosYCondiciones";
import privacidad from "../../../recursos/paginas/AvisoDePrivacidad";
import useGeolocation from "../../../utils/useGeolocation";
import useAlerta from "../../../utils/useAlerta";
import {
  configAlertaGeolocation,
  configAlertaErrorGeolocation,
  diccionario,
} from "./config";
import { TituloBienvenidaH1 } from "../../pantalla-bienvenida/pantalla-bienvenida-componente/PantallaBienvenida.styled";

const valores = {
  usuario: "",
  contrasena: "",
};

const claseBotonEstandar = "boton-estandar";
const claseBotonDeshabilitado = "boton-deshabilitado";

const INICIAR_SESION = loader(
  "../../../graphQL/mutation/seguridad/iniciar_sesion.graphql"
);

const { nombreDeCookie } = constantes;
let btnTema = "deshabilitado";

export const PantallaBienvenidaGMM = () => {
  const history = useHistory();
  const location = useLocation();
  const geolocation = useGeolocation();
  const estadoApp = useSelector((estado) => estado);
  const params = useParams();
  const [cookie, establecerCookie] = useCookies([nombreDeCookie]);
  const objetoCookie = cookie[nombreDeCookie];
  if (objetoCookie && objetoCookie.Usuario && objetoCookie.access_token) {
    history.push("/inicio");
  }
  let contrasenaCambiada = false;
  if (
    location &&
    location.state &&
    location.state.notificacionContrasenaCambiada
  ) {
    contrasenaCambiada = true;
  }
  const dispatch = useDispatch();
  const alertaGeolocation = useAlerta(configAlertaGeolocation);
  const alertaErrorGeolocation = useAlerta(configAlertaErrorGeolocation);
  const [mostrarTerminos, asignarValorMostrarTerminos] = useState(false);
  const [tituloModal, asignarValorTituloModal] = useState("");
  const [cuerpoModal, asignarValorCuerpoModal] = useState("");
  const [focoUsuario, asignarValorFocoUsuario] = useState("");
  const [focoContrasena, asignarValorFocoContrasena] = useState("");
  const [nuevaContrasenaVisible, asignarNuevaContrasenaVisible] =
    useState(true);
  const [mostrarPantallaIngreso, asignarValorMostrarPantallaIngreso] =
    useState(false);
  const [mostrarModalError, asignarValorMostrarModalError] = useState(
    location?.state?.mostrarAlerta
  );
  const [mostrarBarraAlerta, asignarValorMostrarBarraAlerta] = useState(false);
  const [
    mostrarAlertaContrasenaCambiada,
    asignarValorMostrarAlertaContrasenaCambiada,
  ] = useState(contrasenaCambiada);
  // const { alIniciarSesion } = props;
  // alIniciarSesion();
  const [mensajeAlerta, asignarValorMensajeAlerta] = useState(
    diccionario.mensajeDeErrorDefault
  );
  const [cargando, asignarValorCargando] = useState(false);
  const [errorUsuario, asignarErrorUsuario] = useState("");

  const botonRef = useRef();
  const [iniciarSesion, { loading, error, data }] = useMutation(INICIAR_SESION);

  const [alertaReedireccion] = useState(false);

  const deshabilitarBoton = () => {
    const elementoBotonDOM = ReactDOM.findDOMNode(botonRef.current);
    if (elementoBotonDOM.classList.contains(claseBotonEstandar)) {
      elementoBotonDOM.classList.remove(claseBotonEstandar);
    }
    if (!elementoBotonDOM.classList.contains(claseBotonDeshabilitado)) {
      elementoBotonDOM.classList.add(claseBotonDeshabilitado);
    }
  };

  const habilitarBoton = () => {
    const elementoBotonDOM = ReactDOM.findDOMNode(botonRef.current);
    if (elementoBotonDOM.classList.contains(claseBotonDeshabilitado)) {
      elementoBotonDOM.classList.remove(claseBotonDeshabilitado);
    }
    if (!elementoBotonDOM.classList.contains(claseBotonEstandar)) {
      elementoBotonDOM.classList.add(claseBotonEstandar);
    }
  };

  const alCambiarUsuario = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.usuario = valor;
      if (valor && valores.contrasena) {
        habilitarBoton();
        // asignarBtnTema("estandar");
        btnTema = "estandar";
        // evento.target.focus();
      } else {
        deshabilitarBoton();
        // asignarBtnTema("deshabilitado");
        btnTema = "deshabilitado";
        // evento.target.focus();
      }
    }
  };

  const alCambiarContrasena = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.contrasena = valor;
      if (valor && valores.usuario) {
        habilitarBoton();
        // asignarBtnTema("estandar");
        btnTema = "estandar";
      } else {
        deshabilitarBoton();
        // asignarBtnTema("deshabilitado");
        btnTema = "deshabilitado";
      }
    }
  };

  const alDarClickEnEntrar = () => {
    const { usuario, contrasena } = valores;
    if (usuario && contrasena) {
      let usuarioValido = false;
      asignarValorFocoContrasena("");
      if (
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(usuario) ||
        /^\d{10}$/.test(usuario)
      ) {
        usuarioValido = true;
        asignarValorFocoUsuario("");
        asignarErrorUsuario("");
      } else {
        asignarValorFocoUsuario("error");
        asignarErrorUsuario(diccionario.errorUsuario);
      }
      if (usuarioValido) {
        asignarValorFocoUsuario("");
        asignarValorCargando(true);
        geolocation
          .hasPermission()
          .then((allowed) => {
            if (!allowed) {
              // No location allowed, ask for it
              asignarValorCargando(false);
              alertaGeolocation.mostrar();
            }
            geolocation
              .getAsyncLocation()
              .then((res) => {
                if (res) {
                  console.log(res);
                  // Got it
                  asignarValorCargando(false);
                  alertaErrorGeolocation.cerrar();
                  alertaGeolocation.cerrar();
                  iniciarSesion({
                    variables: {
                      usuario,
                      contrasena,
                      latitud: `${res.latitude}`,
                      longitud: `${res.longitude}`,
                      plataforma: "HDI Contigo",
                    },
                  });
                }
              })
              .catch((error1) => {
                asignarValorCargando(false);
                // Mostrar mensaje geolocalizacion necesaria
                console.log(error1);
                alertaGeolocation.cerrar();
                alertaErrorGeolocation.mostrar();
              });
          })
          .catch((error2) => {
            asignarValorCargando(false);
            console.log(error2);
            alertaGeolocation.cerrar();
            alertaErrorGeolocation.mostrar();
          });
      }
    }
  };

  const validarRFCParam = (rfc) => {
    const regex = /(^[0-9a-zA-Z&Ññ]+$|^$)/;
    if (regex.test(rfc) !== true) {
      console.log(regex.test(rfc));
      return false;
    }
    if (rfc.length === 0 && rfc.length < 13) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (!params.rfc) {
      return;
    }

    if (!validarRFCParam(params.rfc)) {
      console.log("RFC Incorrecto");
      // TODO: Mensaje de alerta al usuario o reedireccion a la pantalla sin RFC
      // setAlertaReedireccion(true);
      history.push("/");
      return;
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-constant-condition, no-cond-assign
    if ((location.state = "/ingreso-gmm")) {
      const regex = /(^[0-9a-zA-Z]+$|^$)/;
      if (params.rfc) {
        if (
          params.rfc.length < 13 ||
          params.rfc.length > 13 ||
          !regex.test(params.rfc)
        ) {
          history.push("/");
        }
        // TODO: Descomentar para ir al registro directo
        // history.push(`/registro-gmm/${params.poliza}/${params.rfc}`);
        valores.poliza = params.poliza;
        valores.rfc = params.rfc;
        valores.inciso = "1";
      }
    }
  }, []);

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
        // alIniciarSesion();
        if (!data.iniciar_sesion.dato.Validado) {
          dispatch({
            type: "AGREGAR",
            valor: valores.contrasena,
            indice: "numeroReporte",
          });
          dispatch({
            type: "AGREGAR",
            valor: data.iniciar_sesion.dato.Validado,
            indice: "usuarioValidado",
          });
        } else {
          localStorage.setItem("fromLogin", true);
          history.push("/inicio");
        }
      } else {
        if (data.iniciar_sesion && data.iniciar_sesion.mensaje) {
          asignarValorMensajeAlerta(data.iniciar_sesion.mensaje);
          asignarValorMostrarBarraAlerta(true);
        }
        asignarValorFocoUsuario("error");
        asignarValorFocoContrasena("error");
      }
      asignarValorCargando(false);
    } else if (loading) {
      asignarValorCargando(true);
    } else if (error) {
      asignarValorCargando(false);
    }
  }, [loading, data]);

  useEffect(() => {
    sessionStorage.removeItem("estadoRedux");
    dispatch({
      type: "BORRAR_ESTADO",
    });
  }, []);

  const contrasenaNoVisible = <IconoNoVisible />;
  const contrasenaVisible = <IconoVisible />;

  const reedirigir = () => {
    if (params.rfc) {
      history.push(`/registro-gmm/${params.poliza}/${params.rfc}`);
      return;
    }

    history.push(`/registro-gmm`);
  };

  return (
    <EnvolvedorPantallaBienvenida key={v4()}>
      {alertaReedireccion && (
        <Alerta
          textoEncabezado="Datos invalidos"
          textoCuerpo="Lo siento, tus datos no son validos. Se te reedirigira a la pantalla de inicio"
        />
      )}
      <Alerta
        textoEncabezado={diccionario.alertaLogin.titulo}
        textoCuerpo={diccionario.alertaLogin.cuerpo}
        etiquetaBoton={diccionario.alertaLogin.boton}
        colorAlerta="rojo"
        mostrarModal={mostrarModalError}
        manejarCierre={() => {
          asignarValorMostrarModalError(false);
        }}
        funcionLlamadaBoton={() => {
          asignarValorMostrarModalError(false);
        }}
        mostrarCierre
      />
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
      <BarraAlerta
        etiqueta={mensajeAlerta}
        mostrarAlerta={mostrarBarraAlerta}
        manejarCierre={() => {
          asignarValorMostrarBarraAlerta(false);
        }}
        estilo="error"
        sinEncabezado
      />
      <BarraAlerta
        etiqueta={diccionario.mensajeAlertaContrasenaCambiada}
        mostrarAlerta={mostrarAlertaContrasenaCambiada}
        manejarCierre={() => {
          asignarValorMostrarAlertaContrasenaCambiada(false);
        }}
        estilo="exitoso"
        sinEncabezado
      />
      <ModalTexto
        titulo={tituloModal}
        texto={cuerpoModal}
        mostrar={mostrarTerminos}
        manejarCierre={asignarValorMostrarTerminos}
      />
      <ImagenBienvenida src={loginGMM} />
      {mostrarPantallaIngreso ? (
        <ContenedorPantallaBienvenida>
          {cargando ? <IndicadorCarga tema="verde" /> : null}
          <RegresarBoton
            type="button"
            onClick={() => {
              // asignarValorMostrarPantallaIngreso(false);
              history.goBack();
            }}
          >
            <ChevronLeftRoundedIcon id="botonRegresar" fontSize="large" />
          </RegresarBoton>
          <TituloBienvenida id="tituloIngreso" ingreso>
            {diccionario.mensajeIngreso}
          </TituloBienvenida>
          <SeparadorEspacio />
          <CampoTexto
            id="campoUsuario"
            etiqueta={diccionario.etiquetaUsuario}
            enCambio={alCambiarUsuario}
            foco={focoUsuario}
            valor={valores.usuario}
          />
          {errorUsuario !== "" && (
            <MensajeError id="errorUsuario">{errorUsuario}</MensajeError>
          )}
          <SeparadorEspacio />
          <CampoTexto
            id="campoContrasena"
            etiqueta={diccionario.etiquetaContrasena}
            esContrasena={nuevaContrasenaVisible}
            icono={
              nuevaContrasenaVisible ? contrasenaNoVisible : contrasenaVisible
            }
            enCambio={alCambiarContrasena}
            foco={focoContrasena}
            valor={valores.contrasena}
            enClickIcono={() => {
              asignarNuevaContrasenaVisible(!nuevaContrasenaVisible);
            }}
          />
          <Instrucciones
            id="enlaceOlvideContrasena"
            onClick={() => {
              history.push("/contrasena-olvidada");
            }}
          >
            {diccionario.linkOlvideContrasena}
          </Instrucciones>
          <Boton
            ref={botonRef}
            etiqueta={diccionario.etiquetaEntrar}
            tema={btnTema}
            id="botonIngresar"
            enClick={() => {
              alDarClickEnEntrar();
            }}
          />
        </ContenedorPantallaBienvenida>
      ) : (
        <ContenedorPantallaBienvenida>
          <TituloBienvenidaH1 id="tituloBienvenida">
            {diccionario.mensajeBienvenida}
          </TituloBienvenidaH1>
          <ContenedorLogoBienvenida style={{ marginBottom: "60px" }}>
            <LogoBienvenida
              src={logoContigo}
              alt="hdi-contigo hdi-tu-compania"
            />
          </ContenedorLogoBienvenida>
          <SeparadorEspacio />
          <Boton
            etiqueta={diccionario.etiquetaIngresar}
            tema="simple-gris"
            id="botonIngresar"
            enClick={() => {
              asignarValorMostrarPantallaIngreso(true);
            }}
          />
          <EnlaceRegistroBienvenida>
            <EnlaceBienvenida
              id="enlaceRegistro"
              enlace
              onClick={() => {
                reedirigir();
              }}
            >
              {diccionario.mensajeRegistro}
            </EnlaceBienvenida>
          </EnlaceRegistroBienvenida>
          <PieDePaginaBienvenida>
            <Link to="/terminos" className="navlink">
              {diccionario.terminos}
            </Link>
            <SeparadorBienvenida />
            <Link to="/privacidad" className="navlink">
              {diccionario.aviso}
            </Link>
          </PieDePaginaBienvenida>
        </ContenedorPantallaBienvenida>
      )}
    </EnvolvedorPantallaBienvenida>
  );
};

export default PantallaBienvenidaGMM;
