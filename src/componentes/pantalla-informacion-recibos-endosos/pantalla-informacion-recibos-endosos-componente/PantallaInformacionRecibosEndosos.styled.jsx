import styled from "styled-components";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import {
  Titulo3,
  Subtitulo3,
  Subtitulo1,
  Leyenda,
  Subtitulo3Negritas,
  BotonPequeno,
} from "../../componentes-styled-compartidos/Textos";

const EnvolvedorPantallaPolizas = styled(EnvolvedorPantalla)`
  height: calc(100% - 56px);
`;

const PantallaFondoBlanco = styled(Pantalla)`
  background-color: var(--color-blanco-normal);
  border-radius: 0px;
  height: calc(100% - 118px);
  overflow: scroll;
  overflow-x: hidden;
`;

const MensajePequeno = styled(Subtitulo3)`
  width: 100%;
  height: 40px;
  margin: 5px 0px 5px;
  text-align: left;
  color: var(--color-gris-medio);
`;

const Contenedor = styled.div`
  width: 100%;
  height: calc(100%);
  box-sizing: border-box;
  & > div:last-of-type {
    margin-bottom: 100px;
  }
`;

const TituloMisPolizas = styled(Titulo3)`
  margin-bottom: 24px;
  margin-top: 40px;
`;

const CostoTotal = styled(Titulo3)`
  margin-bottom: 30px;
  margin-top: 0px;
`;

const ContenedorBuscadorPolizas = styled.div`
  background-color: var(--fondo-blanco-normal);
  border: none;
  border-radius: 50px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  color: var(--color-gris-claro);
  display: flex;
  margin-bottom: 20px;
  padding: 10px;
`;

const BuscadorPolizas = styled.input`
  border: none;
  outline: none;
  padding-left: 9px;
  width: 100%;

  ::placeholder {
    color: var(--color-gris-claro);
  }
`;

const PieDePaginaMisPolizas = styled.div`
  background-color: var(--fondo-gris-ligero);
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const ContenedorBoton = styled.div`
  margin: 20px 24px;
`;

const ContenedorPoliza = styled.div`
  padding-top: 6px;
  padding-bottom: 6px;
`;

const Propiedad = styled(Leyenda)`
  font-size: 14px;
  font-weight: 500;
  color: var(--color-gris-medio);
  line-height: 1.5;
`;

const Valor = styled(Subtitulo3Negritas)`
  font-size: ${(props) => (props.grande ? "20px" : "14px")};
  color: var(--color-gris-medio);
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const GrupoDetalle = styled.div`
  margin-bottom: 10px;
`;

const CirculoEstatusPoliza = styled.span`
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border-radius: 50px;
  display: inline-flex;
  background-color: ${(props) => {
    const { estatus } = props;
    if (estatus === "Activo") {
      return "var(--color-marca-normal)";
    }
    if (estatus === "Pendiente") {
      return "var(--color-alerta-normal)";
    }
    if (estatus === "Cancelada") {
      return "var(--color-error-normal)";
    }
    return "var(--color-gris-normal)";
  }};
`;

const ColorAlterno = styled(Leyenda)`
  font-size: 14px;
  color: var(--color-gris-medio);
  line-height: 1.5;
  padding: 10px;
`;

const ValoresColorAlterno = styled.div`
  > :nth-child(even) {
    background-color: var(--color-gris-normal);
  }
`;

const BotonPagar = styled(BotonPequeno)`
  display: block;
  background-color: var(--color-marca-normal);
  border: 0;
  appearance: none;
  color: var(--color-blanco-normal);
  padding: 8px 12px;
  border-radius: 50px;
  margin-top: 8px;
`;

const BotonVer = styled(BotonPequeno)`
  display: block;
  background-color: transparent;
  border: 0;
  appearance: none;
  padding: 8px 12px 8px 0px;
  color: var(--texto-azul);
  font-family: var(--fuente-proxima-regular);
  font-size: 16px;
  font-weight: normal;
  margin-top: 8px;
`;

const PieDePagina = styled.div`
  background-color: var(--fondo-blanco-normal);
  width: 100%;
  position: absolute;
  bottom: 0;
  @media screen and (max-width: 578px) {
    position: absolute;
  }
`;

const ContenedorSinElementos = styled(Subtitulo1)`
  align-items: center;
  color: var(--color-gris-claro);
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  text-align: center;
`;

const ImagenSinElementos = styled.div`
  margin-bottom: 10px;
  ${".icono"} {
    opacity: 0.3;
    transform: scale(2);
  }
`;

const ListaRecibos = styled.div`
  padding-bottom: 86px;
`;

export {
  EnvolvedorPantallaPolizas,
  PantallaFondoBlanco,
  Contenedor,
  TituloMisPolizas,
  ContenedorBuscadorPolizas,
  BuscadorPolizas,
  PieDePaginaMisPolizas,
  ContenedorBoton,
  ContenedorPoliza,
  MensajePequeno,
  Propiedad,
  Valor,
  GrupoDetalle,
  CirculoEstatusPoliza,
  ValoresColorAlterno,
  ColorAlterno,
  BotonPagar,
  BotonVer,
  CostoTotal,
  PieDePagina,
  ContenedorSinElementos,
  ImagenSinElementos,
  ListaRecibos,
};
