import styled from "styled-components";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  Titulo3,
  Subtitulo3,
  Leyenda,
  Subtitulo3Negritas,
  TituloSeccion,
} from "../../componentes-styled-compartidos/Textos";

const EnvolvedorPantallaPolizas = styled(EnvolvedorPantalla)`
  height: calc(100% - 56px);
`;

const PantallaFondoBlanco = styled(Pantalla)`
  background-color: var(--color-blanco-normal);
  border-radius: 0px;
  height: calc(100% - 118px);
  overflow-y: auto;
  overflow-x: hidden;
`;

const MensajePequeno = styled(Subtitulo3)`
  width: 100%;
  height: 40px;
  margin: 10px 0px 33px;
  text-align: left;
  color: var(--color-gris-medio);
`;

const Contenedor = styled.div`
  width: 100%;
  height: calc(100%);
  padding-bottom: 50px;
  box-sizing: border-box;
  & > div:last-of-type {
    margin-bottom: 100px;
  }
`;

const TituloMisPolizas = styled(Titulo3)`
  margin-top: 40px;
`;

const ContenedorFormasPago = styled.div`
  margin-bottom: 10px;
  width: 100%;
`;

const FormaPago = styled.div`
  width: 100%;
  border: 1px solid var(--color-gris-claro);
  border-radius: 6px;
  padding: 16px 24px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 28px;
  grid-template-rows: 1fr 1fr;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  background-color: var(--color-blanco-normal);
  cursor: pointer;
  user-select: none;
  width: 100%;
  &:hover {
    box-shadow: 0 2px 20px 0 rgba(49, 49, 49, 0.09);
  }
  &:active {
    transform: scale(0.96);
  }
`;

const ContenedorIcono = styled.div`
  grid-column: 1;
  grid-row: 1/3;
  display: flex;
  justify-content: center;
  align-items: center;
  ${".icono"} {
    width: 44px;
  }
`;

const DescripcionFormaPago = styled(Leyenda)`
  font-size: 14px;
  font-weight: 500;
  color: var(--color-gris-medio);
  line-height: 1.5;
  grid-row: 2;
  grid-column: 2/3;
  display: flex;
`;

const NombreFormaPago = styled(Subtitulo3Negritas)`
  font-size: 16px;
  color: var(--color-negro-normal);
  display: flex;
  flex-direction: row;
  align-items: center;
  grid-column: 2/3;
  grid-row: 1;
  display: flex;
  align-items: flex-start;
`;

const IconosFormaPago = styled.div`
  grid-row: 2;
  grid-column: 2/3;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: ${(props) => (props.medio ? "22px" : "16px")};
  margin-right: 18px;
`;

const ContenedorRef = styled.div`
  margin-top: 40px;
`;

const Subtitulo = styled(TituloSeccion)`
  border-bottom: 1px solid var(--fondo-gris);
  padding-bottom: 5px;
`;

const Parrafo = styled(Leyenda)`
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.2;
`;

const Espacio = styled.div`
  height: 20px;
`;

export {
  EnvolvedorPantallaPolizas,
  PantallaFondoBlanco,
  Contenedor,
  TituloMisPolizas,
  ContenedorFormasPago,
  ContenedorIcono,
  MensajePequeno,
  NombreFormaPago,
  FormaPago,
  DescripcionFormaPago,
  IconosFormaPago,
  Logo,
  ContenedorRef,
  Subtitulo,
  Parrafo,
  Espacio,
};
