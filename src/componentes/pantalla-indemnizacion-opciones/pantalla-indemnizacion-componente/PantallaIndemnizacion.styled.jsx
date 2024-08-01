import styled from "styled-components";

const ParrafoAlerta = styled.p`
  font-family: var(--fuente-proxima-regular);
  font-size: 19px;
`;

const EnlaceAlerta = styled(ParrafoAlerta)`
  cursor: pointer;
  font-size: 18px;
  color: var(--color-azul-enlace);

  &:hover {
    text-decoration: underline;
  }
`;

const EnlaceAlertaInline = styled.a`
  font-family: var(--fuente-proxima-regular);
  cursor: pointer;
  font-size: 18px;
  color: var(--color-azul-enlace);

  &:hover {
    text-decoration: underline;
  }
`;

export { ParrafoAlerta, EnlaceAlerta, EnlaceAlertaInline };
