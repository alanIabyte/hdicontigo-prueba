import React from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import {
  EnvolvedorBarraProgresoReporte,
  EncabezadoBarraProgreso,
  NumeroBarraProgreso,
  TituloBarraProgreso,
  BaseBarraProgreso,
  BarraProgreso,
} from "./BarraProgresoReporte.styled";

const BarraProgresoReporte = (props) => {
  const { progreso, titulo, numeroElementos, grua } = props;

  return (
    <EnvolvedorBarraProgresoReporte key={v4()}>
      <EncabezadoBarraProgreso>
        <NumeroBarraProgreso id="NumeroBarraProgreso">
          {progreso}/{numeroElementos}:
        </NumeroBarraProgreso>
        <TituloBarraProgreso id="TituloBarraProgreso" grua={grua}>
          {titulo}
        </TituloBarraProgreso>
      </EncabezadoBarraProgreso>
      <BaseBarraProgreso>
        <BarraProgreso progreso={progreso} noElementos={numeroElementos} />
      </BaseBarraProgreso>
    </EnvolvedorBarraProgresoReporte>
  );
};

BarraProgresoReporte.propTypes = {
  progreso: PropTypes.oneOf([1, 2, 3, 4]),
  titulo: PropTypes.string,
  numeroElementos: PropTypes.number,
  grua: PropTypes.bool,
};

BarraProgresoReporte.defaultProps = {
  progreso: 1,
  titulo: "",
  numeroElementos: 4,
  grua: false,
};

export default BarraProgresoReporte;
