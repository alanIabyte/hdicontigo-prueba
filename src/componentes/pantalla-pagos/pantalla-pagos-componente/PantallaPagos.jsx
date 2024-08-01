/* eslint-disable */
import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import {
  EnvolvedorPantallaPolizas,
  PantallaFondo,
  ContenedorPolizas,
  TituloMisPolizas,
  MensajePequeno,
  ContenedorSinSiniestros,
} from "./PantallaPagos.styled";
import GrupoBotones from "../../grupo-botones";
import EncabezadoPolizasSiniestradas from "../../encabezado-polizas-siniestradas";
import IndicadorCarga from "../../indicador-carga";
import PolizaRecibo from "../recursos/poliza-recibo-componente/PolizaRecibo";
import Constantes from "../../../recursos/constantes";
import { ReactComponent as IconoCarro } from "../../../recursos/iconos/ico_carro_ok.svg";
import IconoCasa from "../../../recursos/iconos/daniosblocked.svg";

import MenuBottomComponente from "../../menu-bottom";
import { validaDispositivoCelular } from "../../../utils/validaDispositivo";

const OBTENER_POLIZAS_COBRANZA = loader(
  "../../../graphQL/query/cobranza/cobranza_consultaPolizasCobranza.graphql"
);

const diccionario = {
  titulo: "Pagos de mis pólizas",
  descripcion:
    "Cuentas con más de una póliza. Selecciona una para ver tus recibos.",
  sinPolizas1: "No tienes pólizas",
  sinPolizas2: "registradas",
  mensajeDeErrorDefault: "Tu solicitud no pudo ser procesada, por favor contacta a tu agente.",
};

const nombreCookie = Constantes.nombreDeCookie;

const PantallaMisPolizas = () => {
  const [cargando, asignarValorCargando] = useState(false);
  const history = useHistory();
  // const dispatch = useDispatch();
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    history.push("/");
  }

  const [mostrarBarraAlerta, asignarValorMostrarBarraAlerta] = useState(false);
  const [tipoPoliza, asignarTipoPoliza] = useState("AUTR");

  const usuario =
    objetoCookie && objetoCookie.Usuario ? objetoCookie.Usuario : "0";

  const {
    data: polizasR,
    loading: enCargaR,
    refetch: refetchPolizas,
  } = useQuery(OBTENER_POLIZAS_COBRANZA, {
    variables: { telefono: usuario, token: objetoCookie.access_token },
    fetchPolicy: "cache-and-network",
  });

  const [obtenerPolizas, { data: polizas, loading: enCarga }] = useLazyQuery(
    OBTENER_POLIZAS_COBRANZA
  );

  const [polizasEncontradas, asignarValorPolizasEncontradas] = useState(
    polizasR?.cobranza_consultaPolizasCobranza?.dato || []
  );

  const recargarPag = () => {
    obtenerPolizas({
      variables: { telefono: usuario, token: objetoCookie.access_token },
      fetchPolicy: "cache-and-network"
    });
  };

  const contarPolizasPorTipo = () => {
    return polizasEncontradas?.filter(
      (poliza) => poliza.lineaNegocio === tipoPoliza
    ).length;
  };

  const [verMenuInferior, setVerMenuInferior] = useState(false);

  useEffect(() => {
    recargarPag();
    refetchPolizas();
    setVerMenuInferior(validaDispositivoCelular());
  }, []);

  useEffect(() => {
    asignarValorCargando(true);
  }, []);

  useEffect(() => {
    if (!enCarga && polizas && polizas.cobranza_consultaPolizasCobranza) {
      asignarValorCargando(false);
      asignarValorPolizasEncontradas(
        polizas.cobranza_consultaPolizasCobranza.dato
      );
    } else if (enCarga) {
      asignarValorCargando(true);
    }
  }, [polizas, enCarga]);

  useEffect(() => {
    if (!enCargaR && polizasR && polizasR.cobranza_consultaPolizasCobranza) {
      asignarValorCargando(false);
      asignarValorPolizasEncontradas(
        polizasR.cobranza_consultaPolizasCobranza.dato
      );
    } else if (enCargaR) {
      asignarValorCargando(true);
    }
  }, [polizasR, enCargaR]);

  useEffect(() => {
    if (!enCargaR && polizasR && polizasR.cobranza_consultaPolizasCobranza) {
      asignarValorCargando(false);
      asignarValorPolizasEncontradas(
        polizasR.cobranza_consultaPolizasCobranza.dato
      );
    } else if (enCargaR) {
      asignarValorCargando(true);
    }
  }, [polizasR, enCargaR]);

  const alSeleccionarTipoPoliza = (tipo) => {
    asignarTipoPoliza(tipo);
  };

  const consultarRecibosEndosos = (poliza, tipo) => {
    history.push("/informacion-recibos-endosos", { poliza, tipo });
  };

  return (
    <EnvolvedorPantallaPolizas key={v4()}>
      {cargando ? <IndicadorCarga /> : null}
      <EncabezadoPolizasSiniestradas mostrarMenu={!verMenuInferior}/>
      <PantallaFondo heightSinBar>
        <ContenedorPolizas polizas={0}>
          <TituloMisPolizas id="titulo">{diccionario.titulo}</TituloMisPolizas>
          {polizasEncontradas?.length > 1 && (
            <MensajePequeno id="mensajePequeno">
              {diccionario.descripcion}
            </MensajePequeno>
          )}
          <GrupoBotones
            tipoSeleccionado={tipoPoliza}
            evento={alSeleccionarTipoPoliza}
            opcion1="AUTR"
            opcion2="DAN"
            texto1="HDI auto"
            texto2="HDI daños"
          />

          {contarPolizasPorTipo() > 0
            && polizasEncontradas
                .filter((poliza) => poliza.lineaNegocio === tipoPoliza)
                .map((poliza) => (
                  <PolizaRecibo
                    mostrar={tipoPoliza === poliza.lineaNegocio}
                    numeroPoliza={poliza.polizaFormato}
                    evento={consultarRecibosEndosos}
                    datos={poliza}
                    key={poliza.poliza}
                    valida={true}
                    tipo={poliza.lineaNegocio}
                  />
                ))
              } 
              
              {!cargando && tipoPoliza === "AUTR" && contarPolizasPorTipo() === 0 && (
                <ContenedorSinSiniestros>
                  <IconoCarro />
                  <br />
                  {diccionario.sinPolizas1}
                  <br />
                  {diccionario.sinPolizas2}
                </ContenedorSinSiniestros>
              )}

              {!cargando && tipoPoliza === "DAN" && contarPolizasPorTipo() === 0  && (
                <ContenedorSinSiniestros>
                  <img src={IconoCasa} width="50" />
                  <br />
                  {diccionario.sinPolizas1}
                  <br />
                  {diccionario.sinPolizas2}
                </ContenedorSinSiniestros>
              )}
        </ContenedorPolizas>
      </PantallaFondo>
      {verMenuInferior ? <MenuBottomComponente /> : <></>}
    </EnvolvedorPantallaPolizas>
  );
};

export default PantallaMisPolizas;
