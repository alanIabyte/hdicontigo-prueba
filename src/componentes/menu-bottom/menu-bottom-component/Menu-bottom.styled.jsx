import styled from "styled-components";

const ContenedorFondoMenuCompleto = styled.div`
  height: 100vh;
  width: 100%;
  position: absolute;
  z-index: 4;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  overflow-x: hidden;
`;

const ContenedorMenu = styled.div`
  background-color: var(--color-blanco-normal);
  width: 100%;
  height: auto;
  border-radius: 10px 10px 0 0;
  bottom: 0;
  z-index: 6;
  padding: 0.15rem 0rem;
  box-sizing: border-box;
  box-shadow: 0 0 8px 0 var(--color-gris-claro);
  position: fixed;
`;

const ConenedorIconosItemsCompleto = styled.div`
  widh: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 0;
  justify-content: flex-start;
  align-items: center;
  flex-flow: wrap;
`;

const ConenedorIconosItems = styled.div`
  widh: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 0;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 280px) {
    display: ruby-text;
  }
`;

const IconItem = styled.div`
  width: auto;
  max-width: 134px;
  height: 100%;
  display: flex;
  flex-flow: column;
  cursor: pointer;
  justify-content: center;
  margin-left: 5px;
  margin-right: 5px;
  flex: 1 0 21%;
  position: ${(props) => (props.position ? props.position : "")};
`;

const Icono = styled.img`
  width: auto;
  max-width: 30px;
  max-height: 30px;
  margin-left: auto;
  margin-right: auto;
`;

const BurbujaNotiCount = styled.div`
  position: absolute;
  padding: 0.05rem 0.3rem;
  background-color: red;
  top: -5px;
  left: 50%;
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  font-family: var(--fuente-montserrat-regular);
`;

const Title = styled.p`
  color ${(props) =>
    props.disabled ? "var(--color-gris-medio)" : "var(--color-verde-normal)"};
  padding: 0;
  width: 134px;
  margin: 0;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-size: 10px;
  font-weight: bold;
  font-family: var(--fuente-montserrat-regular);
  @media (max-width: 575px) {
    width: 100%;
    max-wdth: 90px;
  }
`;

const ContenedorSubMenu = styled.div`
  width: 100%;
  height: auto;
  border-radius: 10px 10px 0 0;
  position: absolute;
  /* bottom: -50px; */
  z-index: 5;
  padding: 1.4rem 0 2.5rem 0;
  box-sizing: border-box;
  background-color: var(--fondo-gris-ligero);
`;

export {
  ContenedorFondoMenuCompleto,
  ContenedorMenu,
  ConenedorIconosItems,
  IconItem,
  Icono,
  Title,
  ContenedorSubMenu,
  ConenedorIconosItemsCompleto,
  BurbujaNotiCount,
};
