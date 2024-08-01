/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSubscription } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  TituloMenuEspera,
  ContenedorIcono,
  ContenedorPantalla,
  ContenedorTitulo,
} from "./PantallaCompartirSiniestro.styled";
import EncabezadoReporte from "../../encabezado-reporte";
import CampoTexto from "../../campo-texto";
import Boton from "../../boton";
import { Alerta } from "../../alerta";
import Constantes from "../../../recursos/constantes";

const SUSCRIPCION_AJUSTADOR = loader(
  "../../../graphQL/subscription/reporte/evento_actualizaciones_reportes.graphql"
);

const nombreCookie = Constantes.nombreDeCookie;

const diccionario = {
  titulo: "Compartir",
  texto1: "Hola, soy ",
  texto2: ", acabo de reportar un choque y me encuentro bien.",
  complementoTexto: "",
  etiquetaBoton: "Compartir",
  etiquetaCampoTextoMensaje: "Mensaje",
  alertas: {
    alertaNoSoportado: {
      encabezado: "Error",
      texto: "Tu navegador no soporta la capacidad de compartir.",
    },
    alertaSeCompartioExitosamente: {
      encabezado: "",
      texto: "Se compartió exitosamente.",
    },
    alertaOcurrioUnError: {
      encabezado: "Error",
      texto: "Ocurrió un error.",
    },
    alertaLlegadaAjustador: {
      encabezado: "Tu ajustador ha llegado",
      texto:
        // eslint-disable-next-line max-len
        "<p>El ajustador nos ha notificado que ya está contigo.</p><p>A partir de este momento podrás darle seguimiento a la resolución de tu siniestro.</p>",
      textoBoton: "Continuar",
    },
  },
  errores: {
    errorCompartirCancelado: "Abort error",
  },
  encabezadoAlerta: "",
  textoAlerta: "",
};

const PantallaCompartirSiniestro = () => {
  const paginaAnterior = "/menu-espera";
  const history = useHistory();
  const location = useLocation();
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  const [focoMensaje, asignarValorFocoMensaje] = useState("");
  const [mostrarModalAlerta, asignarValorMostrarModalAlerta] = useState(false);
  const [mostrarModalAjustador, asignarValorMostrarModalAjustador] = useState(
    false
  );

  const estadoApp = useSelector((estado) => estado);
  let numeroReporte;
  if (estadoApp.datosReporte && estadoApp.datosReporte.numeroReporte) {
    numeroReporte = estadoApp.datosReporte.numeroReporte;
  } else if (
    location &&
    location.search &&
    location.search.includes("numeroReporte")
  ) {
    const params = new URLSearchParams(location.search);
    numeroReporte = params.get("numeroReporte");
  } else {
    history.push({
      pathname: "/",
      state: {
        mostrarAlerta: true,
      },
    });
  }
  let nombreUsuario = "";
  const latEstado =
    estadoApp && estadoApp.coordenadasIniciales
      ? estadoApp.coordenadasIniciales.lat
      : null;
  const lngEstado =
    estadoApp && estadoApp.coordenadasIniciales
      ? estadoApp.coordenadasIniciales.lng
      : null;
  if (estadoApp.datosPoliza && estadoApp.datosPoliza.nombreCompletoAsegurado) {
    nombreUsuario = estadoApp.datosPoliza.nombreCompletoAsegurado;
  } else if (estadoApp.datosCuenta && estadoApp.datosCuenta.nombre) {
    nombreUsuario = estadoApp.datosCuenta.nombre;
  } else if (estadoApp.nombreConductor) {
    nombreUsuario = estadoApp.nombreConductor;
  } else if (objetoCookie && objetoCookie.nombreReporta) {
    nombreUsuario = objetoCookie.nombreReporta;
  } else if (objetoCookie && objetoCookie.NombreAsegurado) {
    nombreUsuario = objetoCookie.NombreAsegurado;
  } else {
    nombreUsuario = "";
  }

  const ligaUbicacion = `https://maps.google.com/?q=${latEstado},${lngEstado}`;
  // console.log(estadoApp);
  const valores = {
    mensaje: `${diccionario.texto1}${nombreUsuario}${diccionario.texto2}`,
  };

  const alCompartirExistosamente = () => {
    diccionario.encabezadoAlerta =
      diccionario.alertas.alertaSeCompartioExitosamente.encabezado;
    diccionario.textoAlerta =
      diccionario.alertas.alertaSeCompartioExitosamente.texto;
    asignarValorMostrarModalAlerta(true);
    history.push({
      pathname: paginaAnterior,
      search: `?numeroReporte=${numeroReporte}`,
    });
  };

  const alCompartirErroneamente = () => {
    diccionario.encabezadoAlerta =
      diccionario.alertas.alertaOcurrioUnError.encabezado;
    diccionario.textoAlerta = diccionario.alertas.alertaOcurrioUnError.texto;
    asignarValorMostrarModalAlerta(true);
  };

  const alCambiarMensaje = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.mensaje = valor;
    }
  };

  const validacionRespuestas = () => {
    const { mensaje } = valores;
    if (!mensaje) {
      asignarValorFocoMensaje("error");
    } else {
      asignarValorFocoMensaje("");
    }
    if (mensaje) {
      if (navigator.share) {
        navigator
          .share({
            title: "HDI Seguros",
            text: `${mensaje} ${diccionario.complementoTexto}`,
            url: ligaUbicacion,
          })
          .then(() => {
            alCompartirExistosamente();
          })
          .catch((error) => {
            if (error.includes(diccionario.errores.errorCompartirCancelado)) {
              return;
            }
            alCompartirErroneamente();
          });
      } else {
        diccionario.encabezadoAlerta =
          diccionario.alertas.alertaNoSoportado.encabezado;
        diccionario.textoAlerta = diccionario.alertas.alertaNoSoportado.texto;
        asignarValorMostrarModalAlerta(true);
      }
    }
  };

  const { data } = useSubscription(SUSCRIPCION_AJUSTADOR, {
    variables: { numeroReporte },
  });

  useEffect(() => {
    if (
      data &&
      data.escucha_evento_actualizacion_reporte &&
      data.escucha_evento_actualizacion_reporte.tipoMensaje &&
      data.escucha_evento_actualizacion_reporte.tipoMensaje === 1
    ) {
      asignarValorMostrarModalAjustador(true);
    }
  }, [data]);

  return (
    <EnvolvedorPantalla key={v4()}>
      <Alerta
        textoEncabezado={diccionario.encabezadoAlerta}
        textoCuerpo={diccionario.textoAlerta}
        mostrarModal={mostrarModalAlerta}
        manejarCierre={() => {
          asignarValorMostrarModalAlerta(false);
        }}
        mostrarIcono={false}
      />
      <Alerta
        colorAlerta="azul"
        tipoIcono="palomita"
        textoEncabezado={diccionario.alertas.alertaLlegadaAjustador.encabezado}
        textoCuerpo={diccionario.alertas.alertaLlegadaAjustador.texto}
        mostrarModal={mostrarModalAjustador}
        etiquetaBoton={diccionario.alertas.alertaLlegadaAjustador.textoBoton}
        funcionLlamadaBoton={() => {
          history.push({
            pathname: "/pasos-progreso",
            search: `?numeroReporte=${numeroReporte}`,
          });
        }}
        mostrarCierre={false}
      />
      <EncabezadoReporte reporte={numeroReporte} />
      <Pantalla>
        <ContenedorTitulo>
          <TituloMenuEspera id="titulo">{diccionario.titulo}</TituloMenuEspera>
          <ContenedorIcono
            id="botonCerrar"
            onClick={() => {
              history.push({
                pathname: paginaAnterior,
                search: `?numeroReporte=${numeroReporte}`,
              });
            }}
          >
            <CloseRoundedIcon />
          </ContenedorIcono>
        </ContenedorTitulo>
        <ContenedorPantalla>
          <CampoTexto
            id="mensaje"
            valor={valores.mensaje}
            enCambio={alCambiarMensaje}
            foco={focoMensaje}
            esAreaDeTexto
            numeroDeRenglones={8}
            numeroDeCaracteres={160}
            conteoDeCaracteres
          />
        </ContenedorPantalla>
        <Boton
          estilo={{ marginTop: "20px" }}
          etiqueta={diccionario.etiquetaBoton}
          enClick={validacionRespuestas}
        />
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

export default PantallaCompartirSiniestro;
