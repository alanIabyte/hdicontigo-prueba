import styled from "styled-components";
import { Leyenda } from "../../componentes-styled-compartidos/Textos";

const Wrapper = styled.div`
  width: 100%;
  margin: 10px 0;
  padding: 10px 0;
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Texto = styled(Leyenda)`
  color: var(--color-gris-medio);
`;

const Icono = styled.img`
  width: 20px;
  height: 20px;
`;

export { Wrapper, Texto, Icono };
