/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
import React from "react";
import PropTypes from "prop-types";
import { CampoTextoStyled, CampoAreadeTextoStyled } from "./CampoTexto.styled";
import "./estilos.scss";

class CampoTextoElemento extends React.Component {
  constructor(props) {
    super(props);
    const { valor } = this.props;
    this.state = {
      valorTexto: valor,
      focoInput: "",
    };
  }

  alCambiarValorSoloNumeros = (evento) => {
    const valor = evento.target.value;
    const dato = evento.nativeEvent.data;

    if (dato && !Number(dato) && dato !== "") {
      if (dato === "0") {
        this.setState({ valorTexto: valor });
        return evento;
      }
      if (!valor) {
        evento.target.value = "";
      }
      return null;
    }
    this.setState({ valorTexto: valor.trim() });
    return evento;
  };

  alCambiarValor = (evento, expresionRegular) => {
    if (expresionRegular) {
      if (expresionRegular.test(evento.target.value)) {
        this.setState({ valorTexto: evento.target.value });
        return evento;
      }
      return null;
    }
    this.setState({ valorTexto: evento.target.value });
    return evento;
  };

  cambioDeEnfoque = (idHermano) => {
    const hermano = document.getElementById(idHermano);
    hermano.focus();
    hermano.select();
  };

  alIntroducir = (evento, esNumerico, numeroDeCaracteres) => {
    if (esNumerico) {
      this.alCambiarValorSoloNumeros(evento);
    }

    if (evento && evento.target && evento.target.value) {
      if (numeroDeCaracteres > 0 && evento.target.value > numeroDeCaracteres) {
        evento.target.value = evento.target.value.slice(0, numeroDeCaracteres);
      }
    }
  };

  alCambiar = (
    evento,
    moverEnfoque,
    ultimoElemento,
    id,
    indice,
    esNumerico,
    expresionRegular,
    enCambio
  ) => {
    let eventoResultado = null;
    if (moverEnfoque && evento && evento.target && evento.target.value) {
      if (!ultimoElemento) {
        const idHermano = `${id}-campoDeTexto-${indice + 1}`;
        this.cambioDeEnfoque(idHermano);
      } else {
        evento.target.blur();
      }
    }
    if (esNumerico) {
      eventoResultado = this.alCambiarValorSoloNumeros(evento);
    } else {
      eventoResultado = this.alCambiarValor(evento, expresionRegular);
    }
    if (enCambio) {
      enCambio(eventoResultado);
    }
  };

  alPresionarTecla = (evento, esNumerico) => {
    if (esNumerico && (evento.charCode < 48 || evento.charCode > 57)) {
      evento.preventDefault();
      return null;
    }
    return evento.charCode;
  };

  render() {
    const {
      autoenfoque,
      clase,
      editable,
      enCambio,
      enClick,
      enDesenfoque,
      enFoco,
      esAreaDeTexto,
      esContrasena,
      esNumerico,
      moverEnfoque,
      ultimoElemento,
      expresionRegular,
      foco,
      id,
      indice,
      marcador,
      numeroDeCaracteres,
      numeroDeRenglones,
      disabledProp,
      domiciliacion,
      estilo,
      referencia,
    } = this.props;
    const { valorTexto, focoInput } = this.state;
    const focoFinal = foco || focoInput;
    const CampoTexto = esAreaDeTexto
      ? CampoAreadeTextoStyled
      : CampoTextoStyled;
    let tipoCampo = "text";
    if (esContrasena) {
      tipoCampo = "password";
    } else if (esNumerico) {
      tipoCampo = "number";
    }
    const idParaCampo =
      indice !== null ? `${id}-campoDeTexto-${indice}` : `${id}-campoDeTexto`;
    return (
      <CampoTexto
        style={estilo}
        domiciliacion={domiciliacion}
        id={idParaCampo}
        type={tipoCampo}
        disabled={disabledProp}
        placeholder={marcador}
        onClick={enClick}
        value={valorTexto}
        autoFocus={autoenfoque}
        onInput={(evento) => {
          this.alIntroducir(evento, esNumerico, numeroDeCaracteres);
        }}
        onChange={(evento) => {
          this.alCambiar(
            evento,
            moverEnfoque,
            ultimoElemento,
            id,
            indice,
            esNumerico,
            expresionRegular,
            enCambio
          );
        }}
        maxLength={numeroDeCaracteres > 0 ? numeroDeCaracteres : ""}
        foco={focoFinal}
        onFocus={enFoco}
        onKeyPress={(evento) => {
          this.alPresionarTecla(evento, esNumerico);
        }}
        onBlur={enDesenfoque}
        className={clase}
        data-indice={indice}
        rows={esAreaDeTexto ? numeroDeRenglones : null}
        readOnly={!editable}
        ref={referencia}
      />
    );
  }
}

CampoTextoElemento.propTypes = {
  autoenfoque: PropTypes.bool,
  clase: PropTypes.string,
  editable: PropTypes.bool,
  enCambio: PropTypes.func,
  enClick: PropTypes.func,
  enDesenfoque: PropTypes.func,
  enFoco: PropTypes.func,
  esAreaDeTexto: PropTypes.bool,
  esContrasena: PropTypes.bool,
  esNumerico: PropTypes.bool,
  moverEnfoque: PropTypes.bool,
  ultimoElemento: PropTypes.bool,
  expresionRegular: PropTypes.instanceOf(RegExp),
  foco: PropTypes.oneOf(["error", "enfocado", ""]),
  id: PropTypes.string,
  indice: PropTypes.number,
  marcador: PropTypes.string,
  numeroDeCaracteres: PropTypes.number,
  numeroDeRenglones: PropTypes.number,
  valor: PropTypes.string,
  disabledProp: PropTypes.bool,
  domiciliacion: PropTypes.bool,
  referencia: React.createRef(),
};

CampoTextoElemento.defaultProps = {
  autoenfoque: false,
  clase: "",
  editable: true,
  enCambio: null,
  enClick: null,
  enDesenfoque: null,
  enFoco: null,
  esAreaDeTexto: false,
  esContrasena: false,
  esNumerico: false,
  moverEnfoque: false,
  ultimoElemento: false,
  expresionRegular: /(?:)/,
  foco: "",
  id: "CampoDeTextoEnvolvedor",
  indice: null,
  marcador: "",
  numeroDeCaracteres: 0,
  numeroDeRenglones: 2,
  valor: "",
  disabledProp: false,
  domiciliacion: false,
  referencia: null,
};

export default CampoTextoElemento;
