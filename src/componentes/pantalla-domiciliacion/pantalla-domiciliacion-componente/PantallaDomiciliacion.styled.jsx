import styled from "styled-components";
import { EnvolvedorCampoTexto } from "../../campo-texto/campo-texto-componente/CampoTexto.styled";
import {
  EnvolvedorPantalla as EP,
  Pantalla as P,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import { Titulo3, Leyenda } from "../../componentes-styled-compartidos/Textos";

const EnvolvedorPantalla = styled(EP)`
  height: 100%;
`;

const Pantalla = styled(P)`
  background-color: var(--color-blanco-normal);
  border-radius: 0px;
  height: calc(100% - 196px);
  overflow: scroll;
  overflow-x: hidden;
`;

const PieDePagina = styled.div`
  background-color: var(--fondo-blanco-normal);
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
`;

const Contenedor = styled.div`
  width: 100%;
  min-height: calc(100% + 0px);
`;

const TituloPantalla = styled(Titulo3)`
  margin-bottom: 15px;
  margin-top: 40px;
`;

const ContenedorBoton = styled.div`
  margin: 20px 24px;
`;

const Mayusculas = styled.div`
  position: relative;
  width: 100%;
  ${"input"} {
    text-transform: uppercase !important;
  }
`;

const Formulario = styled.div`
  margin-top: 38px;
  margin-bottom: 78px;
  ${EnvolvedorCampoTexto} {
    margin-top: 22px;
  }
`;

const MensajeError = styled(Leyenda)`
  font-size: 12px;
  text-align: left;
  width: 100%;
  margin-top: 5px;
  color: var(--color-error-normal);
`;

const Etiqueta = styled(Leyenda)`
  width: 100%;
  margin: 0 0 6px 4px;
  text-align: left;
  color: ${(props) => {
    const { foco } = props;
    if (foco === "enfocado") {
      return "var(--color-marca-normal)";
    }
    if (foco === "error") {
      return "var(--color-error-normal)";
    }
    return "var(--color-gris-medio)";
  }};
`;

const ContenedorFechaTarjeta = styled.div`
  margin-top: 22px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  ${Etiqueta} {
    width: 100%;
  }
`;

const ContenedorMitad = styled.div`
  position: relative;
  width: 10%;
  min-width: 80px;
  margin-top: -10px;
  margin-right: 10px;
`;

const IFrameContainer = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const SelectsContainer = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const Informative = styled.div`
  display: flex;
  flex-direction: column; /* Para asegurar que los elementos estén alineados verticalmente */
  justify-content: center;
  align-items: center;
  height: 40vh; /* Ajusta el porcentaje según tus necesidades */
  max-height: 100%;
`;

const InformativeText = styled.div`
  font-family: var(--fuente-proxima-regular);
  text-align: center; /* Alinea el texto al centro horizontalmente */
  margin-top: 10px; /* Ajusta según sea necesario */
`;

export {
  Contenedor,
  TituloPantalla,
  PieDePagina,
  ContenedorBoton,
  Formulario,
  Mayusculas,
  MensajeError,
  Etiqueta,
  ContenedorFechaTarjeta,
  ContenedorMitad,
  EnvolvedorPantalla,
  Pantalla,
  IFrameContainer,
  SelectsContainer,
  Informative,
  InformativeText,
};
