import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { loader } from "graphql.macro";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import {
  ContenedorBoton,
  ContenedorValorTelefono,
  Cuerpo,
  LinkNoEnviado,
  MensajeError,
  SeparadorEspacio,
} from "./PantallaContrasenaCambiar.styled";
import diccionario from "./Diccionario";
import FormularioContrasena from "./FormularioContrasena";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import IndicadorCarga from "../../indicador-carga";
import CampoTexto from "../../campo-texto";
import Boton from "../../boton";
import Encabezado from "../../encabezado";
import Constantes from "../../../recursos/constantes";
import BarraAlerta from "../../barra-alerta";
import useNotificaciones from "../../../utils/useNotificaciones";

const valores = {
  contrasenaActual: "",
  nuevaContrasena: "",
  repetirNuevaContrasena: "",
};

const ASIGNACION_CREDENCIALES = loader(
  "../../../graphQL/mutation/seguridad/asignacion_credenciales.graphql"
);

const CERRAR_SESION = loader(
  "../../../graphQL/mutation/seguridad/cerrar_sesion.graphql"
);

const REENVIAR_CODIGO = loader(
  "../../../graphQL/query/seguridad/reenviar_codigo_activacion.graphql"
);

const nombreCookie = Constantes.nombreDeCookie;
let enviaCodigo = false;
let codigo = ["", "", "", ""];

const PantallaContrasenaEstablecer = () => {
  const history = useHistory();
  const [cookie, , removerCookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  const usuario = objetoCookie ? objetoCookie.Usuario : "5555555555";
  const token = objetoCookie ? objetoCookie.access_token : "token";
  const validado = objetoCookie ? objetoCookie.Validado : false;
  const telefonoMascara = `*** *** ${usuario.substring(6, 10)}`;
  const [pantalla, asignarValorPantalla] = useState("PantallaNuevaContrasena");
  const [errorContrasenaActual, asignarErrorContrasenaActual] = useState("");
  const [focoContrasenaActual, asignarFocoContrasenaActual] = useState("");
  const [focoCodigo, asignarValorFocoCodigo] = useState("");
  const [cargando, asignarValorCargando] = useState(false);
  const [
    mostrarBarraAlertaCodigoEnviado,
    asignarValorMostrarBarraAlertaCodigoEnviado,
  ] = useState(true);

  const [cambiarCredenciales, { data, loading }] = useMutation(
    ASIGNACION_CREDENCIALES
  );

  const { crearNotificacion } = useNotificaciones();

  const [
    cerrarSesionQuery,
    { loading: loadingSesion, error, data: dataSesion },
  ] = useMutation(CERRAR_SESION);

  const [reenviarCodigo, { loadingCodigo, errorCodigo, dataCodigo }] =
    useLazyQuery(REENVIAR_CODIGO, {
      fetchPolicy: "cache-and-network",
    });

  useEffect(() => {
    if (
      !loadingCodigo &&
      dataCodigo &&
      dataCodigo.reenviar_codigo_activacion &&
      dataCodigo.reenviar_codigo_activacion.completado
    ) {
      asignarValorCargando(false);
    } else if (errorCodigo) {
      asignarValorCargando(false);
    } else if (loading) {
      asignarValorCargando(true);
    }
  }, [dataCodigo, loadingCodigo, errorCodigo]);

  const reenvioCodigoVerificacion = () => {
    reenviarCodigo({
      variables: { token, usuario },
    });
  };

  useEffect(() => {
    if (!loadingSesion && dataSesion) {
      if (dataSesion.cerrar_sesion && dataSesion.cerrar_sesion.dato) {
        removerCookie(nombreCookie);
        history.push({
          pathname: "/",
          state: { notificacionContrasenaCambiada: true },
        });
      }
      asignarValorCargando(false);
    } else if (loadingSesion) {
      asignarValorCargando(true);
    } else if (error) {
      asignarValorCargando(false);
    }
  }, [loadingSesion, dataSesion]);

  const siguientePaso = (accion) => {
    switch (accion) {
      case "envioCodigo":
        asignarValorPantalla("PantallaConfirmacionCodigo");
        break;
      case "confirmarCodigo":
        if (objetoCookie) {
          valores.contrasenaActual = "";
          cerrarSesionQuery({ variables: { usuario, token } });
        } else {
          history.push({
            pathname: "/",
            state: { notificacionContrasenaCambiada: true },
          });
        }
        break;
      default:
        if (objetoCookie) {
          valores.contrasenaActual = "";
          cerrarSesionQuery({ variables: { usuario, token } });
        } else {
          history.push({
            pathname: "/",
            state: { notificacionContrasenaCambiada: true },
          });
        }
        break;
    }
  };

  useEffect(() => {
    if (!loading && data && data.asignacion_credenciales) {
      asignarValorCargando(false);
      if (data.asignacion_credenciales.completado) {
        if (!enviaCodigo) {
          enviaCodigo = true;
          siguientePaso("envioCodigo");
        } else {
          siguientePaso("confirmarCodigo");
        }
      } else {
        asignarErrorContrasenaActual(data.asignacion_credenciales.mensaje);
        asignarFocoContrasenaActual("error");
        valores.contrasenaNueva = "";
        valores.repetirContrasenaNueva = "";
        asignarValorPantalla("PantallaContrasenaNueva");
      }
    } else if (loading) {
      asignarValorCargando(true);
    }
  }, [data, loading]);

  const alCambiarContrasenaActual = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.contrasenaActual = valor;
    }
  };

  const cambiarContrasena = (variables) => {
    valores.nuevaContrasena = variables.nuevaContrasena;
    if (validado) {
      cambiarCredenciales({
        variables: {
          codigoActivacion: 0,
          contrasenaNueva: valores.nuevaContrasena,
          verificarCodigoActivacion: false,
          contrasenaActual: valores.contrasenaActual,
          token,
          usuario,
        },
      });
      enviaCodigo = true;
      crearNotificacion(
        "Nueva contraseña",
        "Se ha generado una nueva contraseña",
        "noti/cambiarContrasenia/nuevaContrasenia",
        "",
        usuario
      );
    } else {
      asignarValorPantalla("PantallaConfirmacionTelefono");
    }
  };

  const enviarCodigo = () => {
    enviaCodigo = false;
    cambiarCredenciales({
      variables: {
        codigoActivacion: 0,
        contrasenaNueva: valores.nuevaContrasena,
        verificarCodigoActivacion: !validado,
        contrasenaActual: valores.contrasenaActual,
        token,
        usuario,
      },
    });
  };

  const confirmacionCodigo = () => {
    let serieCompleta = true;
    for (let i = 0; i < codigo.length; i += 1) {
      if (!codigo[i]) {
        serieCompleta = false;
      }
    }

    if (!serieCompleta) {
      asignarValorFocoCodigo("error");
    } else {
      cambiarCredenciales({
        variables: {
          codigoActivacion: codigo.join(""),
          contrasenaNueva: valores.nuevaContrasena,
          verificarCodigoActivacion: !validado,
          contrasenaActual: valores.contrasenaActual,
          token,
          usuario,
        },
      });
    }
  };

  const alCambiarCodigo = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      const numeroCodigo = codigo;
      const indice = Number(evento.target.dataset.indice);
      numeroCodigo[indice] = valor;
      codigo = numeroCodigo;
    }
  };

  // Formulario para ingresa la contraseña actual
  let pantallaAMostrar = (
    <EnvolvedorPantalla key={v4()} id="PantallaContrasenaNueva">
      {cargando ? <IndicadorCarga /> : null}
      <Encabezado
        titulo={diccionario.tituloNuevaContrasena}
        mostrarBotonCerrar
        mostrarBotonRegresar={false}
        funcionCerrar={() => {
          history.push("/mi-cuenta");
        }}
      />
      <Pantalla>
        <Cuerpo>{diccionario.cuerpoNuevaContrasena}</Cuerpo>
        <CampoTexto
          id="campoContrasenaActual"
          etiqueta={diccionario.etiquetaContrasenaActual}
          valor={valores.contrasenaActual}
          numeroDeCaracteres={18}
          enCambio={alCambiarContrasenaActual}
          autoenfoque
          esContrasena
          foco={focoContrasenaActual}
        />
        {errorContrasenaActual !== "" && (
          <MensajeError id="errorContrasenaActual">
            {errorContrasenaActual}
          </MensajeError>
        )}
        <SeparadorEspacio />
        <FormularioContrasena
          etiquetaContrasena={diccionario.etiquetaNuevaContrasena}
          etiquetaRepetirContrasena={diccionario.etiquetaRepetirNuevaContrasena}
          boton={diccionario.botonRestablecer}
          accionBoton={cambiarContrasena}
        />
        <SeparadorEspacio />
        <Boton
          id="botonCancelarCambioContrasena"
          etiqueta={diccionario.botonCancelar}
          tema="rojo"
          enClick={() => {
            history.push("/mi-cuenta");
          }}
          botonDelgado
        />
      </Pantalla>
    </EnvolvedorPantalla>
  );

  // Pantalla de confirmación para el envío del código por SMS
  if (pantalla === "PantallaConfirmacionTelefono") {
    pantallaAMostrar = (
      <EnvolvedorPantalla key={v4()} id="PantallaEnvioCodigo">
        {cargando ? <IndicadorCarga /> : null}
        <Encabezado
          titulo={diccionario.tituloEnvioCodigo}
          mostrarBotonRegresar={false}
        />
        <Pantalla>
          <BarraAlerta
            etiqueta={diccionario.etiquetaCodigoEnviado}
            mostrarAlerta={mostrarBarraAlertaCodigoEnviado}
            manejarCierre={asignarValorMostrarBarraAlertaCodigoEnviado}
            estilo="exitoso"
            posicionAbsoluta
          />
          <Cuerpo>{diccionario.cuerpoEnviar}</Cuerpo>
          <ContenedorValorTelefono>{telefonoMascara}</ContenedorValorTelefono>
          <ContenedorBoton>
            <Boton
              etiqueta={diccionario.botonContinuar}
              tema="estandar"
              enClick={enviarCodigo}
            />
          </ContenedorBoton>
        </Pantalla>
      </EnvolvedorPantalla>
    );
  }

  if (pantalla === "PantallaConfirmacionCodigo") {
    pantallaAMostrar = (
      <EnvolvedorPantalla key={v4()} id="PantallaVerificacionCodigo">
        {cargando ? <IndicadorCarga /> : null}
        <Encabezado
          titulo={diccionario.tituloVerificacionCodigo}
          mostrarBotonRegresar={false}
        />
        <Pantalla>
          <Cuerpo>{diccionario.cuerpoVerificacionCodigo}</Cuerpo>
          <CampoTexto
            esSerie
            enCambio={alCambiarCodigo}
            foco={focoCodigo}
            valores={codigo}
            id="campoCodigo"
          />
          <LinkNoEnviado
            id="enlaceNoEnviado"
            onClick={reenvioCodigoVerificacion}
          >
            {diccionario.linkNoEnviado}
          </LinkNoEnviado>
          <ContenedorBoton>
            <Boton
              etiqueta={diccionario.botonContinuar}
              tema="estandar"
              enClick={confirmacionCodigo}
            />
          </ContenedorBoton>
        </Pantalla>
      </EnvolvedorPantalla>
    );
  }

  return pantallaAMostrar;
};

export default PantallaContrasenaEstablecer;
