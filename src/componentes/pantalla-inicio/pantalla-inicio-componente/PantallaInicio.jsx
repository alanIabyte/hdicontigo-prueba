/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { v4 } from "uuid";
import { useQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  PantallaFondoGris,
  ContenedorPolizas,
  TituloMisPolizas,
  MensajePequeno,
} from "./PantallaInicio.styled";
import EncabezadoPolizasSiniestradas from "../../encabezado-polizas-siniestradas";
import BarraAlerta from "../../barra-alerta";
import IndicadorCarga from "../../indicador-carga";
import CajaResumen from "../../caja-resumen";
import useValidateLogin from "../../../utils/useValidateLogin";
import useRedirect from "../../../utils/useRedirect";
import MenuBottomComponente from "../../menu-bottom";
import { validaDispositivoCelular } from "../../../utils/validaDispositivo";
import { Pantalla } from "../../componentes-styled-compartidos/Pantalla.styled";
import EncabezadoSimple from "../../encabezado-simple";
import {
  EnvolvedorPantallaPolizas,
  PieDePaginaMisPolizas,
} from "../../pantalla-mis-polizas/pantalla-mis-polizas-componente/PantallaMisPolizas.styled";
import constantes from "../../../recursos/constantes";
import showConfig from "../../../utils/configs"; // solo para demo keycloak

const OBTENER_INICIO = loader(
  "../../../graphQL/query/poliza/obtener_inicio.graphql"
);

const diccionario = {
  titulo: "Bienvenido",
  descripcionPantalla: "Consulta a detalle tus pólizas o tus siniestros",
  mensajeDeErrorDefault: "Ocurrió un error.",
  reportarSiniestro: "Reportar siniestro",
  mensajeSugerirCambioContrasena:
    "Por seguridad, te recomendamos cambiar tu contraseña",
};

const { nombreDeCookie } = constantes;

const PantallaInicio = () => {
  const [cargando, asignarValorCargando] = useState(true);
  const dispatch = useDispatch();
  const estadoApp = useSelector((state) => state);
  const { redirectRoot } = useRedirect();
  const { validateUser, user: usuario } = useValidateLogin();
  // original
  // if (!validateUser || !usuario) {
  //   redirectRoot();
  // }

  if (!showConfig.showKeycloak) {
    if (!validateUser || !usuario) {
      redirectRoot();
    }
  }

  const [cookie, establecerCookie] = useCookies([nombreDeCookie]);

  const [mostrarBarraAlerta, asignarValorMostrarBarraAlerta] = useState(false);
  const [mensajeAlerta, asignarValorMensajeAlerta] = useState(
    diccionario.mensajeDeErrorDefault
  );

  const [numeroPolizasAUTR, asignarValorNumeroPolizasAUTR] = useState(0);
  const [numeroPolizasDAN, asignarValorNumeroPolizasDAN] = useState(0);
  const [numeroPolizasGMM, asignarValorNumeroPolizasGMM] = useState(0);

  //  const [numeroSiniestrosDAN, asignarValorNumeroSiniestrosDAN] = useState(0);
  const [numeroSiniestrosAUTR, asignarValorNumeroSiniestrosAUTR] = useState(0);

  // const usuario =
  //   objetoCookie && objetoCookie.Usuario ? objetoCookie.Usuario : "0";

  // ORIGINAL
  const { data, loading, error } = useQuery(OBTENER_INICIO, {
    variables: { telefono: usuario },
    fetchPolicy: "cache-and-network",
  });

  const [verMenuInferior, setVerMenuInferior] = useState(false);
  const [mostrarAlertaCambioContrasena, setMostrarAlertaCambioContrasena] =
    useState(false);

  useEffect(async () => {
    setVerMenuInferior(validaDispositivoCelular());
  }, []);

  useEffect(() => {
    const objetoCookie = cookie[nombreDeCookie];
    if (objetoCookie && objetoCookie.Usuario && objetoCookie.access_token) {
      const validado = estadoApp.usuarioValidado;
      if (!validado) {
        const fromLogin = localStorage.getItem("fromLogin");

        if (fromLogin) {
          localStorage.removeItem("fromLogin");
          setMostrarAlertaCambioContrasena(true);
          setTimeout(() => {
            setMostrarAlertaCambioContrasena(false);
          }, 15000);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!loading && data && data.cobranza_consultaHome) {
      asignarValorCargando(false);
      if (!data.cobranza_consultaHome.dato) {
        asignarValorNumeroPolizasAUTR(0);
        asignarValorNumeroPolizasDAN(0);
        asignarValorNumeroSiniestrosAUTR(0);
        asignarValorNumeroPolizasGMM(0);
        return;
      }
      asignarValorNumeroPolizasAUTR(
        data.cobranza_consultaHome.dato.totalPolizasSiniestros
      );
      asignarValorNumeroPolizasDAN(
        data.cobranza_consultaHome.dato.totalPolizasDanos
      );
      asignarValorNumeroSiniestrosAUTR(
        data.cobranza_consultaHome.dato.totalSiniestrosAutos
      );
      asignarValorNumeroPolizasGMM(
        data.cobranza_consultaHome.dato.totalPolizasGmm
      );
      dispatch({
        type: "AGREGAR",
        valor: data.cobranza_consultaHome.dato.totalPolizasGmm,
        indice: "consultaHome",
      });
      /*
      asignarValorNumeroSiniestrosDAN(
        data.cobranza_consultaHome.dato.totalSiniestrosDanos
      );
      */
    }
    if (loading) {
      asignarValorCargando(true);
    }
    if (!loading) {
      asignarValorCargando(false);
    }
    if (error) {
      asignarValorMensajeAlerta(error);
    }
  }, [data, loading]);

  return (
    <EnvolvedorPantallaPolizas key={v4()}>
      {cargando ? <IndicadorCarga /> : null}

      {!verMenuInferior && (
        <EncabezadoPolizasSiniestradas mostrarMenu={!verMenuInferior} />
      )}
      {verMenuInferior && <EncabezadoSimple />}
      <Pantalla>
        <BarraAlerta
          etiqueta={mensajeAlerta}
          mostrarAlerta={mostrarBarraAlerta}
          manejarCierre={() => {
            asignarValorMostrarBarraAlerta(false);
          }}
          estilo="error"
          posicionAbsoluta
        />
        <BarraAlerta
          etiqueta={diccionario.mensajeSugerirCambioContrasena}
          mostrarAlerta={mostrarAlertaCambioContrasena}
          manejarCierre={() => {
            setMostrarAlertaCambioContrasena(false);
          }}
          estilo="alerta"
          posicionAbsoluta
        />
        <ContenedorPolizas polizas={0}>
          <TituloMisPolizas id="titulo">{diccionario.titulo}</TituloMisPolizas>
          <MensajePequeno id="mensajePequeno">
            {diccionario.descripcionPantalla}
          </MensajePequeno>

          <CajaResumen
            numeroAUTR={numeroPolizasAUTR}
            numeroDAN={numeroPolizasDAN}
            numeroGMM={numeroPolizasGMM}
            nombre="Mis pólizas"
            direccion="/mis-polizas"
            textoDetalle="Ver pólizas"
            icono="Poliza"
          />
          <CajaResumen
            numeroAUTR={numeroSiniestrosAUTR}
            numeroDAN={null}
            nombre="Mis siniestros"
            direccion="/polizas-siniestradas"
            textoDetalle="Ver siniestros"
            icono="Auto"
          />
        </ContenedorPolizas>
      </Pantalla>
      <PieDePaginaMisPolizas />
      {verMenuInferior && <MenuBottomComponente />}
    </EnvolvedorPantallaPolizas>
  );
};
export default PantallaInicio;
