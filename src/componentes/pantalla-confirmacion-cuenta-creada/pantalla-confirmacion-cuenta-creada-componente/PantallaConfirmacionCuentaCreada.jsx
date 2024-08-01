import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import VisibilitySharpIcon from "@material-ui/icons/VisibilitySharp";
import VisibilityOffSharpIcon from "@material-ui/icons/VisibilityOffSharp";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  TituloPantallaConfirmacionCuenta,
  CuerpoPantallaConfirmacionCuenta,
  ContenedorDatosUsuario,
  NombreCampo,
  RespuestaCampo,
  InfoExtraCampo,
  SeparadorDatosUsuario,
  ContenedorRespuesta,
  ContenedorIconoOjo,
} from "./PantallaConfirmacionCuentaCreada.styled";
import EncabezadoReporte from "../../encabezado-reporte";
import { Alerta } from "../../alerta";
import Boton from "../../boton";

const PantallaConfirmacionCuentaCreada = () => {
  const [mostrarContrasena, asignarValorMostrarContrasena] = useState(false);
  const [
    mostrarModalAsistenciaRapida,
    asignarValorMostrarModalAsistenciaRapida,
  ] = useState(false);

  const history = useHistory();
  const estadoApp = useSelector((estado) => estado);

  const nombreUsuario = estadoApp.datosCuenta
    ? estadoApp.datosCuenta.nombre
    : "";

  const diccionario = {
    textoTitulo: `${nombreUsuario}, tu cuenta ha sido creada con éxito`,
    textoCuerpo:
      "¡Listo! Ingresa a HDI Contigo cuando lo necesites con este usuario y contraseña:",
    campoUsuario: "Usuario:",
    infoExtraUsuario: "ó con tu teléfono",
    campoContrasena: "Contraseña:",
    contrasenaMascara: "* * * * *",
    infoExtraContrasena:
      "Tu contraseña es tu número de reporte, podrás cambiarla cuando lo desees.",
    etiquetaBoton: "Entendido",
    asistenciaRapida: {
      titulo: "Asistencia rápida",
      /* eslint-disable max-len */
      cuerpo: `${nombreUsuario}, tu siniestro fue elegido para ser atendido por nuestra herramienta Ajustador Digital, donde te brindaremos resolución de tu siniestro en menos de 2 horas hábiles.`,
      boton: "Continuar",
    },
  };

  const reporte =
    estadoApp.datosReporte && estadoApp.datosReporte.numeroReporte
      ? estadoApp.datosReporte.numeroReporte
      : 0;

  const emailContacto = estadoApp.informacionContacto
    ? estadoApp.informacionContacto.email
    : "";

  const telefonoContacto = estadoApp.informacionContacto
    ? estadoApp.informacionContacto.telefono
    : "";

  const despliegaTextoCuerpo = () => ({ __html: diccionario.textoCuerpo });

  const siguientePantalla = () => {
    if (estadoApp.datosReporte.esTradicional) {
      history.push("/menu-espera");
    } else if (!estadoApp.datosReporte.esTradicional) {
      asignarValorMostrarModalAsistenciaRapida(true);
    }
  };

  const ligaAjustadorDigital = () => {
    if (
      estadoApp &&
      estadoApp.datosReporte &&
      estadoApp.datosReporte.urlAjustadorDigital
    ) {
      window.location.replace(estadoApp.datosReporte.urlAjustadorDigital);
    }
    history.push("/");
  };

  return (
    <EnvolvedorPantalla key={v4()}>
      <Alerta
        textoEncabezado={diccionario.asistenciaRapida.titulo}
        colorAlerta="azul"
        textoCuerpo={diccionario.asistenciaRapida.cuerpo}
        mostrarModal={mostrarModalAsistenciaRapida}
        mostrarCierre={false}
        etiquetaBoton={diccionario.asistenciaRapida.boton}
        funcionLlamadaBoton={ligaAjustadorDigital}
      />
      <EncabezadoReporte reporte={reporte} />
      <Pantalla>
        <TituloPantallaConfirmacionCuenta id="titulo">
          {diccionario.textoTitulo}
        </TituloPantallaConfirmacionCuenta>
        <CuerpoPantallaConfirmacionCuenta
          id="mensajePequeno"
          dangerouslySetInnerHTML={despliegaTextoCuerpo()}
        />
        <ContenedorDatosUsuario>
          <NombreCampo id="etiquetaUsuario">
            {diccionario.campoUsuario}
          </NombreCampo>
          {emailContacto && (
            <>
              <RespuestaCampo id="respuestaEmail">
                {emailContacto}
              </RespuestaCampo>
              <InfoExtraCampo id="etiquetaTelefono">
                {diccionario.infoExtraUsuario}
              </InfoExtraCampo>
            </>
          )}
          <RespuestaCampo id="respuestaTelefono">
            {telefonoContacto}
          </RespuestaCampo>
          <SeparadorDatosUsuario />
          <NombreCampo id="etiquetaContrasena">
            {diccionario.campoContrasena}
          </NombreCampo>
          <ContenedorRespuesta>
            <RespuestaCampo id="contrasena">
              {mostrarContrasena && (
                <div>{estadoApp.datosReporte.numeroReporte}</div>
              )}
              {!mostrarContrasena && <div>{diccionario.contrasenaMascara}</div>}
            </RespuestaCampo>
            <ContenedorIconoOjo
              id="botonMostrarContrasena"
              onClick={() => {
                asignarValorMostrarContrasena(!mostrarContrasena);
              }}
            >
              {mostrarContrasena && (
                <VisibilitySharpIcon style={{ fontSize: 18 }} />
              )}
              {!mostrarContrasena && (
                <VisibilityOffSharpIcon style={{ fontSize: 18 }} />
              )}
            </ContenedorIconoOjo>
          </ContenedorRespuesta>
          <InfoExtraCampo id="etiquetaInfoExtra">
            {diccionario.infoExtraContrasena}
          </InfoExtraCampo>
        </ContenedorDatosUsuario>
        <Boton
          id="botonContinuar"
          etiqueta={diccionario.etiquetaBoton}
          enClick={siguientePantalla}
        />
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

export default PantallaConfirmacionCuentaCreada;
