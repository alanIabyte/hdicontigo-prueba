import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { v4 } from "uuid";
import { loader } from "graphql.macro";
import { useMutation } from "@apollo/react-hooks";
import {
  CuerpoContrasenaOlvidada,
  ContenedorBoton,
} from "./PantallaContrasenaOlvidada.styled";
import {
  EnvolvedorPantalla,
  Pantalla,
} from "../../componentes-styled-compartidos/Pantalla.styled";
import Enviado from "./PantallaContrasenaOlvidadaEnviado";
import IndicadorCarga from "../../indicador-carga";
import Encabezado from "../../encabezado";
import Boton from "../../boton";
import BarraAlerta from "../../barra-alerta";
import CampoTexto from "../../campo-texto";

const valores = {
  telefono: "",
};

const OLVIDE_CONTRASENA = loader(
  "../../../graphQL/mutation/seguridad/olvide_contrasena.graphql"
);

const PantallaContrasenaOlvidada = () => {
  const history = useHistory();
  const [botonDeshabilitado, asignarValorBotonDeshabilitado] = useState(true);
  const [mostrarBarraAlerta, asignarValorMostrarBarraAlerta] = useState(false);
  const [pantalla, asignarValorPantalla] = useState("");
  const [cargando, asignarValorCargando] = useState(false);

  const diccionario = {
    encabezado: "Olvidé mi contraseña",
    cuerpo:
      // eslint-disable-next-line max-len
      "Ingresa el teléfono vinculado a tu cuenta. Enviaremos un WhatsApp/SMS con el enlace para restablecer tu contraseña.",
    etiquetaTelefono: "Teléfono",
    etiquetaBoton: "Enviar enlace",
    mensajeAlerta:
      "Tenemos problemas para realizar el cambio de contraseña. Favor de intentarlo mas tarde.",
  };

  const cambiarPantalla = (pantallaACambiar) => {
    asignarValorPantalla(pantallaACambiar);
  };

  const [enviarContrasenaOlvidada, { data, loading }] =
    useMutation(OLVIDE_CONTRASENA);

  useEffect(() => {
    if (valores.telefono === "") {
      asignarValorBotonDeshabilitado(true);
    } else {
      asignarValorBotonDeshabilitado(false);
    }
  }, []);

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
        asignarValorBotonDeshabilitado(true);
        setTimeout(() => {
          asignarValorBotonDeshabilitado(false);
        }, 4000);
      } else {
        cambiarPantalla("enviado");
      }
    } else if (loading) {
      asignarValorCargando(true);
    }
  }, [data, loading]);

  const mandarPeticion = () => {
    enviarContrasenaOlvidada({
      variables: {
        usuario: valores.telefono,
      },
    });
  };

  const alCambiarTelefono = (evento) => {
    if (evento) {
      const valor = evento.target.value;
      if (valor === "") {
        asignarValorBotonDeshabilitado(true);
      } else {
        asignarValorBotonDeshabilitado(false);
      }
      valores.telefono = valor;
    }
  };

  let pantallaAMostrar = (
    <EnvolvedorPantalla key={v4()} id="PantallaContrasenaOlvidada">
      {cargando ? <IndicadorCarga /> : null}
      <Encabezado
        titulo={diccionario.encabezado}
        funcionRegresar={() => {
          history.push("/");
        }}
      />
      <Pantalla>
        <BarraAlerta
          etiqueta={diccionario.mensajeAlerta}
          mostrarAlerta={mostrarBarraAlerta}
          manejarCierre={asignarValorMostrarBarraAlerta}
          estilo="error"
        />
        <CuerpoContrasenaOlvidada>
          {diccionario.cuerpo}
        </CuerpoContrasenaOlvidada>
        <CampoTexto
          id="campoTelefono"
          etiqueta={diccionario.etiquetaTelefono}
          valor={valores.telefono}
          numeroDeCaracteres={15}
          esNumerico
          enCambio={alCambiarTelefono}
          autoenfoque
        />
        <ContenedorBoton>
          <Boton
            etiqueta={diccionario.etiquetaBoton}
            tema="estandar"
            enClick={mandarPeticion}
            deshabilitado={botonDeshabilitado}
          />
        </ContenedorBoton>
      </Pantalla>
    </EnvolvedorPantalla>
  );

  if (pantalla === "enviado") {
    pantallaAMostrar = <Enviado telefono={valores.telefono} />;
  }
  return pantallaAMostrar;
};

export default PantallaContrasenaOlvidada;
