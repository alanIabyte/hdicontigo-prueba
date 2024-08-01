import React from "react";
import PropTypes from "prop-types";
import {
  ReporteSiniestroValor,
  EnvolvedorReporteSiniestroDigital,
  BotonAjusteDigital,
  BotonCabina,
} from "./ContenedorAjusteDigital.styled";

const ReporteSiniestroDigitalCont = ({
  contenido,
  textoBoton,
  telCabina,
  redirecAjustadorDigital,
}) => {
  if (telCabina !== "" && redirecAjustadorDigital !== "") {
    return (
      <EnvolvedorReporteSiniestroDigital>
        <ReporteSiniestroValor>{contenido}</ReporteSiniestroValor>
        <div>
          <BotonAjusteDigital
            onClick={(e) => {
              e.preventDefault();
              window.open(redirecAjustadorDigital);
            }}
          >
            {textoBoton}
          </BotonAjusteDigital>
        </div>
        <div>
          <BotonCabina
            onClick={() => {
              window.open("tel:*434");
            }}
          >
            Llamar a HDI *434
          </BotonCabina>
        </div>
      </EnvolvedorReporteSiniestroDigital>
    );
  }
  if (telCabina !== "") {
    return (
      <EnvolvedorReporteSiniestroDigital>
        <ReporteSiniestroValor>{contenido}</ReporteSiniestroValor>
        <BotonCabina
          onClick={() => {
            window.location.href = telCabina;
          }}
        >
          {textoBoton}
        </BotonCabina>
      </EnvolvedorReporteSiniestroDigital>
    );
  }
  return (
    <EnvolvedorReporteSiniestroDigital>
      <ReporteSiniestroValor>{contenido}</ReporteSiniestroValor>
      <BotonAjusteDigital
        onClick={() => {
          window.open(redirecAjustadorDigital);
        }}
      >
        {textoBoton}
      </BotonAjusteDigital>
    </EnvolvedorReporteSiniestroDigital>
  );
};

ReporteSiniestroDigitalCont.defaultProps = {
  contenido: "",
  textoBoton: "",
  telCabina: "",
  redirecAjustadorDigital: "",
};

ReporteSiniestroDigitalCont.propTypes = {
  contenido: PropTypes.string,
  textoBoton: PropTypes.string,
  telCabina: PropTypes.string,
  redirecAjustadorDigital: PropTypes.string,
};

export default ReporteSiniestroDigitalCont;
