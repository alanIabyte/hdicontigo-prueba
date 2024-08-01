import styled from "styled-components";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  Leyenda,
  Subtitulo3,
} from "../../componentes-styled-compartidos/Textos";

const ContenedorGoogleMapCompleto = styled.div`
  height: 100vh;
  margin-top: -10px;
  width: 100%;
  div:first-child {
    height: 100vh;
    & > div:first-child {
      height: 87vh !important;
      left: 0;
    }
  }
`;

const GoogleMapContenedorCargando = styled(Subtitulo3)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
`;

const PantallaSeguimiento = styled(Pantalla)`
  justify-content: initial;
  padding: 0;
  width: 100%;
  div {
    width: 100%;
  }
`;

const ContenedorPie = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  margin: 0 auto;
  background-color: var(--color-marca-normal);
  width: 100%;
  height: 120px;
  padding-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;
const ContenedorPieAjustador = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContenedorPieAjustadorImagen = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
`;

const ContenedorPieAjustadorHora = styled(Leyenda)`
  color: var(--color-blanco-normal);
  font-size: 18px;
  opacity: 0.5;
`;

const ContenedorPieAjustadorNombre = styled(Subtitulo3)`
  color: var(--color-blanco-normal);
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 9px;
`;

const ContenedorPieAjustadorTexto = styled.div`
  width: 215px !important;
  margin-left: 16px;
`;

const ContenedorCerrar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 44px;
  background-color: var(--fondo-blanco-normal);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 30px;
  right: 24px;
  cursor: pointer;
  z-index: 1;
  svg {
    transform: scale(0.95);
    position: absolute;
    color: var(--color-negro-normal);
  }
`;

const EnvolvedorPantallaAltoCompleto = styled(EnvolvedorPantalla)`
  height: 100vh;
`;

export {
  ContenedorCerrar,
  ContenedorGoogleMapCompleto,
  ContenedorPie,
  ContenedorPieAjustador,
  ContenedorPieAjustadorHora,
  ContenedorPieAjustadorImagen,
  ContenedorPieAjustadorNombre,
  ContenedorPieAjustadorTexto,
  EnvolvedorPantallaAltoCompleto,
  GoogleMapContenedorCargando,
  PantallaSeguimiento,
};
