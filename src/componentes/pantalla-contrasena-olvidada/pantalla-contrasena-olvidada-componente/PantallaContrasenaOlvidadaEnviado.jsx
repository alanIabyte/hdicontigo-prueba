import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import { loader } from "graphql.macro";
import { useMutation } from "@apollo/react-hooks";
import IconoCerrar from "@material-ui/icons/CloseRounded";
import {
  ContenedorContrasenaEnviada,
  EncabezadoContrasenaEnviada,
  TituloMensajeEnviado,
  ImagenEnviado,
  CuerpoEnviado,
  EnlaceEnviado,
} from "./PantallaContrasenaOlvidada.styled";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import IndicadorCarga from "../../indicador-carga";
import ImagenEnviadoSvg from "../../../recursos/iconos/contigo/ico_enlace_enviado.svg";
import BarraAlerta from "../../barra-alerta";

const OLVIDE_CONTRASENA = loader(
  "../../../graphQL/mutation/seguridad/olvide_contrasena.graphql"
);

const PantallaContrasenaOlvidadaEnviada = (props) => {
  const { telefono } = props;
  const [cargando, asignarValorCargando] = useState(false);
  const [mostrarBarraAlerta, asignarValorMostrarBarraAlerta] = useState(false);
  const history = useHistory();
  const [reintentar, SetReintentar] = useState(false);
  const [cronometro, SetCronometro] = useState(20);

  const diccionario = {
    titulo: "Enlace enviado",
    cuerpo:
      "¡Listo! Te hemos enviado un enlace para restablecer tu contraseña.",
    enlace: "Reenviar enlace",
    mensajeAlerta:
      "Tenemos problemas para realizar el cambio de contraseña. Favor de intentarlo mas tarde.",
  };

  const [enviarContrasenaOlvidada, { data, loading }] =
    useMutation(OLVIDE_CONTRASENA);

  const mandarPeticion = () => {
    enviarContrasenaOlvidada({
      variables: {
        usuario: telefono,
      },
    });
    SetReintentar(false);
    SetCronometro(20);
  };

  useEffect(() => {
    if (!loading && data) {
      asignarValorCargando(false);
      if (
        data &&
        data.olvide_contrasena &&
        data.olvide_contrasena.mensaje &&
        data.olvide_contrasena.mensaje === "IDX10023"
      ) {
        // es por que trono un servicio pintar alerta
        asignarValorMostrarBarraAlerta(true);
      }
    } else if (!loading) {
      asignarValorCargando(false);
      asignarValorMostrarBarraAlerta(false);
    } else {
      asignarValorCargando(true);
    }
  }, [data, loading]);

  setTimeout(() => {
    if (cronometro > 0) {
      const tiempo = cronometro - 1;
      SetCronometro(tiempo);
    } else {
      SetReintentar(true);
    }
  }, 1000);

  return (
    <EnvolvedorPantalla key={v4()} id="PantallaContrasenaOlvidadaEnviada">
      {cargando ? <IndicadorCarga /> : null}
      <Pantalla>
        <BarraAlerta
          etiqueta={diccionario.mensajeAlerta}
          mostrarAlerta={mostrarBarraAlerta}
          manejarCierre={asignarValorMostrarBarraAlerta}
          estilo="error"
        />
        <ContenedorContrasenaEnviada>
          <EncabezadoContrasenaEnviada>
            <TituloMensajeEnviado>{diccionario.titulo}</TituloMensajeEnviado>
            <IconoCerrar
              onClick={() => {
                history.push("/");
              }}
            />
          </EncabezadoContrasenaEnviada>
          <ImagenEnviado src={ImagenEnviadoSvg} />
          <CuerpoEnviado>{diccionario.cuerpo}</CuerpoEnviado>
          {reintentar ? (
            <EnlaceEnviado onClick={mandarPeticion}>
              {diccionario.enlace}
            </EnlaceEnviado>
          ) : (
            <CuerpoEnviado>{cronometro}</CuerpoEnviado>
          )}
        </ContenedorContrasenaEnviada>
      </Pantalla>
    </EnvolvedorPantalla>
  );
};

PantallaContrasenaOlvidadaEnviada.propTypes = {
  telefono: PropTypes.string,
};

PantallaContrasenaOlvidadaEnviada.defaultProps = {
  telefono: "",
};

export default PantallaContrasenaOlvidadaEnviada;
