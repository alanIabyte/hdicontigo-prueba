import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { useMutation } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import {
  ContenedorBoton,
  ContenedorValor,
  EtiquetaValor,
  MensajeError,
  MensajePequeno,
  SeparadorEspacio,
  Titulo,
} from "./PantallaCreacionCuenta.styled";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import Boton from "../../boton";
import CampoTexto from "../../campo-texto";
import EncabezadoReporte from "../../encabezado-reporte";
import { Alerta } from "../../alerta";
import IndicadorCarga from "../../indicador-carga";

const CREAR_USUARIO = loader(
  "../../../graphQL/mutation/seguridad/crear_usuario.graphql"
);

const valores = {
  nombre: "",
  apellido: "",
  email: null,
};

const dict = {
  titulo: "Completa los datos para crear tu cuenta",
  /* eslint-disable max-len */
  mensajePequeno:
    "Concluye tu registro en HDI Contigo para que puedas consultar el seguimiento de tu siniestro cuando quieras.",
  botonContinuar: "Continuar y registrarme",
  campoNombre: "Nombre",
  campoApellido: "Apellido",
  campoTelefono: "Teléfono",
  campoEmail: "Correo electrónico",
  errorCampoRequerido: "Campo requerido para poder continuar.",
  alerta: {
    titulo: "Cuenta no creada",
    cuerpo:
      "Por el momento tu cuenta no pudo ser creada. Te recomendamos intentarlo nuevamente.",
    etiquetaBoton: "Intentar nuevamente",
    etiquetaBoton2: "Continuar sin registro",
  },
  alertaEmail: {
    titulo: "Cuenta no creada",
    cuerpo:
      "El correo proporcionado ya se encuentra previamente registrado, favor de proporcionar un nuevo correo o dejar el campo en blanco",
    etiquetaBoton: "Cambiar correo",
    etiquetaBoton2: "Continuar sin registro",
  },
  asistenciaRapida: {
    titulo: "Asistencia rápida",
    /* eslint-disable max-len */
    cuerpo: `Tu siniestro fue elegido para ser atendido por nuestra herramienta Ajustador Digital, donde te brindaremos resolución de tu siniestro en menos de 2 horas hábiles.`,
    boton: "Continuar",
  },
};

const PantallaCreacionCuenta = () => {
  const history = useHistory();
  const estadoApp = useSelector((estado) => estado);
  const dispatch = useDispatch();
  const [crearUsuario, { loading, error, data }] = useMutation(CREAR_USUARIO);

  const [focoNombre, asignarFocoNombre] = useState("");
  const [focoApellido, asignarFocoApellido] = useState("");
  const [errorNombre, asignarErrorNombre] = useState("");
  const [errorApellido, asignarErrorApellido] = useState("");
  const [mostrarModal, asignarValorMostrarModal] = useState(false);
  const [mostrarModalEmail, asignarValorMostrarModalEmail] = useState(false);
  const [cargando, asignarValorCargando] = useState(false);

  const [
    mostrarModalAsistenciaRapida,
    asignarValorMostrarModalAsistenciaRapida,
  ] = useState(false);

  const reporte =
    estadoApp.datosReporte && estadoApp.datosReporte.numeroReporte
      ? estadoApp.datosReporte.numeroReporte
      : 0;

  const telefonoContacto = estadoApp.informacionContacto
    ? estadoApp.informacionContacto.telefono
    : "";

  const emailContacto = estadoApp.informacionContacto
    ? estadoApp.informacionContacto.email
    : "";

  if (valores.email === null) {
    valores.email =
      estadoApp.informacionContacto && estadoApp.informacionContacto.email
        ? estadoApp.informacionContacto.email
        : "";
  }

  let nombreTmp = "";
  if (valores.nombre === "" || valores.apellido === "") {
    if (estadoApp.nombreConductor) {
      nombreTmp = estadoApp.nombreConductor;
      const desNombre = nombreTmp.trim().split(" ");
      // eslint-disable-next-line prefer-destructuring
      valores.nombre = desNombre[0];
      desNombre.shift();
      valores.apellido = desNombre.join(" ");
    } else if (estadoApp.datosPoliza) {
      nombreTmp = estadoApp.datosPoliza.nombreCompletoAsegurado;
      const desNombre = nombreTmp.trim().split(" ");
      const ultimo = desNombre.length - 1;
      valores.nombre = desNombre[ultimo];
      desNombre.pop();
      valores.apellido = desNombre.join(" ");
    }
  }

  const alCambiarNombre = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.nombre = valor;
    }
  };

  const alCambiarApellido = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.apellido = valor;
    }
  };

  const alCambiarEmail = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.email = valor;
    }
  };

  const validarFormulario = () => {
    let validado = true;
    const { nombre, apellido } = valores;

    if (!nombre) {
      validado = false;
      asignarFocoNombre("error");
      asignarErrorNombre(dict.errorCampoRequerido);
    } else {
      asignarFocoNombre("");
      asignarErrorNombre("");
    }

    if (!apellido) {
      validado = false;
      asignarFocoApellido("error");
      asignarErrorApellido(dict.errorCampoRequerido);
    } else {
      asignarFocoApellido("");
      asignarErrorApellido("");
    }

    if (validado) {
      crearUsuario({
        variables: {
          usuario: estadoApp.informacionContacto.telefono,
          contrasena: estadoApp.datosReporte.numeroReporte,
          correoElectronico: valores.email,
          nombre: valores.nombre,
          apellido: valores.apellido,
        },
      });
      dispatch({
        type: "AGREGAR",
        valor: { nombre: valores.nombre, apellido: valores.apellido },
        indice: "datosCuenta",
      });

      if (!emailContacto && valores.email !== "") {
        // eslint-disable-next-line prefer-destructuring
        const informacionContacto = estadoApp.informacionContacto;
        informacionContacto.email = valores.email;
        dispatch({
          type: "AGREGAR",
          valor: informacionContacto,
          indice: "informacionContacto",
        });
      }
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

  useEffect(() => {
    if (!loading && data) {
      asignarValorCargando(false);
      if (data && data.crear_usuario && data.crear_usuario.codigo) {
        if (data.crear_usuario.codigo === "IMGW10001") {
          history.push("/cuenta-creada");
        } else if (data.crear_usuario.codigo === "IDX10008") {
          asignarValorMostrarModalEmail(true);
        } else {
          asignarValorMostrarModal(true);
        }
      }
    } else if (loading) {
      asignarValorCargando(true);
    } else if (error) {
      asignarValorCargando(false);
    }
  }, [loading, data]);

  return (
    <EnvolvedorPantalla key={v4()} id="CreacionCuenta">
      <EncabezadoReporte reporte={reporte} />
      {cargando ? <IndicadorCarga /> : null}
      <Alerta
        textoEncabezado={dict.alerta.titulo}
        colorAlerta="rojo"
        textoCuerpo={dict.alerta.cuerpo}
        mostrarModal={mostrarModal}
        manejarCierre={() => {
          asignarValorMostrarModal(false);
        }}
        etiquetaBoton={dict.alerta.etiquetaBoton}
        funcionLlamadaBoton={() => {
          asignarValorMostrarModal(false);
        }}
        etiquetaBoton2={dict.alerta.etiquetaBoton2}
        funcionLlamadaBoton2={() => {
          if (!estadoApp.datosReporte.esTradicional) {
            asignarValorMostrarModalAsistenciaRapida(true);
          } else {
            history.push("/menu-espera");
          }
        }}
        temaBoton2="simple"
      />
      <Alerta
        textoEncabezado={dict.alertaEmail.titulo}
        colorAlerta="rojo"
        textoCuerpo={dict.alertaEmail.cuerpo}
        mostrarModal={mostrarModalEmail}
        mostrarCierre={false}
        etiquetaBoton={dict.alertaEmail.etiquetaBoton}
        funcionLlamadaBoton={() => {
          asignarValorMostrarModalEmail(false);
        }}
        etiquetaBoton2={dict.alertaEmail.etiquetaBoton2}
        funcionLlamadaBoton2={() => {
          if (!estadoApp.datosReporte.esTradicional) {
            asignarValorMostrarModalAsistenciaRapida(true);
          } else {
            history.push("/menu-espera");
          }
        }}
        temaBoton2="simple"
      />
      <Alerta
        textoEncabezado={dict.asistenciaRapida.titulo}
        colorAlerta="azul"
        textoCuerpo={dict.asistenciaRapida.cuerpo}
        mostrarModal={mostrarModalAsistenciaRapida}
        mostrarCierre={false}
        etiquetaBoton={dict.asistenciaRapida.boton}
        funcionLlamadaBoton={ligaAjustadorDigital}
      />
      <Pantalla>
        <Titulo id="titulo">{dict.titulo}</Titulo>
        <MensajePequeno id="mensajePequeno">
          {dict.mensajePequeno}
        </MensajePequeno>
        <SeparadorEspacio />
        <SeparadorEspacio />
        <CampoTexto
          id="campoNombre"
          etiqueta={dict.campoNombre}
          marcador={dict.campoNombre}
          foco={focoNombre}
          valor={valores.nombre}
          enCambio={alCambiarNombre}
        />
        {errorNombre !== "" && (
          <MensajeError id="errorNombre">{errorNombre}</MensajeError>
        )}
        <SeparadorEspacio />
        <CampoTexto
          id="campoApellido"
          etiqueta={dict.campoApellido}
          marcador={dict.campoApellido}
          foco={focoApellido}
          valor={valores.apellido}
          enCambio={alCambiarApellido}
        />
        {errorApellido !== "" && (
          <MensajeError id="errorApellido">{errorApellido}</MensajeError>
        )}
        <SeparadorEspacio />
        <EtiquetaValor>{dict.campoTelefono}</EtiquetaValor>
        <ContenedorValor>{telefonoContacto}</ContenedorValor>
        <SeparadorEspacio />
        <CampoTexto
          id="campoEmail"
          etiqueta={dict.campoEmail}
          marcador={dict.campoEmail}
          valor={valores.email}
          enCambio={alCambiarEmail}
        />
        <SeparadorEspacio />
        <SeparadorEspacio />
        <ContenedorBoton className="boton-continuar">
          <Boton
            etiqueta={dict.botonContinuar}
            tema="estandar"
            enClick={validarFormulario}
          />
        </ContenedorBoton>
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

export default PantallaCreacionCuenta;
