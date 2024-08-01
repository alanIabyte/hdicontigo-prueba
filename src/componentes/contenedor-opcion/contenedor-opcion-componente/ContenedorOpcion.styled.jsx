import styled from "styled-components";

const EnvolvedorContenedorOpcion = styled.a`
  background-color: var(--fondo-blanco);
  width: 100%;
  height: 90px;
  border-radius: 10px;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  color: inherit;
  text-decoration: none;
`;
const ContenedorElementos = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Titulo = styled.div`
  width: 100%;
  color: var(--texto-negro);
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Subtitulo = styled.div`
  width: 100%;
  color: var(--texto-gris);
  font-size: 1.2rem;
  font-weight: bold;
`;

const Indicador = styled.div`
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    transform: scale(1.5);
    color: var(--texto-azul);
  }
`;

const Icono = styled.div`
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    transform: scale(2.5);
  }
`;

export {
  EnvolvedorContenedorOpcion,
  ContenedorElementos,
  Titulo,
  Subtitulo,
  Indicador,
  Icono,
};
