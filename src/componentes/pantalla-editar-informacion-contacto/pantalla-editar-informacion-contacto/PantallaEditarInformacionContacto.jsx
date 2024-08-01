import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  ContenedorBoton,
  ContenedorValor,
  MensajeError,
  MensajePequeno,
  Separador,
  SeparadorEspacio,
  SeparadorLinea,
  Titulo,
} from "./PantallaEditarInformacionContacto.styled";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import Encabezado from "../../encabezado";
import Boton from "../../boton";
import CampoTexto from "../../campo-texto";
import Constantes from "../../../recursos/constantes";

const valores = {
  telefono: "",
  email: "",
  color: "",
  placas: "",
};

const { nombreDeCookie } = Constantes;

const PantallaEditarInformacionContacto = () => {
  const history = useHistory();
  const estadoApp = useSelector((estado) => estado);
  const dispatch = useDispatch();
  const [cookie] = useCookies([nombreDeCookie]);
  let prellenadoTelefono = false;

  if (estadoApp && estadoApp.informacionContacto) {
    valores.telefono = estadoApp.informacionContacto.telefono;
    valores.email = estadoApp.informacionContacto.email;
    valores.color = estadoApp.informacionContacto.color;
    valores.placas = estadoApp.informacionContacto.placas;
    const objetoCookie = cookie[nombreDeCookie];
    if (objetoCookie && valores.telefono === objetoCookie.Telefono) {
      prellenadoTelefono = true;
    }
  }

  const diccionario = {
    encabezado: "Editar",
    titulo: "Por favor verifica y completa la siguiente información",
    mensajePequeno: "Estos datos le facilitarán a tu ajustador localizarte.",
    separadorInfoContacto: "información de contacto",
    separadorInfoVehiculo: "información del vehículo",
    etiquetas: {
      telefono: "Teléfono",
      email: "Email",
      color: "Color",
      placas: "Placas",
      botonGuardar: "Guardar cambios",
    },
    marcadores: {
      telefono: "Ingresa tu número de teléfono.",
      email: "Ingresa tu email.",
      color: "Ingresa el color del vehículo.",
      placas: "Ingresa el número de placas.",
    },
    errores: {
      campoRequerido: "Campo requerido para poder continuar.",
      emailFormato: "El correo electrónico no tiene un formato válido.",
    },
  };

  let esTradicional = false;

  if (
    estadoApp.datosIngresoPoliza &&
    estadoApp.datosIngresoPoliza.fechaPasada
  ) {
    // Si el accidente ocurrió en un día previo, el cuestionario y el
    // estado del semáforo se ignoran, el ajustador debe ser digital y
    // por lo mismo el correo debe ser obligatorio.
    esTradicional = false;
  } else if (
    estadoApp.semaforoAmarillo ||
    (estadoApp.cuestionarioReporte &&
      (estadoApp.cuestionarioReporte.respuesta1 || // "¿Hay personas lesionadas?"no
        estadoApp.cuestionarioReporte.respuesta2 || // "¿Hay otro vehículo involucrado u otros bienes afectados?"no
        estadoApp.cuestionarioReporte.respuesta3 || // "¿Hay autoridades presentes?"no
        estadoApp.cuestionarioReporte.respuesta4 || // "¿El vehículo está derramando líquido?"no
        // estadoApp.cuestionarioReporte.respuesta5 || // "¿El siniestro sucedió en ciudad/zona urbana?"
        estadoApp.cuestionarioReporte.respuesta7 || // "¿En el tablero hay indicadores encendidos?"no
        !estadoApp.cuestionarioReporte.respuesta8 || // "¿La unidad puede circular por sus propios medios?"si
        estadoApp.datosPoliza.contieneModulos))
  ) {
    // Si el incidente fue hoy, y una de las primeras siete respuestas del cuestionario
    // es SÍ o el usuario se saltó el cuestionario por ser semáforo amarillo, se
    // usará el ajustador tradicional y el correo no será obligatorio.
    esTradicional = true;
  }

  const [focoTelefono, asignarFocoTelefono] = useState("");
  const [focoEmail, asignarFocoEmail] = useState("");
  const [focoColor, asignarFocoColor] = useState("");
  const [focoPlacas, asignarFocoPlacas] = useState("");
  const [errorTelefono, asignarErrorTelefono] = useState("");
  const [errorEmail, asignarErrorEmail] = useState("");
  const [errorColor, asignarErrorColor] = useState("");
  const [errorPlacas, asignarErrorPlacas] = useState("");

  const alCambiarTelefono = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.telefono = valor;
    }
  };

  const alCambiarEmail = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.email = valor;
    }
  };

  const alCambiarColor = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.color = valor;
    }
  };

  const alCambiarPlacas = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      valores.placas = valor;
    }
  };

  const validarFormulario = () => {
    const { telefono, email, color, placas } = valores;
    let validado = true;

    if (!telefono) {
      validado = false;
      asignarFocoTelefono("error");
      asignarErrorTelefono(diccionario.errores.campoRequerido);
    } else {
      asignarFocoTelefono("");
      asignarErrorTelefono("");
    }

    if (!email && !esTradicional) {
      validado = false;
      asignarFocoEmail("error");
      asignarErrorEmail(diccionario.errores.campoRequerido);
    } else if (
      email &&
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(email)
    ) {
      validado = false;
      asignarFocoEmail("error");
      asignarErrorEmail(diccionario.errores.emailFormato);
    } else {
      asignarFocoEmail("");
      asignarErrorEmail("");
    }

    if (!placas && !esTradicional) {
      asignarFocoPlacas("error");
      asignarErrorPlacas(diccionario.errores.campoRequerido);
    } else {
      asignarFocoPlacas("");
      asignarErrorPlacas("");
    }

    if (!color) {
      validado = false;
      asignarFocoColor("error");
      asignarErrorColor(diccionario.errores.campoRequerido);
    } else {
      asignarFocoColor("");
      asignarErrorColor("");
    }

    if (validado === true) {
      history.push("/resumen-reporte");
      dispatch({
        type: "AGREGAR",
        valor: { telefono, email, color, placas },
        indice: "informacionContacto",
      });
    }
  };

  return (
    <EnvolvedorPantalla key={v4()} id="EditarInformacionContacto">
      <Encabezado
        titulo={diccionario.encabezado}
        funcionRegresar={() => {
          history.push("/resumen-reporte");
        }}
        alertaAmarilla={estadoApp && estadoApp.semaforoAmarillo}
      />
      <Pantalla>
        <Titulo id="titulo">{diccionario.titulo}</Titulo>
        <MensajePequeno id="mensajePequeno">
          {diccionario.mensajePequeno}
        </MensajePequeno>
        <Separador id="separadorInfoContacto">
          {diccionario.separadorInfoContacto}
        </Separador>
        <SeparadorLinea />
        {prellenadoTelefono ? (
          <ContenedorValor>{valores.telefono}</ContenedorValor>
        ) : (
          <CampoTexto
            id="campoTelefono"
            etiqueta={diccionario.etiquetas.telefono}
            valor={valores.telefono}
            foco={focoTelefono}
            numeroDeCaracteres={10}
            esNumerico
            enCambio={alCambiarTelefono}
            marcador={diccionario.marcadores.telefono}
          />
        )}
        {errorTelefono !== "" && (
          <MensajeError id="errorTelefono">{errorTelefono}</MensajeError>
        )}
        <SeparadorEspacio />
        <CampoTexto
          id="campoEmail"
          etiqueta={diccionario.etiquetas.email}
          marcador={diccionario.marcadores.email}
          valor={valores.email}
          foco={focoEmail}
          enCambio={alCambiarEmail}
        />
        {errorEmail !== "" && (
          <MensajeError id="errorEmail">{errorEmail}</MensajeError>
        )}
        <SeparadorEspacio />
        <SeparadorEspacio />
        <Separador id="separadorInfoVehiculo">
          {diccionario.separadorInfoVehiculo}
        </Separador>
        <SeparadorLinea />
        <CampoTexto
          id="campoColor"
          etiqueta={diccionario.etiquetas.color}
          marcador={diccionario.marcadores.color}
          valor={valores.color}
          foco={focoColor}
          enCambio={alCambiarColor}
        />
        {errorColor !== "" && (
          <MensajeError id="errorColor">{errorColor}</MensajeError>
        )}
        <SeparadorEspacio />
        <CampoTexto
          id="campoPlacas"
          etiqueta={diccionario.etiquetas.placas}
          marcador={diccionario.marcadores.placas}
          valor={valores.placas}
          numeroDeCaracteres={10}
          foco={focoPlacas}
          enCambio={alCambiarPlacas}
        />
        {errorPlacas !== "" && (
          <MensajeError id="errorPlacas">{errorPlacas}</MensajeError>
        )}
        <ContenedorBoton>
          <Boton
            etiqueta={diccionario.etiquetas.botonGuardar}
            tema="estandar"
            enClick={validarFormulario}
          />
        </ContenedorBoton>
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

export default PantallaEditarInformacionContacto;
