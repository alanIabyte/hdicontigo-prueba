/* eslint-disable */
import React, { useState, useRef, useEffect, Suspense , lazy} from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import {
  EnvolvedorPantallaCodigo,
  TituloCodigoVerificacion,
  MensajePequeno,
  ContenedorCampoCodigoVerificacion,
  EnvolvedorFormularioCodigoVerificacion,
  CampoCodigo,
  EnlaceVolverEnviar
} from "./PantallaCodigoVerificacion.styled";
import IndicadorCarga from "../../indicador-carga";
import { Pantalla } from "../../componentes-styled-compartidos/Pantalla.styled";
import EncabezadoCodigoVerificacion from "./encabezado-codigo-verificiacion";
import "./estilos.scss";
import { ContenedorCampo, EnvolvedorFormulario } from "../../pantalla-registro-usuario-sms/pantalla-registro-usuario-sms-component/PantallaRegistroUsuarioSMS.styled";
import { EtiquetaNegro } from "../../componentes-compartidos/PantallaBienvenidaCompartidos.styed";
import { Boton } from "../..";
import { Separador } from "../../pantalla-cuenta/pantalla-cuenta-componente/PantallaCuenta.styled";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useCookies } from "react-cookie";
import Constantes from "../../../recursos/constantes";
import { loader } from "graphql.macro";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router";
import { configLocalStorage, diccionario } from "../../pantalla-bienvenida/pantalla-bienvenida-componente/config";
import { MensajeError } from "../../pantalla-bienvenida/pantalla-bienvenida-componente/PantallaBienvenida.styled";
import { isSignedError } from "../../../utils/errors";

const BarraAlerta = lazy(() => import("../../barra-alerta"));

const INICIAR_SESION_DOS_FACTORES = loader(
  "../../../graphQL/mutation/seguridad/iniciar_sesion_dos_factores.graphql"
);

const ENVIAR_CODIGO_VERIFICACION = loader(
  "../../../graphQL/mutation/seguridad/enviar_codigo_verificacion.graphql"
);

const { nombreDeCookie } = Constantes;

const PantallaCodigoVerificacion = (props) => {

  const [cargando, asignarValorCargando] = useState();
  const [telefono, setTelefono] = useState("");
  const [focusErrorCodigo, asignarFocusErrorCodigo] = useState("");
  const [valorMensajeAlerta, asignarValorMensajeAlerta] = useState("");
  const [valorMostrarBarraAlerta, asignarValorMostrarBarraAlerta] = useState(false);
  const [mostrarErrorCodigo, asignarMostrarErrorCodigo] = useState(false);
  const [botonHabilitadoContinuar, asignarBotonHabilitadoContinuar] = useState(false);
  const inputRefs = Array.from({ length: 4 }, () => useRef(null));
  const [inputCodigo, asignarInputCodigo] = useState(['','','','']);

  const dispatch = useDispatch();
  const [cookie, establecerCookie] = useCookies([nombreDeCookie]);
  const history = useHistory();
  const dispositivo = () => {
    const device = window.navigator.userAgent;
    if ( navigator.userAgent.match(/Intel/i) ||
        navigator.userAgent.match(/Mac/i) ||
        navigator.userAgent.match(/Macintosh/i)) {
          return true;
        } else {
          return false;
        }
  };

  const [iniciarSesionDosFactores, { loading, data, error }] = useMutation(INICIAR_SESION_DOS_FACTORES);
  const [iniciarSesion, { loading: loadingCodigo, data: dataCodigo, error: errorCodigo }] = useMutation(ENVIAR_CODIGO_VERIFICACION);

  const { alIniciarSesion } = props;
  alIniciarSesion();

  useEffect(() => {
    if (
      !localStorage.getItem(configLocalStorage.codigoId) ||
      !localStorage.getItem(configLocalStorage.contrasenia) ||
      !localStorage.getItem(configLocalStorage.usuario)
    ) {
      history.goBack();
    }
  }, []);

  const validaCodigoLength = async () => {
    return new Promise((resolve) => {
      let codigo = "";
      inputCodigo.forEach(input => {
        codigo += input;
      });
      if (codigo.length === 4) {
        asignarBotonHabilitadoContinuar(true);
      } else {
        asignarBotonHabilitadoContinuar(false);
      }
      resolve(true);
    });
  }

  useEffect(async () => {
    await validaCodigoLength();
    inputRefs.forEach((ref, index) => {
      ref.current.value = inputCodigo[index];
    });
  }, [inputCodigo, valorMostrarBarraAlerta, mostrarErrorCodigo]);

  const handleCambiaValor = (index, event) => {
    const input = event.target;
    const value = input.value;
    const esValido = event.target.validity.valid;
    
    const list = [...inputCodigo];
    if(esValido){
    list[index] = value;
    asignarInputCodigo(list);

    setTimeout(() => {
      if (value.length === 0 && index > 0) {
        inputRefs[index - 1].current.focus();
      } else if (value.length === 1 && index < 3) {
        inputRefs[index + 1].current.focus();
      } else if (index === 0) {
        inputRefs[0].current.focus();
      } else if (index === 3) {
        inputRefs[3].current.focus();
      }
    }, 50);
  }else{
  list[index] = "";
  asignarInputCodigo(list);}
  };

  const handleCtrlV = (event) => {
    event.preventDefault();
    const datosPegar = event.clipboardData.getData('text/plain').slice(0, 4);

    const list = ['','','',''];
    datosPegar.split('').forEach((char, index) => {
      list[index] = char;
      asignarInputCodigo(list);

      setTimeout(() => {
        if (index < 3) {
          inputRefs[index + 1].current.focus();
        }
      }, 50);
    });
  };

  const alDarClickEnContinuar = () => {
    asignarMostrarErrorCodigo(false);
    if (
      !localStorage.getItem(configLocalStorage.codigoId) ||
      !localStorage.getItem(configLocalStorage.usuario) ||
      !localStorage.getItem(configLocalStorage.contrasenia)
    ) {
      asignarValorMensajeAlerta(
        "Ocurrió un error al iniciar sesión, por favor inténtalo de nuevo más tarde"
      );
      asignarValorMostrarBarraAlerta(true);
      return;
    }
    //asignarInputCodigo(codigoTemp);
    let codigoTemp = "";
    inputCodigo.forEach(itm => {
      codigoTemp += itm;
    });
    //asignarMostrarErrorCodigo(false);
    iniciarSesionDosFactores({
      variables: {
        codigoVerificacion: codigoTemp,
        codigoVerificacionId: parseInt(localStorage.getItem(configLocalStorage.codigoId)),
        usuario: localStorage.getItem(configLocalStorage.usuario),
        contrasena: localStorage.getItem(configLocalStorage.contrasenia),
        latitud: "0000",
        longitud: "0000",
        plataforma: "HDI Contigo"
      }
    });
  }

  useEffect(()  => {
    if (
      !loading &&
      data &&
      data.iniciar_sesion_dos_factores &&
      data.iniciar_sesion_dos_factores.dato &&
      data.iniciar_sesion_dos_factores.completado &&
      data.iniciar_sesion_dos_factores.dato.access_token
    ) {
      // Guardar cookie y redirigir
      const diaHoraDeInicioDeSesion = moment().unix();
      const nuevoObjetoDeInicioDeSesion = JSON.parse(
        JSON.stringify(data.iniciar_sesion_dos_factores.dato)
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
      localStorage.setItem(
        "nombreUsuarioPerfil",
        JSON.stringify(nuevoObjetoDeInicioDeSesion.NombreAsegurado)
      );
      dispatch({
        type: "AGREGAR",
        valor: {
          telefono: nuevoObjetoDeInicioDeSesion.Telefono,
          email: nuevoObjetoDeInicioDeSesion.CorreoElectronico,
        },
        indice: "informacionContacto",
      });
      alIniciarSesion();
      dispatch({
        type: "AGREGAR",
        valor: data.iniciar_sesion_dos_factores.dato.Validado,
        indice: "usuarioValidado",
      });
      if (!data.iniciar_sesion_dos_factores.dato.Validado) {
        dispatch({
          type: "AGREGAR",
          valor: localStorage.getItem('contrasenia'),
          indice: "numeroReporte",
        });
        return;
      }
      localStorage.removeItem(configLocalStorage.codigoId);
      localStorage.removeItem(configLocalStorage.contrasenia);
      localStorage.removeItem(configLocalStorage.usuario);
      // !Descomentar
      localStorage.setItem("fromLogin", true);
      history.push("/inicio");
    }

    if (
      data &&
      data.iniciar_sesion_dos_factores &&
      data.iniciar_sesion_dos_factores.dato === null) {
      if (data.iniciar_sesion_dos_factores.mensaje.includes("inválido")) {
        asignarMostrarErrorCodigo(true);
      } else {
        asignarValorMensajeAlerta(
          data.iniciar_sesion_dos_factores.mensaje
          );
          asignarValorMostrarBarraAlerta(true);
      }
    }

    if (
      data &&
      data.iniciar_sesion_dos_factores &&
      !data.iniciar_sesion_dos_factores.completado
    ) {
      asignarValorMensajeAlerta(
        "Ocurrió un error al iniciar sesión, por favor inténtalo de nuevo más tarde"
      );
      asignarValorMostrarBarraAlerta(true);
    }

    if (loading) {
      asignarValorCargando(true);
      asignarBotonHabilitadoContinuar(false);
    }

    if (!loading) {
      asignarValorCargando(false);
      asignarBotonHabilitadoContinuar(false);
    }
    if (error) {
      asignarValorMensajeAlerta(
        "Ocurrió un error al iniciar sesión, por favor inténtalo de nuevo más tarde"
      );
      asignarValorMostrarBarraAlerta(true);
      asignarMostrarErrorCodigo(true);
    }
  }, [loading, data, error]);

  useEffect(() => {
    const tel = localStorage.getItem(configLocalStorage.usuario);
    setTelefono(tel.substring(tel.length - 4));
    asignarValorCargando(true);
    setTimeout(() => {
      asignarValorCargando(false);
    }, 1000);
  }, []);

  const enviarCodigo = () => {
    iniciarSesion({
      variables: {
        usuario: localStorage.getItem(configLocalStorage.usuario),
        contrasena: localStorage.getItem(configLocalStorage.contrasenia),
        latitud: "0000",
        longitud: "0000",
        plataforma: "HDI Contigo"
      }
    });
  }

  useEffect(() => {
    if (!loadingCodigo && dataCodigo) {
      if (
        dataCodigo.enviar_codigo_verificacion &&
        dataCodigo.enviar_codigo_verificacion.dato &&
        dataCodigo.enviar_codigo_verificacion.completado
      ) {
        const dataCodigoVerificacion = {
          codigoVerificacionId: dataCodigo.enviar_codigo_verificacion.dato.codigoId,
          minutosExpiracion: dataCodigo.enviar_codigo_verificacion.dato.minutosExpiracion
        };

        if (dataCodigoVerificacion.codigoVerificacionId === 0) {
          asignarValorMensajeAlerta(
            diccionario.mensajeUsuarioContraseniaIncorrectos
          );
          asignarValorMostrarBarraAlerta(true);
          asignarValorCargando(false);
          return;
        }

        localStorage.removeItem(configLocalStorage.codigoId);
        setTimeout(() => {
          localStorage.setItem(configLocalStorage.codigoId, dataCodigoVerificacion.codigoVerificacionId);
        }, 1000);
      } else {
        if (dataCodigo && dataCodigo.enviar_codigo_verificacion && dataCodigo.enviar_codigo_verificacion.mensaje) {
          if (isSignedError(dataCodigo.enviar_codigo_verificacion.mensaje)) {
            asignarValorMensajeAlerta(
              "Ocurrió un error al iniciar sesión, por favor inténtalo de nuevo más tarde"
            );
          }
          asignarValorMensajeAlerta(dataCodigo.enviar_codigo_verificacion.mensaje);
          asignarValorMostrarBarraAlerta(true);
        }
      }
      asignarValorCargando(false);
      return;
    }
    if (loadingCodigo) {
      asignarValorCargando(true);
    }
    if(!loadingCodigo) {
      asignarValorCargando(false);
    }
    if (errorCodigo) {
      asignarValorCargando(false);
      asignarValorMensajeAlerta(
        "Ocurrió un error al iniciar sesión, por favor inténtalo de nuevo más tarde"
      );
      asignarValorMostrarBarraAlerta(true);
    }
  }, [loadingCodigo, dataCodigo, errorCodigo]);

  return (
    <EnvolvedorPantallaCodigo key={v4()}>
      {cargando ? <IndicadorCarga/> : null}

      <Suspense fallback={null}>
        <BarraAlerta
          etiqueta={valorMensajeAlerta}
          mostrarAlerta={valorMostrarBarraAlerta}
          manejarCierre={() => {
            asignarValorMostrarBarraAlerta(false);
          }}
          estilo="error"
          sinEncabezado
        />
      </Suspense>

      <EncabezadoCodigoVerificacion/>

      <Pantalla>
        <TituloCodigoVerificacion id="tituloCodigoVerificacion">Hemos enviado un código de verificación al número con terminación:</TituloCodigoVerificacion>
        <MensajePequeno id="mensajePequeno">
          *** *** { telefono }
        </MensajePequeno>

        <EnvolvedorFormularioCodigoVerificacion>
          <EtiquetaNegro>Ingresa el código</EtiquetaNegro>
          <ContenedorCampoCodigoVerificacion>
            {inputRefs.map((ref, index) => (
              <CampoCodigo
                key={index}
                ref={ref}
                pattern="[0-9]{0,1}"
                className={`campo-digito ${focusErrorCodigo}`}
                inputMode="numeric"
                maxLength="1"
                min= "0"
                max= "9"
                onChange={(e) => handleCambiaValor(index, e)}
                onPaste={(e) => handleCtrlV(e)}
                onClick={() => { asignarFocusErrorCodigo("") }}
              />
            ))}
          </ContenedorCampoCodigoVerificacion>
          {mostrarErrorCodigo &&
            <MensajeError
              id="errorCodigo"
              style={{width: '100%', textAlign: 'center'}}>Código invalido</MensajeError>
          }
          <EnlaceVolverEnviar
            id="volverEnviar"
            disabled={true}
            onClick={enviarCodigo}
          >
            Volver a enviar código
          </EnlaceVolverEnviar>
          {dispositivo() ? 
          <ContenedorCampoCodigoVerificacion>
          <CampoCodigo
                autoFocus
                style={{borderWidth: '0px'}}
              />
          </ContenedorCampoCodigoVerificacion>
          : <></> }
        </EnvolvedorFormularioCodigoVerificacion>
        <Boton
            etiqueta="Continuar"
            tema="estandar"
            deshabilitado={!botonHabilitadoContinuar}
            enClick={alDarClickEnContinuar}
          />
        <Separador style={{ height: '10px' }}/>
        <Boton
          etiqueta="Llamar a HDI"
          tema="simple"
          enClick={() => {
            window.open("tel:*434");
          }}
        />
      </Pantalla>
    </EnvolvedorPantallaCodigo>
  )
};

PantallaCodigoVerificacion.propTyles = {
  alIniciarSesion: PropTypes.func,
};

PantallaCodigoVerificacion.defaultProps = {
  alIniciarSesion: () => {},
}

export default React.memo(
  PantallaCodigoVerificacion,
  (prevProps, nextProps) =>
    prevProps.alIniciarSesion === nextProps.alIniciarSesion
);