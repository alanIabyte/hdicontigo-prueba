/* eslint-disable import/prefer-default-export */
import styled from "styled-components";
import {
  Parrafo,
  Subtitulo2,
} from "../../componentes-styled-compartidos/Textos";

const EnvolvedorLista = styled.div`
  display: ${(props) => (props.mostrar ? "block" : "none")};
  width: 100%;
`;
const ContenedorLista = styled.div`
  background-color: var(--color-blanco-normal);
  border: 1px solid var(--fondo-gris-claro);
  border-radius: 6px;
  display: grid;
  // grid-template-columns: auto 1fr;
  grid-column-gap: 20px;
  grid-template-rows: auto;
  padding: 10px 20px;
  margin-bottom: 16px;
`;
const BotonEliminar = styled(Parrafo)`
  color: var(--color-gris-medio);
  font-size: 18px;
  margin-left: auto;
  margin-top: -15px;
  transition: all 0.3s ease;
  cursor: pointer;
  &:active {
    color: var(--color-negro-normal);
  }
`;

const BotonBase = styled.button`
  font-family: var(--fuente-montserrat-bold);
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: 0.2px;
  border-radius: 11px !important;
  border-color: black;
  cursor: pointer;
  display: block;
  min-width: 90px;
  padding: 10px 0px;
  text-align: center;
  width: 100px;
  height: 30px;
  min-height: 38px !important;
`;

const EnvolvedorDatos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContenedorBotonFactura = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const NombreFactura = styled.div`
  font-family: var(--fuente-proxima-bold);
  white-space: pre-wrap;
`;

// const ListaDatos = styled.ul`
//   li {
//     list-style-image: url("/src/componentes/solicitud/recursos/check_oscuro.svg");
//   }
// `;

const EnvolvedorIcono = styled.div`
  display: flex;
  align-items: center;
`;

// const BotonEditar = styled(BotonReportarSiniestro)`
//   background-color: #006729;
//   cursor: pointer;
//   margin-left: auto;
// `;

const ContenedorAcordeon = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  transition: all 0.3s ease;
  margin-bottom: 20px;
`;
const EncabezadoAcordeon = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 14px 16px;
  box-sizing: border-box;
  cursor: pointer;
`;

const TituloAcordeon = styled(Subtitulo2)`
  margin-left: 12px;
`;

const ManejadorAcordeon = styled.div`
  margin-left: auto;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  ${".arrow-icono"} {
    transform: ${(props) => (props.abierto ? "rotate(180deg)" : "none")};
  }
`;

const ContenidoAcordeon = styled.div`
  padding: 15px 24px;
  border-top: 1px solid var(--color-gris-normal);
`;
const Espacio = styled.div`
  height: ${(props) => (props.tamano ? props.tamano : "20px")};
`;

export {
  EnvolvedorLista,
  ContenedorLista,
  BotonEliminar,
  EnvolvedorDatos,
  NombreFactura,
  EnvolvedorIcono,
  ContenedorAcordeon,
  EncabezadoAcordeon,
  TituloAcordeon,
  ManejadorAcordeon,
  ContenidoAcordeon,
  ContenedorBotonFactura,
  Espacio,
  BotonBase,
};
