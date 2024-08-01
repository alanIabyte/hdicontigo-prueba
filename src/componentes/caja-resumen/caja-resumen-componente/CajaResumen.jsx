/* eslint-disable no-nested-ternary */
import React, { memo } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
  EnvolvedorPoliza,
  EnvolvedorIdentificacion,
  EnvolvedorFotografia,
  EnvolvedorDatosIdentificacion,
  NombrePoliza,
  PiePoliza,
  BotonVerDetalle,
  DatoPoliza,
  TextoVerde,
} from "./CajaResumen.styled";
import { ReactComponent as IconoVer } from "../../../recursos/iconos/ico_ojo.svg";
import { ReactComponent as IconoPoliza } from "../../../recursos/iconos/contigo/ico_mis_pol.svg";
import { ReactComponent as IconoAuto } from "../../../recursos/iconos/contigo/ico_mis_sin.svg";

const CajaResumen = (props) => {
  const {
    nombre,
    numeroAUTR,
    numeroDAN,
    numeroGMM,
    direccion,
    textoDetalle,
    icono,
  } = props;

  const history = useHistory();

  const verDetalle = () => {
    history.push(direccion);
  };

  return (
    <EnvolvedorPoliza onClick={verDetalle}>
      <EnvolvedorIdentificacion>
        <EnvolvedorFotografia>
          {icono === "Poliza" ? (
            <IconoPoliza width={100} className="icono" />
          ) : (
            <IconoAuto width={100} className="icono" />
          )}
        </EnvolvedorFotografia>

        {icono === "Poliza" ? (
          <EnvolvedorDatosIdentificacion>
            <NombrePoliza>{nombre}</NombrePoliza>
            <DatoPoliza>
              <TextoVerde>{numeroAUTR}</TextoVerde>HDI Autos
            </DatoPoliza>
            <DatoPoliza>
              <TextoVerde>{numeroDAN}</TextoVerde>HDI Daños
            </DatoPoliza>
            <DatoPoliza>
              <TextoVerde>{numeroGMM}</TextoVerde>Gastos Médicos Mayores
            </DatoPoliza>
          </EnvolvedorDatosIdentificacion>
        ) : icono === "Auto" ? (
          <EnvolvedorDatosIdentificacion compacto>
            <NombrePoliza>{nombre}</NombrePoliza>
            <DatoPoliza>
              <TextoVerde>{numeroAUTR}</TextoVerde>HDI autos
            </DatoPoliza>
          </EnvolvedorDatosIdentificacion>
        ) : (
          <EnvolvedorDatosIdentificacion compacto>
            <NombrePoliza>{nombre}</NombrePoliza>
            <DatoPoliza>
              <TextoVerde>{numeroGMM}</TextoVerde>HDI Gastos Médicos
            </DatoPoliza>
          </EnvolvedorDatosIdentificacion>
        )}
      </EnvolvedorIdentificacion>

      <PiePoliza>
        <BotonVerDetalle style={{ color: "var(--color-marca-normal)" }}>
          <IconoVer
            className="ico"
            width={22}
            style={{ color: "var(--color-negro-puro)" }}
          />
          {textoDetalle}
        </BotonVerDetalle>
      </PiePoliza>
    </EnvolvedorPoliza>
  );
};

CajaResumen.defaultProps = {
  numeroAUTR: 0,
  numeroDAN: 0,
  numeroGMM: 0,
  nombre: "Mis Pólizas",
  direccion: "/mis-polizas",
  textoDetalle: "Ver detalle",
  icono: "Poliza",
};

CajaResumen.propTypes = {
  numeroAUTR: PropTypes.number,
  numeroDAN: PropTypes.number,
  numeroGMM: PropTypes.number,
  nombre: PropTypes.string,
  direccion: PropTypes.string,
  textoDetalle: PropTypes.string,
  icono: PropTypes.string,
};

export default memo(
  CajaResumen,
  (prevProps, nextProps) => prevProps.nombre === nextProps.nombre
);
