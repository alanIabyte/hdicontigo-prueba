/* eslint-disable react/prop-types */
/* eslint-disable no-duplicate-case */
import React, { useState } from "react";
import PropTypes from "prop-types";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";

//  Iconos
import { ReactComponent as IconoInfoPoliza } from "../../../recursos/iconos/hdi-c/detalle/autos/Info.svg";
import { ReactComponent as IconoInfoAuto } from "../../../recursos/iconos/hdi-c/detalle/autos/informacionVehiculo.svg";
import { ReactComponent as IconoInfoBien } from "../../../recursos/iconos/ico_info_bien_asegurado.svg";
import { ReactComponent as IconoPaquetes } from "../../../recursos/iconos/hdi-c/detalle/autos/paquetes.svg";
import { ReactComponent as IconoCoberturas } from "../../../recursos/iconos/hdi-c/detalle/autos/coberturas.svg";
import { ReactComponent as IconoCondiciones } from "../../../recursos/iconos/ico_condiciones_especiales.svg";
import { ReactComponent as IconoInfoPagos } from "../../../recursos/iconos/hdi-c/detalle/autos/infoPagos.svg";
import { ReactComponent as IconoAsegurado } from "../../../recursos/iconos/hdi-c/detalle/gmm/2Asegurado(s).svg";
// import { ReactComponent as IconoInformacion } from "../../../recursos/iconos/ico_informacion.svg";
import { ReactComponent as IconoPlan } from "../../../recursos/iconos/hdi-c/detalle/gmm/3Producto.svg";
import { ReactComponent as IconoDescargaPoliza } from "../../../recursos/iconos/hdi-c/detalle/autos/descargar.svg";

import {
  Contenedor,
  Encabezado,
  EnvolvedorIcono,
  TituloAcordeon,
  Manejador,
  Contenido,
} from "./AcordeonDetallePoliza.styled";

const AcordeonPantallaPoliza = (props) => {
  const { titulo, children, show, mantenerAbierto } = props;
  const [abierto, asignarValorAbierto] = useState(mantenerAbierto);

  const obtenerIcono = () => {
    const tamanoIcono = 40;
    switch (titulo) {
      case "Información de la póliza":
        return <IconoInfoPoliza width={tamanoIcono} />;
      case "Información del vehículo":
        return <IconoInfoAuto width={tamanoIcono} />;
      case "Info. del bien asegurado":
        return <IconoInfoBien width={tamanoIcono} />;
      case "Paquete":
        return <IconoPaquetes width={tamanoIcono} />;
      case "Coberturas":
        return <IconoCoberturas width={tamanoIcono} />;
      case "Coberturas por sección":
        return <IconoCoberturas width={tamanoIcono} />;
      case "Condiciones especiales":
        return <IconoCondiciones width={tamanoIcono} />;
      case "Información de pagos":
        return <IconoInfoPagos width={tamanoIcono} />;
      case "Asegurado (s)":
        return <IconoAsegurado width={tamanoIcono} />;
      case "Producto":
        return <IconoPlan width={tamanoIcono} />;
      case "Coberturas":
        return <IconoPaquetes width={tamanoIcono} />;
      case "Descarga tu póliza":
        return <IconoDescargaPoliza width={tamanoIcono} />;
      default:
        return <IconoInfoPoliza />;
    }
  };

  return (
    <Contenedor abierto={abierto} show={show} style={{ width: "100%" }}>
      <Encabezado onClick={() => asignarValorAbierto(!abierto)}>
        <EnvolvedorIcono>{obtenerIcono()}</EnvolvedorIcono>
        <TituloAcordeon>{titulo}</TituloAcordeon>
        <Manejador abierto={abierto}>
          <KeyboardArrowDown className="arrow-icono" width={20} />
        </Manejador>
      </Encabezado>
      {abierto ? <Contenido>{children}</Contenido> : null}
    </Contenedor>
  );
};

AcordeonPantallaPoliza.defaultProps = {
  titulo: "Información",
  children: <br />,
  show: true,
  mantenerAbierto: false,
};

//  enClickEnFoto: () => {},
//  enClickEnFoto: PropTypes.func,

AcordeonPantallaPoliza.propTypes = {
  titulo: PropTypes.string,
  children: PropTypes.node,
  show: PropTypes.bool,
  mantenerAbierto: PropTypes.bool,
};

export default AcordeonPantallaPoliza;
