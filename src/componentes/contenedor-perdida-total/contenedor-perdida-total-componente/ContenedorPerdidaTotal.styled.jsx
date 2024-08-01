import styled from "styled-components";

const EnvolvedorReparacion = styled.div`
  width: 100%;
  display: grid;
`;

const SeparadorReparacion = styled.div`
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
// TODO: TBC si funciona
// const BotonDesplegarSecciones = styled.button`
//   background-color: ${(props) =>
//     props.desplegado || props.tema === "blanco"
//       ? "var(--color-blanco-normal)"
//       : "var(--color-azul-normal)"};
//   border-radius: 6px;
//   border-bottom-left-radius: ${(props) => (props.desplegado ? "0" : "6px")};
//   border-bottom-right-radius: ${(props) => (props.desplegado ? "0" : "6px")};
//   border-top: ${(props) =>
//     props.tema === "blanco" && !props.desplegado
//       ? "none"
//       : "solid 1px var(--color-azul-normal)"};
//   box-shadow: ${(props) =>
//     props.desplegado || props.tema === "blanco"
//       ? "0 3px 6px 0 rgb(0 0 0 / 16%);"
//       : "none"};
//   border-bottom: none;
//   border-left: none;
//   border-right: none;
//   color: ${(props) =>
//     props.desplegado || props.tema === "blanco"
//       ? "var(--color-negro-normal)"
//       : "var(--texto-blanco)"};
//   font-family: var(--fuente-proxima-regular);
//   font-size: 18px;
//   height: 52px;
//   padding-left: 20px;
//   padding-right: 5px;
//   position: -webkit-sticky;
//   position: sticky;
//   text-align: initial;
//   top: 170px;
//   width: calc(100% - 2px);
//   z-index: 2;
//   margin-left: 2px;
//   &:focus {
//     outline: 0;
//   }
// `;

const ContenedorElementosMenuDesplegable = styled.div`
  display: flex;
  justify-content: space-between;
`;

export {
  EnvolvedorReparacion,
  SeparadorReparacion,
  SeparadorSeccionesOpcionales,
  Secciones,
  ContenedorSecciones,
  BotonDesplegarSecciones,
  ContenedorElementosMenuDesplegable,
};
