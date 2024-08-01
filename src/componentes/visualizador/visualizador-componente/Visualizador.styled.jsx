import styled from "styled-components";
import {
  Subtitulo1,
  Subtitulo3,
} from "../../componentes-styled-compartidos/Textos";

const ContenedorIcono = styled.div`
  margin-top: 20px;
  position: absolute;
  margin-left: 20px;
`;

const ContenedorImagen = styled.div`
  width: 62px;
  height: 62px;
  font-size: 18px;
  color: var(--color-blanco-normal);
  background-color: var(--color-gris-claro);
`;

const ImagenMiniatura = styled.img`
  width: 62px;
  height: 62px;
  object-fit: cover;
  cursor: pointer;
`;

const ImagenModal = styled.img`
  width: 100%;
  height: 60%;
  background-color: var(--fondo-negro);
  margin: 0;
`;

const EncabezadoModal = styled(Subtitulo1)`
  align-items: center;
  background-color: var(--fondo-negro);
  display: flex;
  font-family: var(--fuente-proxima-bold);
  margin-bottom: 20px;
  padding-top: 20px;
  position: sticky;
  top: 0;
  justify-content: flex-end;
`;

const FooterModal = styled(Subtitulo1)`
  align-items: center;
  background-color: var(--fondo-negro);
  display: flex;
  font-family: var(--fuente-proxima-bold);
  margin-bottom: 20px;
  padding-top: 20px;
  position: sticky;
  bottom: 0;
  justify-content: space-evenly;
  @media (max-width: 426px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const EnvolvedorModalFoto = styled.div`
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.4);
  display: ${(props) => (props.mostrar ? "flex" : "none")};
  height: 100%;
  left: 0;
  margin: 0 auto;
  overflow: auto;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  align-items: center;
  justify-content: center;
`;

const EnvolvedorVisualizador = styled(Subtitulo3)`
  color: var(--color-gris-medio);
  justify-content: space-between;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: ${({ length }) =>
    (length <= 3 && "repeat(1, 1fr)") ||
    (length >= 4 && length <= 7 ? "repeat(2, 1fr)" : "repeat(3, 1fr)")};
  /*  repeat(5, 1fr); */
`;

const ContenedorImagenSlider = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ModalContenedor = styled.div`
  background-color: var(--fondo-negro);
  max-height: 80%;
  max-width: calc(var(--ancho-maximo-movil) - 90px);
  width: 80%;
  height: 80%;
  overflow-y: scroll;
  padding-bottom: 40px;
  position: relative;

  svg {
    color: var(--color-blanco-normal);
    float: right;
    margin-top: 15px;
    margin-right: 15px;
  }
`;

export {
  ContenedorIcono,
  ContenedorImagen,
  EncabezadoModal,
  EnvolvedorModalFoto,
  EnvolvedorVisualizador,
  ImagenMiniatura,
  ImagenModal,
  ModalContenedor,
  ContenedorImagenSlider,
  FooterModal,
};
