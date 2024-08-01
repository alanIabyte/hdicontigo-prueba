import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  BotonLesionado,
  ContenedorLesionado,
  EnvolvedorLesionados,
  NombreLesionado,
} from "./Lesionados.styled";
import obtenerValorDeArregloDeStrings from "../../utilidades-compartidas/obtenerValorDeArregloDeStrings";
import useAccionesLog from "../../../utils/useAccionesLog";

const Lesionados = ({ lesionados }) => {
  const diccionario = {
    botonLesionado: "Descargar Pase",
  };

  const estadoApp = useSelector((state) => state);

  const { runDownloadLog } = useAccionesLog(
    Object.keys(estadoApp.informacionContacto).includes("telefono")
      ? estadoApp.informacionContacto.telefono
      : ""
  );

  const lesionadosContenido = lesionados.map((lesionado) => ({
    nombre: obtenerValorDeArregloDeStrings(lesionado, "NombreLesionado: "),
    folio: obtenerValorDeArregloDeStrings(lesionado, "Folio: "),
    archivo: obtenerValorDeArregloDeStrings(lesionado, "Documento: "),
  }));

  const runAction = () => runDownloadLog(7);

  return (
    <EnvolvedorLesionados>
      {lesionadosContenido.map((lesionado) => (
        <ContenedorLesionado key={lesionado.folio}>
          <NombreLesionado>{lesionado.nombre}</NombreLesionado>
          <a
            target="_blank"
            rel="noreferrer"
            href={lesionado.archivo}
            download={`Pase_medico_${lesionado.folio}_${lesionado.nombre}.pdf`}
          >
            <BotonLesionado onClick={runAction}>
              {diccionario.botonLesionado}
            </BotonLesionado>
          </a>
        </ContenedorLesionado>
      ))}
    </EnvolvedorLesionados>
  );
};

Lesionados.propTypes = {
  lesionados: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

Lesionados.defaultProps = {
  lesionados: [],
};

export default Lesionados;
