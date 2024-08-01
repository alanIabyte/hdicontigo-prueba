import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  ContenedorBoton,
  ContenedorValor,
  MensajeError,
  Separador,
  SeparadorBarraProgreso,
  SeparadorEspacio,
  SeparadorLinea,
  // Titulo,
} from "./PantallaFormularioInformacionContacto.styled";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import Encabezado from "../../encabezado";
import BarraProgresoReporte from "../../barra-progreso-reporte";
import BarraAlerta from "../../barra-alerta";
import Boton from "../../boton";
import CampoTexto from "../../campo-texto";
import Constantes from "../../../recursos/constantes";
import { TituloPrincipalIzquierda } from "../../componentes-styled-compartidos/Textos";

let valores = {
  telefono: "",
  email: "",
  color: "",
  placas: "",
};

const { nombreDeCookie } = Constantes;

const PantallaFormularioInformacionContacto = () => {
  const history = useHistory();
  const estadoApp = useSelector((estado) => estado);
  const dispatch = useDispatch();
  const [cookie] = useCookies([nombreDeCookie]);
  const [mostrarBarraAlerta, asignarValorMostrarBarraAlerta] = useState(
    estadoApp && estadoApp.semaforoAmarillo
  );
  let prellenadoTelefono = false;
  let barraProgreso;
  let noElementos;
  let paginaAnterior;
  if (
    estadoApp &&
    (estadoApp.semaforoAmarillo ||
      (estadoApp.datosIngresoPoliza &&
        estadoApp.datosIngresoPoliza.fechaPasada))
  ) {
    barraProgreso = 1;
    noElementos = 3;
    paginaAnterior = "/ingreso-poliza";
  } else {
    barraProgreso = 2;
    noElementos = 4;
    paginaAnterior = "/cuestionario-reporte";
  }

  if (estadoApp && estadoApp.informacionContacto) {
    valores = estadoApp.informacionContacto;
    const objetoCookie = cookie[nombreDeCookie];
    if (objetoCookie && valores.telefono === objetoCookie.Telefono) {
      prellenadoTelefono = true;
    }
  }

  const diccionario = {
    encabezado: "Generando reporte",
    barraProgresoTitulo: "Información complementaria",
    mensajeAlerta: "Tu póliza presenta falta de pago. Te seguimos atendiendo.",
    titulo:
      "Verifica y completa tu información para facilitar que el ajustador te localice",
    mensajePequeno: "Estos datos le facilitarán a tu ajustador localizarte.",
    separadorInfoContacto: "información de contacto",
    separadorInfoVehiculo: "información del vehículo",
    etiquetas: {
      telefono: "Teléfono",
      email: "Correo electrónico",
      color: "Ingresa el color de vehículo",
      placas: "Ingresa las placas del vehículo",
      botonContinuar: "Continuar",
    },
    marcadores: {
      telefono: "Ingresa tu número de teléfono.",
      email: "Ingresa tu email.",
      color: "Ejemplo: azul",
      placas: "Ejemplo: AA HUU 32",
    },
    errores: {
      campoRequerido: "Campo requerido para poder continuar.",
      emailFormato: "El correo electrónico no tiene un formato válido.",
      telefonoLongitud: "El número de teléfono debe tener 10 caracteres.",
    },
  };

  const [focoTelefono, asignarFocoTelefono] = useState("");
  const [focoEmail, asignarFocoEmail] = useState("");
  const [focoColor, asignarFocoColor] = useState("");
  const [focoPlacas, asignarFocoPlacas] = useState("");
  const [errorTelefono, asignarErrorTelefono] = useState("");
  const [errorEmail, asignarErrorEmail] = useState("");
  const [errorColor, asignarErrorColor] = useState("");
  const [errorPlacas, asignarErrorPlacas] = useState("");
  const [mostrarIconoAlerta, asignarValorMostrarIconoAlerta] = useState(false);

  const alternarBarraAlertaIconoAlerta = () => {
    asignarValorMostrarBarraAlerta(false);
    asignarValorMostrarIconoAlerta(true);
  };

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
      (estadoApp.cuestionarioReporte.respuesta1 ||
        estadoApp.cuestionarioReporte.respuesta2 ||
        estadoApp.cuestionarioReporte.respuesta3 ||
        estadoApp.cuestionarioReporte.respuesta4 ||
        // estadoApp.cuestionarioReporte.respuesta5 ||
        estadoApp.cuestionarioReporte.respuesta7 ||
        !estadoApp.cuestionarioReporte.respuesta8 ||
        estadoApp.datosPoliza.contieneModulos))
  ) {
    // Si el incidente fue hoy, y las primeras cinco respuestas del cuestionario
    // son SÍ o el usuario se saltó el cuestionario por ser semáforo amarillo, se
    // usará el ajustador tradicional y el correo no será obligatorio.
    esTradicional = true;
  }

  const validarFormulario = () => {
    const { telefono, email, color, placas } = valores;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;

    if (!telefono) {
      asignarFocoTelefono("error");
      asignarErrorTelefono(diccionario.errores.campoRequerido);
    } else if (telefono.length < 10) {
      asignarFocoTelefono("error");
      asignarErrorTelefono(diccionario.errores.telefonoLongitud);
    } else {
      asignarFocoTelefono("");
      asignarErrorTelefono("");
    }

    let banderaErrorEmail = false;
    if (!email && !esTradicional) {
      banderaErrorEmail = true;
      asignarFocoEmail("error");
      asignarErrorEmail(diccionario.errores.campoRequerido);
    } else if (email && !emailRegex.test(email)) {
      banderaErrorEmail = true;
      asignarFocoEmail("error");
      asignarErrorEmail(diccionario.errores.emailFormato);
    } else {
      asignarFocoEmail("");
      asignarErrorEmail("");
    }

    let banderaErrorPlacas = false;
    if (!placas && !esTradicional) {
      banderaErrorPlacas = true;
      asignarFocoPlacas("error");
      asignarErrorPlacas(diccionario.errores.campoRequerido);
    } else {
      asignarFocoPlacas("");
      asignarErrorPlacas("");
    }

    if (!color) {
      asignarFocoColor("error");
      asignarErrorColor(diccionario.errores.campoRequerido);
    } else {
      asignarFocoColor("");
      asignarErrorColor("");
    }

    if (
      telefono &&
      telefono.length === 10 &&
      color &&
      !banderaErrorEmail &&
      !banderaErrorPlacas
    ) {
      dispatch({
        type: "AGREGAR",
        valor: { telefono, email, color, placas },
        indice: "informacionContacto",
      });
      history.push("/ubicacion");
    }
  };

  if (
    valores.telefono === "" &&
    estadoApp.datosPoliza &&
    estadoApp.datosPoliza.telefonoAsegurado &&
    focoTelefono === ""
  ) {
    valores.telefono = estadoApp.datosPoliza.telefonoAsegurado.replace(
      /\D/g,
      ""
    );
  }

  if (
    valores.email === "" &&
    estadoApp.datosPoliza &&
    estadoApp.datosPoliza.correo &&
    focoEmail === "" &&
    focoTelefono === "" &&
    focoColor === "" &&
    focoPlacas === ""
  ) {
    valores.email = estadoApp.datosPoliza.correo;
  }
  valores.email = !valores.email.includes("@cambiaremail") ? valores.email : "";

  return (
    <EnvolvedorPantalla key={v4()} id="FormularioInformacionContacto">
      <Encabezado
        titulo={diccionario.encabezado}
        funcionRegresar={() => {
          valores.telefono = "";
          valores.email = "";
          history.push(paginaAnterior);
        }}
        alertaAmarilla={mostrarIconoAlerta}
      />
      <SeparadorBarraProgreso />
      <Pantalla>
        <BarraAlerta
          etiqueta={diccionario.mensajeAlerta}
          mostrarAlerta={mostrarBarraAlerta}
          manejarCierre={alternarBarraAlertaIconoAlerta}
          estilo="alerta"
          posicionAbsoluta
        />
        <BarraProgresoReporte
          progreso={barraProgreso}
          titulo={diccionario.barraProgresoTitulo}
          numeroElementos={noElementos}
        />
        <TituloPrincipalIzquierda id="titulo">
          {diccionario.titulo}
        </TituloPrincipalIzquierda>
        {/* <MensajePequeno id="mensajePequeno">
          {diccionario.mensajePequeno}
        </MensajePequeno> */}
        <SeparadorEspacio />
        <SeparadorEspacio />

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
          <MensajeError style={{ marginTop: "20px" }} id="errorTelefono">
            {errorTelefono}
          </MensajeError>
        )}
        <SeparadorEspacio />
        <CampoTexto
          id="campoEmail"
          etiqueta={diccionario.etiquetas.email}
          marcador={diccionario.marcadores.email}
          valor={valores.email.trim()}
          foco={focoEmail}
          enCambio={alCambiarEmail}
        />
        {errorEmail !== "" && (
          <MensajeError style={{ marginTop: "20px" }} id="errorEmail">
            {errorEmail}
          </MensajeError>
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
          <MensajeError style={{ marginTop: "20px" }} id="errorColor">
            {errorColor}
          </MensajeError>
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
          <MensajeError style={{ marginTop: "20px" }} id="errorPlacas">
            {errorPlacas}
          </MensajeError>
        )}
        <ContenedorBoton>
          <Boton
            etiqueta={diccionario.etiquetas.botonContinuar}
            tema="estandar"
            enClick={validarFormulario}
          />
        </ContenedorBoton>
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

export default PantallaFormularioInformacionContacto;
