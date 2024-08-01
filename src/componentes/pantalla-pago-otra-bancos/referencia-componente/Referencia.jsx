import React from "react";
import PropTypes from "prop-types";
import {
  ContenedorReferencia,
  Banco,
  Propiedad,
  Valor,
  Renglon,
} from "./Referencia.styled";

const Referencia = ({ referencia, tipo }) => {
  const PROPIEDAD_TIPO = {
    CLABE: {
      prop1: "CLABE",
      val1: referencia.clabe,
      prop2: "Referencia",
      val2: referencia.numeroReferencia,
    },
    CONVENIO: {
      prop1: "Convenio",
      val1: referencia.convenio,
      prop2: "Referencia",
      val2: referencia.numeroReferencia,
    },
  };

  return (
    <ContenedorReferencia>
      <Banco>{referencia.banco}</Banco>

      <Renglon>
        <Propiedad>{PROPIEDAD_TIPO[tipo].prop1}</Propiedad>
        <Valor>{PROPIEDAD_TIPO[tipo].val1}</Valor>
      </Renglon>

      <Renglon>
        <Propiedad>{PROPIEDAD_TIPO[tipo].prop2}</Propiedad>
        <Valor>{PROPIEDAD_TIPO[tipo].val2}</Valor>
      </Renglon>
    </ContenedorReferencia>
  );
};

Referencia.propTypes = {
  referencia: PropTypes.instanceOf({}),
  tipo: PropTypes.string,
};

Referencia.defaultProps = {
  referencia: {},
  tipo: "CLABE",
};

export default Referencia;
