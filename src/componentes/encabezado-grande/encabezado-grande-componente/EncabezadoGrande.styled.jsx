import styled from "styled-components";
import { Subtitulo1 } from "../../componentes-styled-compartidos/Textos";

const EnvolvedorEncabezado = styled.div`
  align-items: flex-end;
  background-color: var(--color-blanco-normal);
  box-shadow: 0 4px 8px 0 var(--color-gris-claro);
  color: var(--color-verde-normal);
  display: flex;
  padding-bottom: 16px;
  width: 100%;
  z-index: ${(props) => (props.seAbrioMenu ? "4" : "3")};
`;

const ContenedorIcono = styled.div`
  position: absolute;
  top: 40px;
  left: 16px;
  z-index: 1;
  ${".icono"} {
    transform: scale(1.3);
  }
`;

const TituloContenedor = styled(Subtitulo1)`
  align-items: center;
  color: var(--color-verde-normal);
  display: flex;
  flex-direction: column;
  font-family: var(--fuente-proxima-bold);
  margin-top: 40px;
  position: relative;
  text-align: center;
  width: 100%;
`;

const AvatarUsuario = styled.img`
  width: 44px;
  height: 44px;
  margin-bottom: 15px;
  border-radius: 50%;
`;

export {
  EnvolvedorEncabezado,
  ContenedorIcono,
  TituloContenedor,
  AvatarUsuario,
};
