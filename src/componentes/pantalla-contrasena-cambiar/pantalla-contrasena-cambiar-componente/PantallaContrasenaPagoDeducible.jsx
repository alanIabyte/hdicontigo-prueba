import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useCookies } from "react-cookie";
import { useHistory, useLocation } from "react-router-dom";
import { loader } from "graphql.macro";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import {
  ContenedorBoton,
  ContenedorValorTelefono,
  Cuerpo,
  CuerpoEnfasis,
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
import useAccionesLog from "../../../utils/useAccionesLog";

const ASIGNACION_CREDENCIALES = loader(
  "../../../graphQL/mutation/seguridad/asignacion_credenciales.graphql"
);

const nombreCookie = Constantes.nombreDeCookie;

let codigo = ["", "", "", ""];
let accion = "";

let valores = {
  nuevaContrasena: "",
  repetirNuevaContrasena: "",
};

const PantallaContrasenaPagoDeducible = () => {
  const history = useHistory();
  const location = useLocation();
  const estadoApp = useSelector((estado) => estado);
  const dispatch = useDispatch();
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    history.push("/");
  }
  const usuario = objetoCookie ? objetoCookie.Usuario : "5555555555";
  const { runDownloadLog } = useAccionesLog(usuario);
  const token = objetoCookie ? objetoCookie.access_token : "token";
  const contrasenaActual =
    estadoApp && estadoApp.numeroReporte
      ? estadoApp.numeroReporte
      : "contrasenaActual";
  const telefonoMascara = `*** *** ${usuario.substring(6, 10)}`;
  const nombreUsuario =
    objetoCookie && objetoCookie.NombreAsegurado
      ? objetoCookie.NombreAsegurado
      : "Usuario";

  const [pantalla, asignarValorPantalla] = useState(
    "PantallaContrasenaPagoDeducible"
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
        verificarCodigoActivacion: true,
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

  const reenvioCodigo = () => {
    accion = "reenvioCodigo";
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
        if (
          location &&
          location.state &&
          location.state.ligaPagoDeducible &&
          location.state.monto
        ) {
          const listaDetalle = [
            // eslint-disable-next-line prettier/prettier
            { "columna": "importe", "valor": location.state.mascaraMonto },
          ];
          runDownloadLog(2, listaDetalle);
          window.location.assign(location.state.ligaPagoDeducible);
        } else {
          history.push({
            pathname: "/polizas-siniestradas",
            state: { notificacionTelefonoVerificado: true },
          });
        }
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
    valores = variables;
  };

  // Formulario para el ingreso de la nueva contraseña
  let pantallaAMostrar = (
    <EnvolvedorPantalla key={v4()} id="PantallaContrasenaPagoDeducible">
      {cargando ? <IndicadorCarga /> : null}
      <Encabezado
        titulo={diccionario.tituloEstablecer}
        mostrarBotonRegresar={false}
      />
      <Pantalla>
        <Cuerpo>
          {nombreUsuario}
          {diccionario.cuerpoPagoDeducible1}
          <CuerpoEnfasis>{diccionario.cuerpoPagoDeducible2}</CuerpoEnfasis>
        </Cuerpo>
        <FormularioContrasena
          etiquetaContrasena={diccionario.etiquetaContrasena}
          etiquetaRepetirContrasena={diccionario.etiquetaRepetirContrasena}
          boton={diccionario.botonEstablecer}
          accionBoton={cambiaPantalla}
        />
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
          <LinkNoEnviado id="enlaceNoEnviado" onClick={reenvioCodigo}>
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

export default PantallaContrasenaPagoDeducible;
