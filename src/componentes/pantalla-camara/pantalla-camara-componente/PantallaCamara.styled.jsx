import styled from "styled-components";

const BotonCamara = styled.button`
  width: 50px;
  height: 50px;
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
  height: 64px;
  z-index: 1;
  margin-top: -1vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ContenedorBotonCamara = styled.div`
  width: 60px;
  height: 60px;
  background: var(--fondo-blanco-normal);
  border-radius: 50%;
  color: var(--texto-blanco);
  margin-top: 5%;
  margin-bottom: 5%;
`;

const ContenedorOpciones = styled.div`
  display: contents;
`;

const ContenedorPantallaCamara = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 0px;
  margin-top: -18px;
`;

const ContenedorWebCam = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 0px;
`;

const EnvolvedorPantallaCamara = styled.div`
  font-family: var(--fuente-montserrat-regular);
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0px;
  overflow: hidden;
  & > div:first-child {
    height: 8vh !important;
  }
`;

const ContenedorImagen = styled.div`
  width: 100%;
`;

const ContenedorSeleccion = styled.img`
  width: 50px;
  height: 50px;
  background-color: var(--fondo-blanco-normal);
  position: absolute;
  left: 30px;
`;

const Archivo = styled.input`
  display: none;
`;

export {
  Archivo,
  BotonCamara,
  BotonCancelar,
  BotonConfirmar,
  ContenedorBoton,
  ContenedorBotonCamara,
  ContenedorImagen,
  ContenedorOpciones,
  ContenedorPantallaCamara,
  ContenedorSeleccion,
  ContenedorWebCam,
  EnvolvedorPantallaCamara,
};
