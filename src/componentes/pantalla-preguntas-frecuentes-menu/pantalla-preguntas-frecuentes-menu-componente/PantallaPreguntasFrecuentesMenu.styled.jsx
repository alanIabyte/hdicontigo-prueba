import styled from "styled-components";
import {
  Titulo3,
  Subtitulo3,
} from "../../componentes-styled-compartidos/Textos";

const TituloPrincipal = styled(Titulo3)`
  height: 54px;
  margin-top: 31px;
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
`;

const MensajePequeno = styled(Subtitulo3)`
  width: 100%;
  height: 40px;
  margin: 0px 0px 30px;
  text-align: left;
  color: var(--color-gris-medio);
`;

const ContenedorFlexBoton = styled.div`
  display: flex;
  flex-direction: row;
`;
const ContenedorPregunta = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  width: calc(100% - 45px);
  line-height: 20px;
  height: 25px;
  padding: 12px;
  padding-right: 0px;
  border-radius: 4px;
  border: solid 2px;
  padding-top: 18px;
  background-color: var(--color-blanco-normal);
  border-color: var(--color-marca-normal);
`;

const FlechaVerde = styled.img`
  width: 25px;
  height: 25px;
  margin-top: -9px;
`;

const ContendidoPregunta = styled(Subtitulo3)``;

// -----------------------ELEMENTOS PARA MENU DESPLEGABLE---------------------------------------------------------------------
const EnvolvedorCategoria = styled.div`
  width: 100%;
  display: grid;
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

const SeparadorReporteAjuste = styled.div`
  background-color: var(--fondo-gris);
  height: 1px;
  width: 100%;
  margin-bottom: 15px;
`;

const Secciones = styled.div`
  display: ${(props) => (props.desplegado ? "block" : "none")};
`;

// ---------------------------------------------------------------------------------------------------------------------------

export {
  TituloPrincipal,
  MensajePequeno,
  ContenedorFlexBoton,
  ContenedorPregunta,
  ContendidoPregunta,
  FlechaVerde,
  // --------------------------------------
  EnvolvedorCategoria,
  BotonDesplegarSecciones,
  ContenedorElementosMenuDesplegable,
  ContenedorSecciones,
  SeparadorReporteAjuste,
  Secciones,
  // --------------------------------------
};
