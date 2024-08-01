import styled, { keyframes } from "styled-components";
import {
  Subtitulo1,
  Subtitulo3,
  Leyenda,
} from "../../componentes-styled-compartidos/Textos";

const animacionCargando = keyframes`
  0% { 
    background-image: 
      linear-gradient(to right, var(--fondo-verde-oscuro), var(--fondo-verde-profundo));
  }
  50% { 
    background-image: 
    linear-gradient(to right, var(--fondo-verde-oscuro), var(--fondo-verde-profundo) 50%,var(--fondo-verde-oscuro));
  }  
  100% { 
    background-image: 
    linear-gradient(to right, var(--fondo-verde-profundo), var(--fondo-verde-oscuro));
  }
`;

const EnvolvedorEncabezadoReporte = styled.div`
  align-items: flex-end;
  background-color: var(--color-blanco-normal);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  min-height: 105px;
  padding: 23px;
  padding-bottom: 15px;
  width: 100%;
  z-index: 2;
`;

const EnvolvedorEncabezadoRoboAjustador = styled.div`
  background-color: var(--color-blanco-normal);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  margin: 0 auto;
  padding: 23px;
  padding-bottom: 15px;
  width: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const TituloContenedor = styled(Subtitulo1)`
  color: var(--color-verde-normal);
  position: absolute;
  text-align: center;
  top: 40px;
  width: 100%;
`;

const SeparadorEncabezadoReporte = styled.div`
  background-color: var(--fondo-verde-oscuro);
  height: 1px;
  position: absolute;
  top: 80px;
  width: 80%;
`;

const EnvolvedorPendienteEncabezadoReporte = styled.div`
  align-items: center;
  column-gap: 15px;
  display: grid;
  grid-template-columns: 40px 90%;
  grid-template-rows: 20px 20px;
  justify-content: center;
`;

const FotoPendienteEncabezadoReporte = styled.div`
  animation: ${animacionCargando} 1s infinite;
  background-image: linear-gradient(
    to right,
    var(--fondo-verde-oscuro),
    var(--fondo-verde-profundo)
  );
  border-radius: 20px;
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  height: 40px;
  width: 40px;
`;

const BarraEsperaEncabezadoReporte = styled.div`
  animation: ${animacionCargando} 0.5s infinite;
  background-image: linear-gradient(
    to right,
    var(--fondo-verde-oscuro),
    var(--fondo-verde-profundo)
  );
  border-radius: 10px;
  height: 16px;
  width: 90%;
`;

const LeyendaEncabezadoReporte = styled(Leyenda)`
  color: var(--color-gris-medio);
  opacity: 50%;
`;

const EnvolvedorAjustadorEncabezadoReporte = styled.div`
  column-gap: 15px;
  display: grid;
  grid-template-columns: 40px 90%;
  grid-template-rows: 20px 20px 29px;
  margin-top: 70px;
  row-gap: 9px;
  width: 100%;
`;

const FotoEncabezadoReporte = styled.img`
  border-radius: 20px;
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  height: 40px;
  object-fit: cover;
  width: 40px;
`;

const AjustadorEncabezadoReporte = styled(Subtitulo3)``;

const BotonUbicacionEncabezadoReporte = styled.button`
  background-color: var(--color-marca-normal);
  border-radius: 15px;
  border: none;
  color: var(--texto-blanco);
  font-family: var(--fuente-montserrat-regular);
  font-size: 12px;
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  padding: 5px 13px 7px 14px;
  width: 110px;
`;

const EncabezadoReporteContenedor = styled.div`
  display: contents;
  & > div:first-of-type {
    display: contents;
  }
`;

const BotonIcono = styled.button`
  align-items: center;
  background-color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  display: flex;
  height: 24px;
  justify-content: center;
  left: 0;
  margin-bottom: 19px;
  margin-left: 16px;
  position: absolute;
  width: 40px;
  z-index: 2;
  top: 38px;
  svg {
    color: var(--color-marca-normal);
    transform: scale(1.2);
  }
`;

export {
  EncabezadoReporteContenedor,
  EnvolvedorEncabezadoReporte,
  TituloContenedor,
  SeparadorEncabezadoReporte,
  EnvolvedorPendienteEncabezadoReporte,
  FotoPendienteEncabezadoReporte,
  BarraEsperaEncabezadoReporte,
  LeyendaEncabezadoReporte,
  EnvolvedorAjustadorEncabezadoReporte,
  AjustadorEncabezadoReporte,
  FotoEncabezadoReporte,
  BotonUbicacionEncabezadoReporte,
  BotonIcono,
  EnvolvedorEncabezadoRoboAjustador,
};
