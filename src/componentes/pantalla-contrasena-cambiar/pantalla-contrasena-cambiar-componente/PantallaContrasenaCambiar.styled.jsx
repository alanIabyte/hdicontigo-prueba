import styled from "styled-components";
import {
  CuerpoLiga,
  Leyenda,
  Subtitulo1,
  Subtitulo3,
  Subtitulo3Negritas,
  Titulo3,
} from "../../componentes-styled-compartidos/Textos";

const Caracteristica = styled(Leyenda)`
  display: flex;
  align-items: center;
  color: ${(props) => {
    if (props.aprobada === null) {
      return "var(--color-gris-medio)";
    }
    if (props.aprobada) {
      return "var(--color-negro-puro)";
    }
    if (!props.aprobada) {
      return "var(--color-error-normal)";
    }
    return "var(--color-gris-medio)";
  }};
  padding-top: ${(props) => {
    if (props.aprobada) {
      return "0px";
    }
    return "3px";
  }};
  padding-bottom: ${(props) => {
    if (props.aprobada) {
      return "0px";
    }
    return "3px";
  }};
`;

const ContenedorBoton = styled.div`
  margin-top: 60px;
  width: 100%;
`;

const ContenedorCaracteristicas = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const ContenedorFormulario = styled.div`
  width: 100%;
`;

const ContenedorLogo = styled.div`
  height: 80px;
  padding-bottom: 40px;
`;

const ContenedorOmitir = styled.div`
  text-decoration: none;
`;

const ContenedorRestablecerContrasenaEnviada = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 120px;
  margin-top: 40px;
`;

const ContenedorTitulo = styled.div`
  width: 100%;
`;

const ContenedorValorTelefono = styled(Subtitulo1)`
  width: 100%;
  display: flex;
  padding: 23px;
  justify-content: space-around;
  border-radius: 6px;
  background-color: var(--color-gris-normal);
  letter-spacing: 5px;
`;

const Cuerpo = styled(Subtitulo3)`
  color: var(--color-gris-medio);
  margin-top: 50px;
  text-align: rigth;
  margin-bottom: 20px;
  width: 100%;
`;

const CuerpoEnfasis = styled.b`
  font-family: var(--fuente-proxima-bold);
`;

const CuerpoContrasenaRestablecida = styled(Subtitulo1)`
  color: var(--color-gris-medio);
  margin-bottom: 120px;
  text-align: center;
`;

const EncabezadoRestablecerContrasenaEnviada = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const EnlaceContrasenaRestablecida = styled(Subtitulo3)`
  color: var(--texto-azul);
`;

const IconoCaracteristica = styled.div`
  color: var(--color-exitoso-normal);
  font-size: 14px;
`;

const ImagenContrasenaRestablecida = styled.img`
  margin-bottom: 40px;
  margin-top: 180px;
  width: 120px;
`;

const LigaOmitir = styled(Leyenda)`
  color: var(--texto-azul);
  margin-top: 10px;
`;

const LinkNoEnviado = styled(CuerpoLiga)`
  width: 100%;
  height: 18px;
  margin: 10px 0 50px;
  text-align: left;
  color: var(--texto-azul);
`;

const LogoPantalla = styled.img`
  width: 100%;
  max-width: 248px;
`;

const MensajeError = styled(Leyenda)`
  font-size: 12px;
  text-align: left;
  width: 100%;
  margin-top: 5%;
  color: var(--color-error-normal);
`;

const SeparadorEspacio = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Titulo = styled(Titulo3)`
  color: var(--color-negro-normal);
  margin-top: 50px;
  margin-bottom: 40px;
  text-align: center;
`;

const TituloCaracteristicas = styled(Subtitulo3Negritas)`
  color: var(--color-gris-medio);
  font-size: 14px !important;
`;

const TituloMensajeContrasenaRestablecida = styled(Titulo3)`
  text-align: center;
  width: 100%;
`;

export {
  Caracteristica,
  ContenedorBoton,
  ContenedorCaracteristicas,
  ContenedorFormulario,
  ContenedorLogo,
  ContenedorOmitir,
  ContenedorRestablecerContrasenaEnviada,
  ContenedorTitulo,
  ContenedorValorTelefono,
  Cuerpo,
  CuerpoEnfasis,
  CuerpoContrasenaRestablecida,
  EncabezadoRestablecerContrasenaEnviada,
  EnlaceContrasenaRestablecida,
  IconoCaracteristica,
  ImagenContrasenaRestablecida,
  LigaOmitir,
  LinkNoEnviado,
  LogoPantalla,
  MensajeError,
  SeparadorEspacio,
  Titulo,
  TituloCaracteristicas,
  TituloMensajeContrasenaRestablecida,
};
