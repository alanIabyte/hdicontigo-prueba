import styled from "styled-components";
import {
  Subtitulo2,
  Titulo3,
  Subtitulo3Negritas,
} from "../../componentes-styled-compartidos/Textos";

const AcordeonContenedorFacturas = styled.div`
  display: ${(props) => (props.show ? "contents" : "none")};
  border-radius: 6px;
  transition: all 0.3s ease;
  margin-bottom: 20px;
`;
const Encabezado = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 14px 16px;
  box-sizing: border-box;
  cursor: pointer;
`;

const TituloAcordeon = styled(Subtitulo2)`
  font-weight: bolder;
  margin-left: 12px;
`;

const Manejador = styled.div`
  margin-left: auto;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  ${".arrow-icono"} {
    transform: ${(props) => (props.abierto ? "rotate(180deg)" : "none")};
  }
`;
const Contenido = styled.div`
  padding: 15px 24px;
  border-top: 1px solid var(--color-gris-normal);
`;

const SeparadorLinea = styled.div`
  width: 100%;
  border: solid 0.1px var(--fondo-gris);
  margin-top: 5px;
  margin-bottom: 15px;
`;

const Titulo2 = styled(Titulo3)`
  width: 100%;
  margin: 31px 0px 10px;
  text-align: left;
`;

const Valor = styled(Subtitulo3Negritas)`
  font-size: ${(props) => (props.grande ? "20px" : "14px")};
  color: var(--color-negro-puro);
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
`;

const Pantalla = styled.div`
  margin: 0 auto;
  // display: flex;
  // align-items: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  border-radius: 16px;
  background-color: var(--color-blanco-normal);
  margin-top: -16px;
  padding: 24px;
  /* height: calc(100% - 115px); */
`;

export {
  AcordeonContenedorFacturas,
  Encabezado,
  TituloAcordeon,
  Manejador,
  Contenido,
  SeparadorLinea,
  Titulo2,
  Valor,
  Pantalla,
};
