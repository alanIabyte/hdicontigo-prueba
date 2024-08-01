/* eslint-disable */
import React, { useState, useEffect, useRef, createRef } from "react";
import { findDOMNode } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  SeparadorEncabezadoCuestionarioReporte,
  TituloCuestionarioReporte,
  MensajePequeno,
  CuerpoCuestionarioReporte,
  SeparadorCuestionarioReporte,
  ContenedorCampoTextoCuestionarioReporte,
  Check,
  ContenedorCheck,
  MensajeCheck,
} from "./PantallaCuestionarioReporte.styled";
import Encabezado from "../../encabezado";
import BarraProgresoReporte from "../../barra-progreso-reporte";
import SeleccionCuestionario from "../../seleccion-cuestionario";
import Boton from "../../boton";
import CampoTexto from "../../campo-texto";
import Constantes from "../../../recursos/constantes";

const valores = {
  nombre: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
};

const nombreCookie = Constantes.nombreDeCookie;

const PantallaCuestionarioReporte = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const estadoApp = useSelector((estado) => estado);
  const nombreUsuario = estadoApp.datosPoliza
    ? estadoApp.datosPoliza.nombreCompletoAsegurado
    : "";
  const btnRef = useRef();
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    // history.push("/");
    console.log("No hay cookie");
  }

  const [selectedOptions, setSelectedOptions] = useState(
    estadoApp && estadoApp.cuestionarioReporte !== undefined
      ? estadoApp.cuestionarioReporte.selectedOptions !== undefined
        ? estadoApp.cuestionarioReporte.selectedOptions
        : []
      : []
  );

  const [respuesta1, asignarValorRespuesta1] = useState(
    estadoApp && estadoApp.cuestionarioReporte !== undefined
      ? estadoApp.cuestionarioReporte.respuesta1
      : null
  );
  const [respuesta2, asignarValorRespuesta2] = useState(
    estadoApp && estadoApp.cuestionarioReporte !== undefined
      ? estadoApp.cuestionarioReporte.respuesta2
      : null
  );
  const [respuesta3, asignarValorRespuesta3] = useState(
    estadoApp && estadoApp.cuestionarioReporte !== undefined
      ? estadoApp.cuestionarioReporte.respuesta3
      : null
  );
  const [respuesta4, asignarValorRespuesta4] = useState(
    estadoApp && estadoApp.cuestionarioReporte !== undefined
      ? estadoApp.cuestionarioReporte.respuesta4
      : null
  );
  // const [respuesta5, asignarValorRespuesta5] = useState(
  //   estadoApp && estadoApp.cuestionarioReporte !== undefined
  //     ? estadoApp.cuestionarioReporte.respuesta5
  //     : null
  // );
  const [respuesta6, asignarValorRespuesta6] = useState(
    estadoApp && estadoApp.cuestionarioReporte !== undefined
      ? estadoApp.cuestionarioReporte.respuesta6
      : null
  );
  const [respuesta7, asignarValorRespuesta7] = useState(
    estadoApp && estadoApp.cuestionarioReporte !== undefined
      ? estadoApp.cuestionarioReporte.respuesta7
      : null
  );
  const [respuesta8, asignarValorRespuesta8] = useState(
    estadoApp && estadoApp.cuestionarioReporte !== undefined
      ? estadoApp.cuestionarioReporte.respuesta8
      : null
  );

  if (estadoApp && estadoApp.nombreConductor) {
    valores.nombre = estadoApp.nombreConductor;
    valores.apellidoPaterno = estadoApp.apellidoPaterno;
    valores.apellidoMaterno = estadoApp.apellidoMaterno;
  }

  const [mensajeError1, asignarValorMensajeError1] = useState(null);
  const [mensajeError2, asignarValorMensajeError2] = useState(null);
  const [mensajeError3, asignarValorMensajeError3] = useState(null);
  const [mensajeError4, asignarValorMensajeError4] = useState(null);
  const [mensajeError5, asignarValorMensajeError5] = useState(null);
  const [mensajeError6, asignarValorMensajeError6] = useState(null);
  const [mensajeError7, asignarValorMensajeError7] = useState(null);
  const [mensajeError8, asignarValorMensajeError8] = useState(null);
  const [focoNombre, asignarValorFocoNombre] = useState("");

  const diccionarioGrua = {
    tituloBarraProgreso: "Causas de la asistencia",
    encabezado: "Asistencia de grúa",
    mensajeAlerta: "Tu póliza presenta falta de pago. Te seguimos atendiendo.",
    titulo: "Reporte para servicio de grúa",
    mensajePequeno:
      "Te pediremos completar cierta información para asegurarnos de enviarte la grúa más adecuada a tus necesidades.",
    pregunta1: "Falla eléctrica / mecánica",
    pregunta2: "El auto no enciende",
    pregunta3: "Llanta sin aire y no cuento con refacción",
    pregunta4: "El auto pegó contra un bache, banqueta u otro objeto.",
    pregunta5: "Vehículo atascado",
    etiquetaBoton: "Siguiente",
    numeroElementos: 5,
  };

  const diccionarioChoque = {
    tituloBarraProgreso: "Datos del siniestro",
    encabezado: "Generando reporte",
    mensajeAlerta: "Tu póliza presenta falta de pago. Te seguimos atendiendo.",
    titulo: "Describe las características del siniestro",
    pregunta1: "¿Hay personas lesionadas?",
    pregunta2: "¿Hay otro vehículo involucrado u otros bienes afectados?",
    pregunta3: "¿Hay autoridades presentes?",
    pregunta4: "¿El vehículo está derramando líquido?",
    // pregunta5: "¿El siniestro sucedió en ciudad/zona urbana?",
    pregunta7: "¿En el tablero hay indicadores encendidos?",
    pregunta8: "¿La unidad puede circular por sus propios medios?",
    pregunta6: (
      <span>
        <b>{nombreUsuario}</b> ¿Eras el conductor al momento del siniestro?
      </span>
    ),
    etiquetaCampoTexto: "Nombre del conductor",
    etiquetaAPCampoTexto: "Primer apellido",
    etiquetaAMCampoTexto: "Segundo apellido",
    etiquetaBoton: "Continuar",
    numeroElementos: 4,
  };

  let diccionario = {};
  let btnTema = "deshabilitado";
  const claseBotonEstandar = "boton-estandar";
  const claseBotonDeshabilitado = "boton-deshabilitado";

  if (estadoApp && estadoApp.seatedClaim === "crash") {
    diccionario = diccionarioChoque;
  } else if (estadoApp && estadoApp.seatedClaim === "tow") {
    diccionario = diccionarioGrua;
  } else {
    diccionario = diccionarioChoque;
  }

  const alCambiarNombre = (evento) => {
    if (evento) {
      switch (evento.target.id) {
        case "campoNombreConductor-campoDeTexto":
          valores.nombre = evento.target.value;
          break;
        case "campoApellidoPaternoConductor-campoDeTexto":
          valores.apellidoPaterno = evento.target.value;
          break;
        case "campoApellidoMaternoConductor-campoDeTexto":
          valores.apellidoMaterno = evento.target.value;
          break;
        default:
          break;
      }
    }
  };

  const validacionRespuestas = () => {
    if (respuesta1 === null) {
      asignarValorMensajeError1(true);
    } else {
      asignarValorMensajeError1(false);
    }
    if (respuesta2 === null) {
      asignarValorMensajeError2(true);
    } else {
      asignarValorMensajeError2(false);
    }
    if (respuesta3 === null) {
      asignarValorMensajeError3(true);
    } else {
      asignarValorMensajeError3(false);
    }
    if (respuesta4 === null) {
      asignarValorMensajeError4(true);
    } else {
      asignarValorMensajeError4(false);
    }
    // if (respuesta5 === null) {
    //   asignarValorMensajeError5(true);
    // } else {
    //   asignarValorMensajeError5(false);
    // }
    if (respuesta6 === null) {
      asignarValorMensajeError6(true);
    } else {
      asignarValorMensajeError6(false);
    }
    if (respuesta7 === null) {
      asignarValorMensajeError7(true);
    } else {
      asignarValorMensajeError7(false);
    }
    if (respuesta8 === null) {
      asignarValorMensajeError8(true);
    } else {
      asignarValorMensajeError8(false);
    }

    if (
      !respuesta6 &&
      (!valores.nombre || !valores.apellidoPaterno || !valores.apellidoMaterno)
    ) {
      asignarValorFocoNombre("error");
    } else {
      asignarValorFocoNombre("");
    }

    if (estadoApp.seatedClaim === "tow") {
      let tipoFalla;
      switch (selectedOptions) {
        case "option1":
          tipoFalla = diccionarioGrua.pregunta1;
          break;
        case "option2":
          tipoFalla = diccionarioGrua.pregunta2;
          break;
        case "option3":
          tipoFalla = diccionarioGrua.pregunta3;
          break;
        case "option4":
          tipoFalla = diccionarioGrua.pregunta4;
          break;
      }
      dispatch({
        type: "AGREGAR",
        valor: tipoFalla,
        indice: "tipoFalla",
      });
      dispatch({
        type: "AGREGAR",
        valor: {
          selectedOptions,
        },
        indice: "cuestionarioReporte",
      });
      if (selectedOptions === "option5" || selectedOptions === "option4") {
        dispatch({
          type: "AGREGAR",
          indice: "seatedClaim",
          valor: "crash",
        });
        history.push("/cuestionario-reporte");
      } else {
        history.push("/informacion-complementaria-vehiculo-grua");
      }
    }

    if (estadoApp.seatedClaim === "crash") {
      if (
        respuesta1 !== null &&
        respuesta2 !== null &&
        respuesta3 !== null &&
        respuesta4 !== null &&
        // respuesta5 !== null &&
        respuesta7 !== null &&
        respuesta8 !== null &&
        respuesta6 !== null &&
        (respuesta6 ||
          (valores.nombre !== "" &&
            valores.apellidoPaterno !== "" &&
            valores.apellidoMaterno !== ""))
      ) {
        history.push("/informacion-complementaria");
        dispatch({
          type: "AGREGAR",
          valor: {
            respuesta1,
            respuesta2,
            respuesta3,
            respuesta4,
            // respuesta5,
            respuesta6,
            respuesta7,
            respuesta8,
          },
          indice: "cuestionarioReporte",
        });

        if (valores.nombre !== "") {
          dispatch({
            type: "AGREGAR",
            valor: valores.nombre,
            indice: "nombreConductor",
          });
        }
        if (valores.apellidoPaterno !== "") {
          dispatch({
            type: "AGREGAR",
            valor: valores.apellidoPaterno,
            indice: "apellidoPaterno",
          });
        }
        if (valores.apellidoMaterno !== "") {
          dispatch({
            type: "AGREGAR",
            valor: valores.apellidoMaterno,
            indice: "apellidoMaterno",
          });
        }
      }
    }
  };

  const deshabilitarBoton = () => {
    const elementoBotonDOM = findDOMNode(btnRef.current);
    if (elementoBotonDOM.classList.contains(claseBotonEstandar)) {
      elementoBotonDOM.classList.remove(claseBotonEstandar);
    }
    if (!elementoBotonDOM.classList.contains(claseBotonDeshabilitado)) {
      elementoBotonDOM.classList.add(claseBotonDeshabilitado);
    }
  };

  const habilitarBoton = () => {
    const elementoBotonDOM = findDOMNode(btnRef.current);
    if (elementoBotonDOM.classList.contains(claseBotonDeshabilitado)) {
      elementoBotonDOM.classList.remove(claseBotonDeshabilitado);
    }
    if (!elementoBotonDOM.classList.contains(claseBotonEstandar)) {
      elementoBotonDOM.classList.add(claseBotonEstandar);
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedOptions(name);
    } else {
      setSelectedOptions([]);
    }
  };

  useEffect(() => {
    if (!selectedOptions.length) {
      deshabilitarBoton();
      btnTema = "deshabilitado";
    } else {
      habilitarBoton();
      btnTema = "estandar";
    }
  }, [selectedOptions]);

  useEffect(() => {
    if (
      respuesta1 !== null ||
      respuesta2 !== null ||
      respuesta3 !== null ||
      respuesta4 !== null ||
      // respuesta5 !== null ||
      respuesta6 !== null ||
      respuesta7 !== null ||
      respuesta8 !== null
    ) {
      habilitarBoton();
      btnTema = "estandar";
    }
  }, [
    respuesta1,
    respuesta2,
    respuesta3,
    respuesta4,
    // respuesta5,
    respuesta6,
    respuesta7,
    respuesta8,
  ]);

  return (
    <EnvolvedorPantalla key={v4()}>
      <Encabezado
        titulo={diccionario.encabezado}
        funcionRegresar={() => {
          history.push("/ingreso-poliza");
        }}
      />

      <SeparadorEncabezadoCuestionarioReporte />
      <Pantalla>
        <BarraProgresoReporte
          grua={estadoApp.seatedClaim === "tow"}
          titulo={diccionario.tituloBarraProgreso}
          progreso={1}
          numeroElementos={diccionario.numeroElementos}
        />
        <TituloCuestionarioReporte id="titulo">
          {diccionario.titulo}
        </TituloCuestionarioReporte>
        {estadoApp.seatedClaim === "tow" && (
          <MensajePequeno id="mensajePequeno">
            {diccionario.mensajePequeno}
          </MensajePequeno>
        )}
        <CuerpoCuestionarioReporte>
          {estadoApp.seatedClaim === "tow" && (
            <>
              <ContenedorCheck>
                <MensajeCheck>{diccionario.pregunta1}</MensajeCheck>
                <Check
                  name="option1"
                  checked={selectedOptions.includes("option1")}
                  onChange={handleCheckboxChange}
                />
              </ContenedorCheck>
              <ContenedorCheck>
                <MensajeCheck id="mensajeCheck">
                  {diccionario.pregunta2}
                </MensajeCheck>
                <Check
                  name="option2"
                  checked={selectedOptions.includes("option2")}
                  onChange={handleCheckboxChange}
                />
              </ContenedorCheck>
              <ContenedorCheck>
                <MensajeCheck>{diccionario.pregunta3}</MensajeCheck>
                <Check
                  name="option3"
                  checked={selectedOptions.includes("option3")}
                  onChange={handleCheckboxChange}
                />
              </ContenedorCheck>
              <ContenedorCheck>
                <MensajeCheck>{diccionario.pregunta4}</MensajeCheck>
                <Check
                  name="option4"
                  checked={selectedOptions.includes("option4")}
                  onChange={handleCheckboxChange}
                />
              </ContenedorCheck>
              <ContenedorCheck>
                <MensajeCheck>{diccionario.pregunta5}</MensajeCheck>
                <Check
                  name="option5"
                  checked={selectedOptions.includes("option5")}
                  onChange={handleCheckboxChange}
                />
              </ContenedorCheck>
            </>
          )}
          {estadoApp.seatedClaim === "crash" && (
            <>
              <SeleccionCuestionario
                pregunta={diccionario.pregunta1}
                respuesta={respuesta1}
                cambiarEstado={asignarValorRespuesta1}
                mostrarMensajeCampoRequerido={mensajeError1}
              />
              <SeleccionCuestionario
                pregunta={diccionario.pregunta2}
                respuesta={respuesta2}
                cambiarEstado={asignarValorRespuesta2}
                mostrarMensajeCampoRequerido={mensajeError2}
              />
              <SeleccionCuestionario
                pregunta={diccionario.pregunta3}
                respuesta={respuesta3}
                cambiarEstado={asignarValorRespuesta3}
                mostrarMensajeCampoRequerido={mensajeError3}
              />
              <SeleccionCuestionario
                pregunta={diccionario.pregunta4}
                respuesta={respuesta4}
                cambiarEstado={asignarValorRespuesta4}
                mostrarMensajeCampoRequerido={mensajeError4}
              />
              <SeleccionCuestionario
                pregunta={diccionario.pregunta7}
                respuesta={respuesta7}
                cambiarEstado={asignarValorRespuesta7}
                mostrarMensajeCampoRequerido={mensajeError7}
              />
              <SeleccionCuestionario
                pregunta={diccionario.pregunta8}
                respuesta={respuesta8}
                cambiarEstado={asignarValorRespuesta8}
                mostrarMensajeCampoRequerido={mensajeError8}
              />
              {/* <SeleccionCuestionario
                pregunta={diccionario.pregunta5}
                respuesta={respuesta5}
                cambiarEstado={asignarValorRespuesta5}
                mostrarMensajeCampoRequerido={mensajeError5}
              /> */}
              <SeparadorCuestionarioReporte />

              <SeleccionCuestionario
                pregunta={diccionario.pregunta6}
                respuesta={respuesta6}
                cambiarEstado={asignarValorRespuesta6}
                mostrarMensajeCampoRequerido={mensajeError6}
              />
              <ContenedorCampoTextoCuestionarioReporte esUsuario={respuesta6}>
                <CampoTexto
                  etiqueta={diccionario.etiquetaCampoTexto}
                  enCambio={alCambiarNombre}
                  foco={focoNombre}
                  valor={valores.nombre}
                  id="campoNombreConductor"
                />

                <div style={{ marginTop: "20px" }}>
                  <CampoTexto
                    etiqueta={diccionario.etiquetaAPCampoTexto}
                    enCambio={alCambiarNombre}
                    foco={focoNombre}
                    valor={valores.apellidoPaterno}
                    id="campoApellidoPaternoConductor"
                  />
                </div>
                <div style={{ marginTop: "25px" }}>
                  <CampoTexto
                    etiqueta={diccionario.etiquetaAMCampoTexto}
                    enCambio={alCambiarNombre}
                    foco={focoNombre}
                    valor={valores.apellidoMaterno}
                    id="campoApellidoMaternoConductor"
                  />
                </div>
              </ContenedorCampoTextoCuestionarioReporte>
            </>
          )}
        </CuerpoCuestionarioReporte>
        <Boton
          id="botonContinuar"
          ref={btnRef}
          tema={btnTema}
          etiqueta={diccionario.etiquetaBoton}
          enClick={validacionRespuestas}
        />
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

export default PantallaCuestionarioReporte;
