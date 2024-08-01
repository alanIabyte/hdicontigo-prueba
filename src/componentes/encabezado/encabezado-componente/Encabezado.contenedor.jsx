import React from "react";
import PropTypes from "prop-types";
import Encabezado from "./Encabezado";

class EncabezadoContenedor extends React.Component {
  render() {
    const {
      titulo,
      tituloHtml,
      alertaAmarilla,
      funcionRegresar,
      mostrarBotonRegresar,
      funcionCerrar,
      mostrarBotonCerrar,
      alturaEncabezadoAuto,
    } = this.props;
    return (
      <Encabezado
        titulo={titulo}
        tituloHtml={tituloHtml}
        funcionRegresar={funcionRegresar}
        alertaAmarilla={alertaAmarilla}
        mostrarBotonRegresar={mostrarBotonRegresar}
        funcionCerrar={funcionCerrar}
        mostrarBotonCerrar={mostrarBotonCerrar}
        alturaEncabezadoAuto={alturaEncabezadoAuto}
        estiloBotonRegresar={null}
      />
    );
  }
}

EncabezadoContenedor.defaultProps = {
  titulo: "",
  tituloHtml: "",
  alertaAmarilla: false,
  mostrarBotonRegresar: true,
  funcionRegresar() {},
  mostrarBotonCerrar: false,
  funcionCerrar() {},
  alturaEncabezadoAuto: false,
};

EncabezadoContenedor.propTypes = {
  titulo: PropTypes.string,
  tituloHtml: PropTypes.string,
  alertaAmarilla: PropTypes.bool,
  funcionRegresar: PropTypes.func,
  mostrarBotonRegresar: PropTypes.bool,
  mostrarBotonCerrar: PropTypes.bool,
  funcionCerrar: PropTypes.func,
  alturaEncabezadoAuto: PropTypes.bool,
};

export default EncabezadoContenedor;
