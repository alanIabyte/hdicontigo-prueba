import styled from "styled-components";
import { Titulo3 } from "../../componentes-styled-compartidos/Textos";

const TituloMenuEspera = styled(Titulo3)`
  margin-bottom: 30px;
  margin-top: 20px;
  float: left;
`;

const ContenedorIcono = styled.div`
  color: var(--texto-oscuro);
  float: right;
  margin-top: 20px;
`;

const ContenedorPantalla = styled.div`
  margin-bottom: 120px;
  width: 100%;
`;

const ContenedorTitulo = styled.div`
  width: 100%;
`;

export {
  TituloMenuEspera,
  ContenedorIcono,
  ContenedorPantalla,
  ContenedorTitulo,
};
