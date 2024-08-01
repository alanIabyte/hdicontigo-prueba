import React from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import ErrorRoundedIcon from "@material-ui/icons/ErrorRounded";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import {
  EnvolvedorBarraAlerta,
  BarraAlertaContenedor,
  BarraAlertaIcono,
  BarraAlertaTexto,
  BarraAlertaCierre,
} from "./BarraAlerta.styled";

const BarraAlerta = (props) => {
  const {
    clase,
    etiqueta,
    estilo,
    mostrarAlerta,
    manejarCierre,
    sinEncabezado,
    fijo,
    posicionAbsoluta,
    encabezadoAlto,
  } = props;
  let icono;
  switch (estilo) {
    case "error":
      icono = <ErrorRoundedIcon />;
      break;
    case "notificacion":
      icono = <InfoRoundedIcon />;
      break;
    case "exitoso":
      icono = <CheckCircleRoundedIcon />;
      break;
    default:
      icono = <WarningRoundedIcon />;
      break;
  }

  const despliegaTextoCuerpo = () => ({ __html: etiqueta });

  return (
    <EnvolvedorBarraAlerta
      key={v4()}
      mostrar={mostrarAlerta}
      estilo={estilo}
      className={clase}
      sinEncabezado={sinEncabezado}
      fijo={fijo}
      posicionAbsoluta={posicionAbsoluta}
      encabezadoAlto={encabezadoAlto}
    >
      <BarraAlertaContenedor>
        <BarraAlertaIcono>{icono}</BarraAlertaIcono>
        <BarraAlertaTexto dangerouslySetInnerHTML={despliegaTextoCuerpo()} />
        <BarraAlertaCierre
          type="submit"
          onClick={() => {
            manejarCierre(false);
          }}
        >
          <CloseRoundedIcon />
        </BarraAlertaCierre>
      </BarraAlertaContenedor>
    </EnvolvedorBarraAlerta>
  );
};

BarraAlerta.propTypes = {
  clase: PropTypes.string,
  estilo: PropTypes.oneOf(["alerta", "error", "notificacion", "exitoso"]),
  etiqueta: PropTypes.string,
  manejarCierre: PropTypes.func,
  mostrarAlerta: PropTypes.bool,
  sinEncabezado: PropTypes.bool,
  fijo: PropTypes.bool,
  posicionAbsoluta: PropTypes.bool,
  encabezadoAlto: PropTypes.bool,
};

BarraAlerta.defaultProps = {
  clase: "",
  estilo: "error",
  etiqueta: "",
  manejarCierre() {},
  mostrarAlerta: false,
  sinEncabezado: false,
  fijo: false,
  posicionAbsoluta: false,
  encabezadoAlto: false,
};

export default BarraAlerta;
