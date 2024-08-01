/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  Contenedor,
  Etiqueta,
  Campo,
  IconoTarjeta,
  ContenedorOpciones,
  Opcion,
  BusquedaOpciones,
} from "./Select.styled";
import PropTypes from "prop-types";
import { ReactComponent as FlechaAbajo } from "../../../recursos/iconos/ico_abajo.svg";

const SelectWitchSearch = ({
  etiqueta,
  enCambio,
  foco,
  valor,
  index,
  tipo,
  opciones,
  inputholder,
}) => {
  const [valorLocal, setValorLocal] = useState(valor);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);

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

  const onSearch = (evento) => {
    if (evento) {
      let search = evento.target.value.toUpperCase();
      const filter = opciones?.filter((opcion) =>
        opcion.nombre.toUpperCase().includes(search)
      );
      setFilteredOptions(filter);
    }
  };

  useEffect(() => {
    if (opciones) {
      setFilteredOptions(opciones);
    }
  }, [opciones]);

  return (
    <Contenedor>
      <Etiqueta foco={foco}>{etiqueta}</Etiqueta>
      <Campo onClick={abrirMenu} foco={foco}>
        {" "}
        {obtenerValorConIcono()}{" "}
      </Campo>
      {mostrarOpciones ? (
        <>
          <ContenedorOpciones index={index} tipo={tipo}>
            <BusquedaOpciones
              placeholder="Escribe aquí para buscar"
              onChange={onSearch}
            />
            {filteredOptions?.map((opcion) => (
              <Opcion onClick={() => establecerOpcion(opcion)} key={opcion.id}>
                {opcion.icono ? <IconoTarjeta src={opcion.icono} /> : null}
                {opcion.nombre}
              </Opcion>
            ))}
          </ContenedorOpciones>
        </>
      ) : null}
      <FlechaAbajo className="icono" />
    </Contenedor>
  );
};

SelectWitchSearch.defaultProps = {
  etiqueta: "",
  inputholder: "Seleccionar",
  tipo: "Normal",
  enCambio: null,
  foco: false,
  valor: "",
  index: 90,
  opciones: [],
};

SelectWitchSearch.propTypes = {
  etiqueta: PropTypes.string,
  inputholder: PropTypes.string,
  tipo: PropTypes.oneOf(["Normal", "Compacto", "Mediano"]),
  valor: PropTypes.string,
  enCambio: PropTypes.func,
  foco: PropTypes.oneOf(["error", "enfocado", ""]),
  index: PropTypes.number,
  opciones: PropTypes.array,
};

export default SelectWitchSearch;
