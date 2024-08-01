import styled from "styled-components";

const EnvolvedorReporteAjuste = styled.div`
  width: 100%;
  display: grid;
`;

const SeparadorReporteAjuste = styled.div`
  background-color: var(--fondo-gris);
  height: 1px;
  width: 100%;
  margin-bottom: 15px;
`;

const SeparadorSeccionesOpcionales = styled.div`
  background-color: var(--fondo-gris);
  height: 2px;
  width: 95%;
  margin: 15px auto;
`;

const Secciones = styled.div`
  display: ${(props) => (props.desplegado ? "block" : "none")};
`;

const ContenedorSecciones = styled.div`
  border: ${(props) =>
    props.desplegado ? "solid 1px var(--color-marca-normal)" : "none"};
  border-top: none;
  border-radius: 6px;
  margin-left: 2px;
  margin-top: -51px;
  padding-top: 50px;
  margin-bottom: 15px;
`;

const BotonDesplegarSecciones = styled.button`
  background-color: ${(props) =>
    props.desplegado
      ? "var(--fondo-blanco-normal) !important"
      : "var(--fondo-gris-claro)"};
  border-radius: 3px;
  border-bottom: none;
  border-left: none;
  border-right: none;
  border: ${(props) =>
    props.desplegado ? "1px solid var(--color-marca-normal)" : ""};
  border-bottom: ${(props) =>
    props.desplegado
      ? "solid 1px var(--fondo-gris-claro)"
      : "solid 1px solid var(color-marca-normal)"};
  color: var(--color-negro-puro);
  font-family: var(--fuente-proxima-regular);
  font-size: 18px;
  height: 52px;
  padding-left: 20px;
  padding-right: 5px;
  position: -webkit-sticky;
  position: sticky;
  text-align: initial;
  top: 170px;
  width: calc(100% - 2px);
  /* z-index: 2; */
  margin-left: 2px;
  &:focus {
    outline: 0;
  }
`;

const ContenedorElementosMenuDesplegable = styled.div`
  display: flex;
  justify-content: space-between;
`;

export {
  EnvolvedorReporteAjuste,
  SeparadorReporteAjuste,
  SeparadorSeccionesOpcionales,
  Secciones,
  ContenedorSecciones,
  BotonDesplegarSecciones,
  ContenedorElementosMenuDesplegable,
};
