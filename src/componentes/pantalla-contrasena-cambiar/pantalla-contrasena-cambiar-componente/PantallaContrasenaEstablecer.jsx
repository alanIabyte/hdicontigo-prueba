import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { loader } from "graphql.macro";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import {
  ContenedorBoton,
  ContenedorOmitir,
  ContenedorValorTelefono,
  Cuerpo,
  LigaOmitir,
  LinkNoEnviado,
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

const ASIGNACION_CREDENCIALES = loader(
  "../../../graphQL/mutation/seguridad/asignacion_credenciales.graphql"
);

const REENVIAR_CODIGO = loader(
  "../../../graphQL/query/seguridad/reenviar_codigo_activacion.graphql"
);

const nombreCookie = Constantes.nombreDeCookie;

let codigo = ["", "", "", ""];
let accion = "";

const valores = {
  nuevaContrasena: "",
  repetirNuevaContrasena: "",
};

const PantallaContrasenaEstablecer = () => {
  const history = useHistory();
  const estadoApp = useSelector((estado) => estado);
  const dispatch = useDispatch();
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  const validado = objetoCookie ? objetoCookie.Validado : false;
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    history.push("/");
  }
  const usuario = objetoCookie ? objetoCookie.Usuario : "5555555555";
  const token = objetoCookie ? objetoCookie.access_token : "token";
  const contrasenaActual =
    estadoApp && estadoApp.numeroReporte
      ? estadoApp.numeroReporte
      : "contrasenaActual";
  const telefonoMascara = `*** *** ${usuario.substring(6, 10)}`;

  const [pantalla, asignarValorPantalla] = useState(
    "PantallaContrasenaEstablecer"
  );
  const [focoCodigo, asignarValorFocoCodigo] = useState("");
  const [cargando, asignarValorCargando] = useState(false);
  const [
    mostrarBarraAlertaCodigoEnviado,
    asignarValorMostrarBarraAlertaCodigoEnviado,
  ] = useState(true);

  const [establecerContrasena, { data, loading }] = useMutation(
    ASIGNACION_CREDENCIALES
  );

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

  const alCambiarCodigo = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      const numeroCodigo = codigo;
      const indice = Number(evento.target.dataset.indice);
      numeroCodigo[indice] = valor;
      codigo = numeroCodigo;
    }
  };

  const enviarPeticion = (codigoPeticion) => {
    establecerContrasena({
      variables: {
        codigoActivacion: codigoPeticion,
        contrasenaNueva: valores.nuevaContrasena,
        verificarCodigoActivacion: !validado,
        contrasenaActual,
        token,
        usuario,
      },
    });
  };

  const envioCodigo = () => {
    accion = "envioCodigo";
    enviarPeticion(0);
  };

  const confirmacionCodigo = () => {
    accion = "confirmarCodigo";
    let serieCompleta = true;
    for (let i = 0; i < codigo.length; i += 1) {
      if (!codigo[i]) {
        serieCompleta = false;
      }
    }

    if (!serieCompleta) {
      asignarValorFocoCodigo("error");
    } else {
      enviarPeticion(codigo.join(""));
    }
  };

  const siguientePaso = () => {
    switch (accion) {
      case "envioCodigo":
        asignarValorPantalla("PantallaVerificacionCodigo");
        break;
      case "confirmarCodigo":
        dispatch({
          type: "AGREGAR",
          valor: true,
          indice: "usuarioValidado",
        });
        history.push({
          pathname: "/polizas-siniestradas",
          state: { notificacionTelefonoVerificado: true },
        });
        break;
      case "reenviarCodigo":
        asignarValorPantalla("PantallaVerificacionCodigo");
        break;
      default:
    }
  };

  useEffect(() => {
    if (!loading && data) {
      asignarValorCargando(false);
      if (
        data &&
        data.asignacion_credenciales &&
        data.asignacion_credenciales.completado
      ) {
        siguientePaso();
      }
    } else if (loading) {
      asignarValorCargando(true);
    }
  }, [data, loading]);

  const cambiaPantalla = (variables) => {
    asignarValorPantalla("PantallaEnvioCodigo");
    valores.nuevaContrasena = variables.nuevaContrasena;
  };

  // Formulario para el ingreso de la nueva contraseña
  let pantallaAMostrar = (
    <EnvolvedorPantalla key={v4()} id="PantallaContrasenaEstablecer">
      {cargando ? <IndicadorCarga /> : null}
      <Encabezado
        titulo={diccionario.tituloEstablecer}
        mostrarBotonRegresar={false}
      />
      <Pantalla>
        <Cuerpo>{diccionario.cuerpo}</Cuerpo>
        <FormularioContrasena
          etiquetaContrasena={diccionario.etiquetaContrasena}
          etiquetaRepetirContrasena={diccionario.etiquetaRepetirContrasena}
          boton={diccionario.botonEstablecer}
          accionBoton={cambiaPantalla}
        />
        <ContenedorOmitir
          onClick={() => {
            history.push({
              pathname: "/inicio",
            });
          }}
        >
          <LigaOmitir>{diccionario.etiquetaOmitir}</LigaOmitir>
        </ContenedorOmitir>
      </Pantalla>
    </EnvolvedorPantalla>
  );

  // Pantalla para la solicitud del envío del código vía SMS
  if (pantalla === "PantallaEnvioCodigo") {
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
              enClick={envioCodigo}
            />
          </ContenedorBoton>
        </Pantalla>
      </EnvolvedorPantalla>
    );
  }

  // Pantalla para el ingreso del código de verificación
  if (pantalla === "PantallaVerificacionCodigo") {
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
