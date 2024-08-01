/* eslint-disable */
import React, { useState, useRef } from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
  EnvolvedorAsistenciaLegal,
  AsistenciaLegalCampo,
  AsistenciaLegalValor,
  AsistenciaLegalValorLista,
  BotonDescargaAsistenciaLegal,
  ContenedorLink,
  EnlaceProcesoLegal,
  ContenedorBoton,
} from "./AsistenciaLegal.styled";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import Boton from "../../boton";

const diccionario = {
  numeroReporteLegal: "Número de reporte legal",
  tipoAsistencia: "Tipo de asistencia",
  situacionLegal: "Situación legal",
  abogado: "Abogado",
  telAbogado: "Teléfono del abogado",
  paseLegal: "Pase Legal",
  oficioLiberacion: "Oficio de liberación del auto",
  botonDescarga: "Descargar pase",
  botonLlamarAreaLegal: "Llamar al área legal",
  botonDescargaLegal: "Descargar pase legal",
  botonDescargaOficio: "Descargar oficio de liberacíon",
  textoLink: "Conoce el proceso legal",
  subTitulo1: "Te enlazamos con el servicio de un abogado.",
  subTitulo2: "Documento legal para brindarte el servicio de un abogado.",
  subTitulo3:
    "Recibes una copia física de este documento en la Fiscalía. Lo compartimos digitalmente como respaldo para tu conveniencia.",
};

const AsistenciaLegal = (props) => {
  const { datosAsistenciaLegal } = props;
  const history = useHistory();
  const btnRef = useRef();

  const tipoAsistencia = obtenerValorDeArregloDeStrings(
    datosAsistenciaLegal,
    "TipoAsistencia: "
  );
  const abogado = obtenerValorDeArregloDeStrings(
    datosAsistenciaLegal,
    "NombreAbogado: "
  );
  const telAbogado = obtenerValorDeArregloDeStrings(
    datosAsistenciaLegal,
    "TeléfonoAbogado: "
  );
  const archivo = obtenerValorDeArregloDeStrings(
    datosAsistenciaLegal,
    "Documento: "
  );
  const numeroReporteLegal = obtenerValorDeArregloDeStrings(
    datosAsistenciaLegal,
    "ReporteJuridico: "
  );
  const tipoAsistenciaArray = [
    {
      descripcion: "Daño vehículo asegurado",
      valor: obtenerValorDeArregloDeStrings(
        datosAsistenciaLegal,
        "DanoVehAse: "
      ),
    },
    {
      descripcion: "Daño a propiedad ajena",
      valor: obtenerValorDeArregloDeStrings(
        datosAsistenciaLegal,
        "DanoPropAjena: "
      ),
    },
    {
      descripcion: "Lesiones",
      valor: obtenerValorDeArregloDeStrings(datosAsistenciaLegal, "Lesiones: "),
    },
    {
      descripcion: "Homicidios",
      valor: obtenerValorDeArregloDeStrings(
        datosAsistenciaLegal,
        "Homicidio: "
      ),
    },
    {
      descripcion: "Robo",
      valor: obtenerValorDeArregloDeStrings(datosAsistenciaLegal, "Robo: "),
    },
    {
      descripcion: "Robo recuperado",
      valor: obtenerValorDeArregloDeStrings(
        datosAsistenciaLegal,
        "LibVehLoc: "
      ),
    },
  ];
  const situacionLegalArray = [
    {
      descripcion: "Vehículo: ",
      valor: obtenerValorDeArregloDeStrings(
        datosAsistenciaLegal,
        "UbicacionVehiculo: "
      ),
    },
  ];

  const descargarArchivo = async () => {
    try {
      const response = await fetch(archivo);

      if (!response.ok) {
        throw new Error("Error al descargar el archivo");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const enlaceDescarga = document.createElement("a");
      enlaceDescarga.target = "_blank";
      enlaceDescarga.rel = "noreferrer";
      enlaceDescarga.href = url;
      enlaceDescarga.download = "OficioLiberacion.pdf";
      document.body.appendChild(enlaceDescarga); // Añadir el enlace al DOM (no es necesario que sea visible)
      enlaceDescarga.click();
      document.body.removeChild(enlaceDescarga);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  let btnTema = "deshabilitado";
  const claseBotonEstandar = "boton-estandar";
  const claseBotonDeshabilitado = "boton-deshabilitado";

  const deshabilitarBoton = () => {
    const elementoBotonDOM = findDOMNode(btnRef.current);
    if (elementoBotonDOM) {
      if (elementoBotonDOM.classList.contains(claseBotonEstandar)) {
        elementoBotonDOM.classList.remove(claseBotonEstandar);
      }
      if (!elementoBotonDOM.classList.contains(claseBotonDeshabilitado)) {
        elementoBotonDOM.classList.add(claseBotonDeshabilitado);
      }
    }
  };

  const habilitarBoton = () => {
    const elementoBotonDOM = findDOMNode(btnRef.current);
    if (elementoBotonDOM) {
      if (elementoBotonDOM.classList.contains(claseBotonDeshabilitado)) {
        elementoBotonDOM.classList.remove(claseBotonDeshabilitado);
      }
      if (!elementoBotonDOM.classList.contains(claseBotonEstandar)) {
        elementoBotonDOM.classList.add(claseBotonEstandar);
      }
    }
  };

  if (archivo) {
    habilitarBoton();
    btnTema = "simple";
  } else {
    deshabilitarBoton();
    btnTema = "deshabilitado";
  }

  // Define la condición de filtro
  const condicionFiltro = (item) => item.valor !== "";

  console.log("filter", tipoAsistenciaArray.filter(condicionFiltro));

  // const [FvgBtnTema, asignarValorFvgBtnTema] = useState(
  //   estadoApp && estadoApp.FvgBtnTema !== undefined
  //     ? estadoApp.FvgBtnTema
  //     : "deshabilitado"
  // );

  return (
    <EnvolvedorAsistenciaLegal>
      <ContenedorLink>
        <EnlaceProcesoLegal
          id="enlaceProcesoLegal"
          onClick={() => {
            history.push("/conoce-procesos-legal");
          }}
        >
          {diccionario.textoLink}
        </EnlaceProcesoLegal>
      </ContenedorLink>
      <AsistenciaLegalCampo>
        {diccionario.numeroReporteLegal}
      </AsistenciaLegalCampo>
      <AsistenciaLegalValor>{numeroReporteLegal !== "" ? numeroReporteLegal : "Pendiente"}</AsistenciaLegalValor>
      <AsistenciaLegalCampo>{diccionario.tipoAsistencia}</AsistenciaLegalCampo>
      {tipoAsistenciaArray.filter(condicionFiltro) &&
        tipoAsistenciaArray.map((item) => (
          <>
            {item.valor === "true" ? (
              <AsistenciaLegalValorLista>
                {item.descripcion}
              </AsistenciaLegalValorLista>
            ) : null}
          </>
        ))}

      {tipoAsistenciaArray.filter(condicionFiltro) === null ||
        (tipoAsistenciaArray.filter(condicionFiltro).length === 0 && (
          <AsistenciaLegalValor>
            {tipoAsistencia !== "" ? tipoAsistencia : "Pendiente"}
          </AsistenciaLegalValor>
        ))}
      <AsistenciaLegalCampo style={{ marginTop: "20px" }}>
        {diccionario.situacionLegal}
      </AsistenciaLegalCampo>
      {situacionLegalArray.filter(condicionFiltro) &&
        situacionLegalArray.map((item) => (
          <>
            {item.valor ? (
              <AsistenciaLegalValorLista>
                {item.descripcion + item.valor}
              </AsistenciaLegalValorLista>
            ) : null}
          </>
        ))}
      {situacionLegalArray.filter(condicionFiltro) === null ||
        (situacionLegalArray.filter(condicionFiltro).length === 0 && (
          <AsistenciaLegalValor>Pendiente</AsistenciaLegalValor>
        ))}
      <AsistenciaLegalCampo style={{ marginTop: "20px" }}>
        {diccionario.abogado}
      </AsistenciaLegalCampo>
      <AsistenciaLegalValor>{abogado !== "" ? abogado : "Pendiente"}</AsistenciaLegalValor>
      {/* <AsistenciaLegalCampo>{diccionario.telAbogado}</AsistenciaLegalCampo>
      <AsistenciaLegalValor>{telAbogado}</AsistenciaLegalValor> */}
      <AsistenciaLegalCampo>{diccionario.subTitulo1}</AsistenciaLegalCampo>
      <ContenedorBoton>
        <Boton
          etiqueta={diccionario.botonLlamarAreaLegal}
          tema="estandar"
          enClick={() => {
            window.location.href = "tel:800 667 31 44";
          }}
        />
      </ContenedorBoton>
      {/* EL PASE DE ASISTENCIA LEGAL SE DECICIO QUITAR DEL COMPONENTE
      PERO POR MIENTRAS ESTA COMENTADA POR SI SE REGRESA
      <AsistenciaLegalValor>{diccionario.paseLegal}</AsistenciaLegalValor>
      <AsistenciaLegalCampo>{diccionario.subTitulo2}</AsistenciaLegalCampo>
      <ContenedorBoton>
        <Boton
          etiqueta={diccionario.botonDescargaLegal}
          tema="simple"
          enClick={() => {
            descargarArchivo();
          }}
        />
      </ContenedorBoton> */}
      <AsistenciaLegalValor>
        {diccionario.oficioLiberacion}
      </AsistenciaLegalValor>
      <AsistenciaLegalCampo>{diccionario.subTitulo3}</AsistenciaLegalCampo>
      <ContenedorBoton>
        <Boton
          etiqueta={diccionario.botonDescargaOficio}
          ref={btnRef}
          tema={btnTema}
          enClick={() => {
            if (archivo) {
              descargarArchivo();
            }
          }}
        />
      </ContenedorBoton>
      {/* {archivo && (
        <a
          target="_blank"
          rel="noreferrer"
          href={archivo}
          download="AsistenciaLegal.pdf"
        >
          <BotonDescargaAsistenciaLegal>
            {diccionario.botonDescarga}
          </BotonDescargaAsistenciaLegal>
        </a>
      )} */}
    </EnvolvedorAsistenciaLegal>
  );
};

AsistenciaLegal.defaultProps = {
  datosAsistenciaLegal: [
    "TipoAsistencia:  ",
    "NombreAbogado:  ",
    "TeléfonoAbogado:  ",
    "Folio:  ",
    "Extension:  ",
    "Documento:  ",
  ],
};

AsistenciaLegal.propTypes = {
  datosAsistenciaLegal: PropTypes.arrayOf(PropTypes.string),
};

export default AsistenciaLegal;
