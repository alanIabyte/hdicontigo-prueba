import styled from "styled-components";
import { BotonMediano } from "../../componentes-styled-compartidos/Textos";

const EnvolvedorBoton = styled(BotonMediano)`
  border-radius: ${(props) =>
    props.circular === "simple-circular" ? "" : "11px !important"};
  border: ${(props) => (props.deshabilitado ? "none" : "")};
  background-color: ${(props) =>
    props.deshabilitado ? "var(--color-gris-claro)" : ""};
  cursor: pointer;
  display: block;
  min-width: 150px;
  padding: 10px 0px;
  text-align: center;
  width: ${(props) => (props.pequeno ? "200px" : "100%")};
  height: 40px;
  min-height: ${(props) => (props.botonDelgado ? "38px !important" : "0")};
`;

const Icono = styled.img`
  width: 27px;
  height: 27px;
  margin-top: -4px;
  margin-right: 10px;
  vertical-align: middle;
`;

export { EnvolvedorBoton, Icono };
