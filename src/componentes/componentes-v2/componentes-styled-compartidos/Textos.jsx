import styled from "styled-components";

const Titulo1 = styled.h1`
  font-family: var(--fuente-montserrat-bold);
  font-size: 28px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: -0.74px;
  color: var(--color-negro-normal);
`;

const Titulo2 = styled.h2`
  font-family: var(--fuente-montserrat-bold);
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.13;
  letter-spacing: -0.6px;
  color: var(--color-negro-normal);
`;

const Titulo3 = styled.h3`
  font-family: var(--fuente-montserrat-bold);
  font-size: 22px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: -0.44px;
  color: var(--color-verde-normal);
`;

const Subtitulo1 = styled.div`
  font-family: var(--fuente-proxima-regular);
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  color: var(--color-negro-normal);
`;

const Subtitulo2 = styled.div`
  font-family: var(--fuente-proxima-regular);
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  color: var(--color-negro-normal);
`;

const Subtitulo3 = styled.div`
  font-family: var(--fuente-proxima-regular);
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: var(--color-negro-normal);
`;

const Subtitulo3Negritas = styled(Subtitulo3)`
  font-family: var(--fuente-proxima-bold);
`;

const Subtitulo2Negritas = styled(Subtitulo2)`
  font-family: var(--fuente-proxima-bold);
`;

const Cuerpo = styled.div`
  font-family: var(--fuente-proxima-regular);
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  color: var(--color-negro-normal);
`;

const Parrafo = styled.div`
  font-family: var(--fuente-proxima-regular);
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: 0.4px;
  color: var(--color-negro-normal);
`;

const ParrafoNegritas = styled(Parrafo)`
  font-family: var(--fuente-proxima-bold);
`;

const Leyenda = styled.div`
  font-family: var(--fuente-proxima-regular);
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: var(--color-negro-normal);
`;

const LeyendaNegritas = styled(Leyenda)`
  font-family: var(--fuente-proxima-bold);
`;

const TituloSeccion = styled.div`
  font-family: var(--fuente-montserrat-semibold);
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: 0.5px;
  color: var(--color-negro-normal);
  text-transform: uppercase;
`;

const TituloPrincipalIzquierda = styled.h2`
  font-family: var(--fuente-montserrat-bold);
  height: 54px;
  margin-bottom: 10px;
  margin-top: 18px;
  text-align: left;
  width: 100%;
  color: var(--color-verde-normal);
  @media (min-width: 319px) and (max-width: 376px) {
    font-size: 20px;
  }
`;

const BotonGrande = styled.button`
  font-family: var(--fuente-montserrat-bold);
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: 0.2px;
  color: var(--color-negro-normal);
`;

const BotonMediano = styled.button`
  font-family: var(--fuente-montserrat-bold);
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: 0.2px;
  color: var(--color-negro-normal);
`;

const BotonPequeno = styled.button`
  font-family: var(--fuente-montserrat-bold);
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: 0.2px;
  color: var(--color-negro-normal);
`;

const CuerpoLiga = styled(Cuerpo)`
  color: var(--color-azul-normal);
  cursor: pointer;
`;

const MensajeError = styled.div`
  font-family: var(--fuente-proxima-regular);
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.01px;
  text-align: left;
  color: var(--color-error-normal);
`;

const BotonDescarga = styled(BotonPequeno)`
  width: 121px;
  height: 25px;
  padding: 5px 12px;
  border-radius: 13px;
  border: solid 1px var(--color-negro-normal);
  background-color: var(--fondo-blanco-normal);
`;

const BarCode = styled.div`
  font-family: var(--fuente-idautomation);
  font-size: 40px;
  text-align: center;
  color: var(--color-negro-normal);
`;

export {
  BotonDescarga,
  BotonGrande,
  BotonMediano,
  BotonPequeno,
  Cuerpo,
  CuerpoLiga,
  Leyenda,
  LeyendaNegritas,
  MensajeError,
  Parrafo,
  Subtitulo1,
  Subtitulo2,
  Subtitulo3,
  Subtitulo3Negritas,
  Subtitulo2Negritas,
  Titulo1,
  Titulo2,
  Titulo3,
  TituloPrincipalIzquierda,
  TituloSeccion,
  ParrafoNegritas,
  BarCode,
};
