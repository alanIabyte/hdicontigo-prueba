import styled from "styled-components";
import { Subtitulo2 } from "../../componentes-styled-compartidos/Textos";

const BotonCamara = styled.button`
  width: 66px;
  height: 66px;
  background: var(--fondo-blanco-normal);
  border-radius: 50%;
  color: var(--texto-blanco);
  border: solid 6px var(--fondo-negro);
  margin-top: 8%;
  margin-left: 8%;
`;

const BotonCancelar = styled.button`
  width: 44px;
  height: 44px;
  background: var(--fondo-error);
  padding: 0px;
  border-radius: 50%;
  color: var(--texto-blanco);
  font-size: 30px;
  border-style: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BotonConfirmar = styled.button`
  width: 44px;
  height: 44px;
  background: var(--fondo-exitoso);
  border-radius: 50%;
  padding: 0px;
  color: var(--texto-blanco);
  font-size: 30px;
  border-style: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContenedorBoton = styled.div`
  width: 100%;
  background-color: var(--fondo-negro);
  height: 22vh;
  z-index: 1;
  margin-top: -1vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ContenedorBotonCamara = styled.div`
  width: 78px;
  height: 78px;
  background: var(--fondo-blanco-normal);
  border-radius: 50%;
  color: var(--texto-blanco);
  margin-top: 5%;
  margin-bottom: 5%;
`;

const ContenidoMensaje = styled(Subtitulo2)`
  align-items: center;
  color: var(--texto-blanco);
  justify-content: space-around;
  text-align: center;
  text-decoration: none;
  width: 100%;
`;

const ContenedorOpciones = styled.div`
  display: contents;
`;

const ContenedorPantallaIngresoDePolizaOcr = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 0px;
  position: relative;
`;

const ContenedorWebCam = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 0px;
  .web-cam-estandar {
    width: 100%;
    object-fit: cover;
    height: 59vh;
  }
`;

const ContenedorMensaje = styled.div`
  position: absolute;
  z-index: 1;
  top: 17%;
`;

const EnvolvedorInstruccionesPantallaIngresoDePolizaOcr = styled.div`
  background-color: var(--fondo-blanco-medio);
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  padding: 26px 30px;
  text-align: center;
  position: relative;
  margin-top: -16px;
  z-index: 5;
  width: 100%;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const EnvolvedorPantallaIngresoDePolizaOcr = styled.div`
  font-family: var(--fuente-montserrat-regular);
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0px;
  overflow: hidden;
`;

const MarcoContenedor = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80vh;
`;

const MarcoArriba = styled.div`
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  height: 25%;
  width: 100%;
`;

const MarcoIzquierdo = styled.div`
  position: absolute;
  left: 0;
  top: 25%;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 20%;
`;

const MarcoAbajo = styled.div`
  position: absolute;
  left: 20%;
  top: 37%;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 80%;
`;

const MarcoDerecho = styled.div`
  position: absolute;
  right: 0;
  top: 25%;
  background-color: rgba(0, 0, 0, 0.5);
  height: 12%;
  width: 20%;
`;

export {
  BotonCamara,
  BotonCancelar,
  BotonConfirmar,
  ContenedorBoton,
  ContenedorBotonCamara,
  ContenedorMensaje,
  ContenedorOpciones,
  ContenedorPantallaIngresoDePolizaOcr,
  ContenedorWebCam,
  ContenidoMensaje,
  EnvolvedorInstruccionesPantallaIngresoDePolizaOcr,
  EnvolvedorPantallaIngresoDePolizaOcr,
  MarcoContenedor,
  MarcoArriba,
  MarcoIzquierdo,
  MarcoAbajo,
  MarcoDerecho,
};
