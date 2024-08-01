/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  Contenedor,
  Etiqueta,
  Campo,
  IconoTarjeta,
  ContenedorOpciones,
  Opcion,
} from "./Select.styled";
import PropTypes from "prop-types";
import { ReactComponent as FlechaAbajo } from "../../../recursos/iconos/ico_abajo.svg";

const Select = ({
  etiqueta,
  enCambio,
  foco,
  valor,
  index,
  tipo,
  opciones,
  inputholder,
  id
}) => {
  const [valorLocal, setValorLocal] = useState(valor);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  useEffect(() => {
    if (valorLocal == "" && opciones.length > 0) {
      const recibido = opciones.find((el) => el.id == valor);
      establecerOpcion(recibido);
    }
  }, [valor, opciones]);

  const obtenerValorConIcono = () => {
    let opcion = opciones.find((op) => op.nombre === valorLocal);

    if (opcion !== undefined) {
      return (
        <>
          {opcion.icono ? <IconoTarjeta src={opcion.icono} /> : null}
          {opcion.nombre}
        </>
      );
    } else {
      return <>{inputholder}</>;
    }
  };

  const abrirMenu = () => {
    setMostrarOpciones(true);
  };

  const establecerOpcion = (opcion) => {
    setValorLocal(opcion?.nombre);
    setMostrarOpciones(false);
    // Enviar a parent
    enCambio(opcion?.nombre);
  };

  return (
    <Contenedor id={id}>
      <Etiqueta foco={foco}>{etiqueta}</Etiqueta>
      <Campo onClick={abrirMenu} foco={foco}>
        {" "}
        {obtenerValorConIcono()}{" "}
      </Campo>
      {mostrarOpciones ? (
        <ContenedorOpciones index={index} tipo={tipo}>
          {opciones.map((opcion) => (
            <Opcion onClick={() => establecerOpcion(opcion)} key={opcion.id}>
              {opcion.icono ? <IconoTarjeta src={opcion.icono} /> : null}
              {opcion.nombre}
            </Opcion>
          ))}
        </ContenedorOpciones>
      ) : null}
      <FlechaAbajo className="icono" />
    </Contenedor>
  );
};

Select.defaultProps = {
  etiqueta: "",
  inputholder: "Seleccionar",
  tipo: "Normal",
  enCambio: null,
  foco: false,
  valor: "",
  index: 90,
  opciones: [],
};

Select.propTypes = {
  etiqueta: PropTypes.string,
  inputholder: PropTypes.string,
  tipo: PropTypes.oneOf(["Normal", "Compacto", "Mediano"]),
  valor: PropTypes.string,
  enCambio: PropTypes.func,
  foco: PropTypes.oneOf(["error", "enfocado", ""]),
  index: PropTypes.number,
  opciones: PropTypes.array,
};

export default Select;
