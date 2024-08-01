/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as IconoInfoPoliza } from "../../../../recursos/iconos/hdi-c/detalle/autos/Info.svg";
import { ReactComponent as IconoOjo } from "../../../../recursos/iconos/ico_ojo.svg";
import {
  Recibo,
  ContenedorIcono,
  ContenedorInformacion,
  NumeroPoliza,
  BotonVer,
  EnvolvedorRecibo,
  Vigencia,
} from "./PolizaRecibo.styled";

const diccionario = {
  noPoliza: "No tienes pólizas de ",
};

const traductorTipo = {
  DAN: () => "daños",
  AUTR: () => "autos",
};

const PolizaRecibo = ({
  mostrar,
  numeroPoliza,
  datos,
  evento,
  valida,
  tipo,
}) => {
  return (
    <EnvolvedorRecibo mostrar={mostrar} valida={valida} onClick={() => evento(datos, tipo)}>
      <Recibo>
        <ContenedorIcono>
          <IconoInfoPoliza width={67} height={67} />
        </ContenedorIcono>
        <ContenedorInformacion>
          {valida ? (
            <>
              <NumeroPoliza>Póliza {numeroPoliza}</NumeroPoliza>
              <Vigencia>
                Vigencia {datos.fechaInicio} a {datos.fechaTermino}
              </Vigencia>
              <BotonVer onClick={() => evento(datos, tipo)}>
                <IconoOjo width={12} className="icono" /> Ver recibos
              </BotonVer>
            </>
          ) : (
            <NumeroPoliza>
              {diccionario.noPoliza}
              {traductorTipo[tipo]()}
            </NumeroPoliza>
          )}
        </ContenedorInformacion>
      </Recibo>
    </EnvolvedorRecibo>
  );
};

PolizaRecibo.defaultProps = {
  mostrar: true,
  valida: true,
  numeroPoliza: "XXX-XX-XXX",
  datos: {},
  evento: () => {},
  tipo: "AUTR",
};

PolizaRecibo.propTypes = {
  mostrar: PropTypes.bool,
  valida: PropTypes.bool,
  numeroPoliza: PropTypes.string,
  datos: PropTypes.oneOfType({}),
  evento: PropTypes.func,
  tipo: PropTypes.string,
};

export default PolizaRecibo;
