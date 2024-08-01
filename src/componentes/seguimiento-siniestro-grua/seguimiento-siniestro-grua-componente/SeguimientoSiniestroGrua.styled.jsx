import styled from "styled-components";
import { Leyenda } from "../../componentes-styled-compartidos/Textos";

const Envolvedor = styled.div``;

const Campo = styled(Leyenda)`
  font-family: var(--fuente-proxima-bold);
  color: var(--color-gris-medio);
`;
const ContenedorBoton = styled.div`
  display: flex;
  align-items: left;
  width: 100%;
  height: 100%;
  margin-top: 25px;
  margin-bottom: 25px;
`;

const ContenedorBotonCancelar = styled.div`
  display: flex;
  align-items: left;
  width: 100%;
  height: 100%;
  margin-top: 25px;
  margin-bottom: 25px;
`;

const BotonPequeno = styled.button`
  font-family: var(--fuente-montserrat-bold);
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: 0.2px;
  color: var(--color-negro-normal);
`;

const BotonDescarga = styled(BotonPequeno)`
  width: "100%";
  height: "100%";
  padding: 5px 12px;
  border-radius: 6px !important;
  border: solid 1px var(--color-negro-normal);
  background-color: var(--fondo-blanco-normal);
  cursor: pointer;
`;

export {
  Envolvedor,
  Campo,
  ContenedorBoton,
  BotonDescarga,
  ContenedorBotonCancelar,
};
