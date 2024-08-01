import React, { useState } from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import {
  CajaListaDesplegable,
  Contenedor,
  ContenedorListaDesplegable,
  Etiqueta,
  Flecha,
  FlechaListaDesplegable,
  Opcion,
  OpcionListaDesplegable,
  SeleccionListaDesplegable,
} from "./ListaDesplegable.styled";

const ListaDesplegableComponente = (props) => {
  const { alSeleccionar, config, etiqueta } = props;
  const indiceSeleccionado = config.findIndex(
    (elemento) => elemento.seleccionado
  );
  const [opcionSeleccionada, asignarValorOpcionSeleccionada] = useState(
    indiceSeleccionado > 0 ? indiceSeleccionado : 0
  );
  const [despliegaOpciones, asignarValorDespliegaOpciones] = useState(false);

  const elegirOpcion = (opcion, indice) => {
    asignarValorOpcionSeleccionada(indice);
    asignarValorDespliegaOpciones(false);
    alSeleccionar(opcion);
  };

  const cambiarPosicion = () => {
    asignarValorDespliegaOpciones(!despliegaOpciones);
  };

  return (
    <Contenedor>
      <Etiqueta>{etiqueta}</Etiqueta>
      <CajaListaDesplegable onClick={cambiarPosicion}>
        <ContenedorListaDesplegable>
          <SeleccionListaDesplegable>
            {config[opcionSeleccionada].etiqueta}
          </SeleccionListaDesplegable>
          <FlechaListaDesplegable>
            <Flecha despliegaOpciones={despliegaOpciones} />
          </FlechaListaDesplegable>
        </ContenedorListaDesplegable>
      </CajaListaDesplegable>
      <OpcionListaDesplegable despliegaOpciones={despliegaOpciones}>
        {config.map((opcion, indice) => (
          <Opcion
            key={v4()}
            onClick={() => elegirOpcion(opcion, indice)}
            onKeyDown={() => elegirOpcion(opcion, indice)}
            seleccionado={opcionSeleccionada === indice}
            role="button"
            tabIndex={indice}
          >
            {opcion.etiqueta}
          </Opcion>
        ))}
      </OpcionListaDesplegable>
    </Contenedor>
  );
};

ListaDesplegableComponente.propTypes = {
  alSeleccionar: PropTypes.func,
  config: PropTypes.arrayOf(
    PropTypes.shape({
      valor: PropTypes.string,
      etiqueta: PropTypes.string,
      seleccionado: PropTypes.bool,
    })
  ),
  etiqueta: PropTypes.string,
};

ListaDesplegableComponente.defaultProps = {
  alSeleccionar: () => {},
  config: {},
  etiqueta: "",
};

export default ListaDesplegableComponente;
