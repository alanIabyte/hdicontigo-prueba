import styled from "styled-components";
import {
  Pantalla,
  EnvolvedorPantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  Subtitulo3,
  Titulo3,
} from "../../componentes-styled-compartidos/Textos";

const Subtitulo = styled(Subtitulo3)`
  width: 100%;
  color: var(--color-gris-medio);
  margin: 10px 0 15px 0;
`;

const TituloFijo = styled(Titulo3)`
  float: left;
`;

const ContenedorIcono = styled.div`
  color: var(--texto-oscuro);
  float: right;
`;

const ContenedorPantalla = styled.div`
  width: 100%;
  heigth: 100%;
`;

const ContenedorBoton = styled.div`
  width: 100%;
  margin-bottom: 14px;
  margin-top: 44px;
`;

const ContenedorTitulo = styled.div`
  width: 100%;
  padding: 20px 25px;
  /* box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16); */
  position: relative;
  z-index: 99;
`;

const PantallaSubirDocumentos = styled(Pantalla)`
  margin-top: 0px;
`;

const Divisor = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--fondo-gris);
  margin: 25px 0;
`;

const ContenedorPrevisualizacionDeImagen = styled(Pantalla)`
  background-color: rgba(0, 0, 0, 0.4);
  display: block;
  font-size: 15px;
  height: 100%;
  left: 0;
  margin: 0 auto;
  overflow: auto;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 100;
  border-radius: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContenedorPrevisualizacionDeImagenContenedor = styled.div`
  width: 80%;
  height: 80%;
  background-color: var(--fondo-negro);
  position: relative;
  svg {
    color: var(--color-blanco-normal);
    float: right;
    margin-top: 15px;
    margin-right: 15px;
  }
`;

const ContenedorPrevisualizacionDeImagenImagen = styled.img`
  width: 100%;
  height: 80%;
  object-fit: contain;
  background-color: var(--fondo-negro);
  object-position: center;
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`;

const EnvolvedorPantallaDocumentos = styled(EnvolvedorPantalla)``;

export {
  ContenedorBoton,
  ContenedorIcono,
  ContenedorPantalla,
  ContenedorPrevisualizacionDeImagen,
  ContenedorPrevisualizacionDeImagenContenedor,
  ContenedorPrevisualizacionDeImagenImagen,
  ContenedorTitulo,
  Divisor,
  EnvolvedorPantallaDocumentos,
  PantallaSubirDocumentos,
  Subtitulo,
  TituloFijo,
};
