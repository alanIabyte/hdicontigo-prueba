/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
// TODO: FILTRO DEPENDIENDO TIPO

import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loader } from "graphql.macro";
import { useQuery } from "@apollo/react-hooks";
import { useCookies } from "react-cookie";
import {
  EnvolvedorPantallaPolizas,
  PantallaFondoBlanco,
  TituloMisPolizas,
  Contenedor,
  PieDePagina,
  ContenedorBoton,
  ContenedorSinElementos,
  ImagenSinElementos,
  ListaRecibos,
} from "./PantallaInformacionRecibosEndosos.styled";
import EncabezadoGrande from "../../encabezado-grande";
import IndicadorCarga from "../../indicador-carga";
import ReciboPago from "../../recibo-pago/recibo-pago-componente/ReciboPago";
import Boton from "../../boton";
import { ReactComponent as IconoReciboNegro } from "../../../recursos/iconos/ico_recibos_negro.svg";
import { ReactComponent as IconoEndosoNegro } from "../../../recursos/iconos/ico_endosos_negro.svg";
import constantes from "../../../recursos/constantes";
import { Alerta } from "../../alerta";

const diccionario = {
  titulo: "Estos son los recibos de tu póliza: ",
  etiquetaContinuar: "Continuar",
  dePoliza: "de la póliza",
  deEndosos: "de endosos",
  pagarRecibos: "Pagar recibos",
  pagarEndosos: "Pagar endosos",
  sinRecibos: "No tienes recibos",
  sinEndosos: "No tienes endosos",
  sinElementos: "por favor contacta a tu agente",
};

const OBTENER_POLIZA = loader(
  "../../../graphQL/query/cobranza/cobranza_detallePolizaCobranza.graphql"
);

const nombreCookie = constantes.nombreDeCookie;

const PantallaInformacionRecibosEndosos = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];

  const { poliza, tipo } = location.state;
  const [cargando, asignarValorCargando] = useState(false);
  const [tipoConsulta, setTipoConsulta] = useState("Recibos");

  const { data: detallePoliza, loading } = useQuery(OBTENER_POLIZA, {
    variables: {
      agencia: poliza.oficina,
      inciso: parseInt(poliza.inciso),
      lineaNegocio: poliza.lineaNegocio,
      numeroReporte: 0,
      poliza:
        poliza.lineaNegocio === "AUTR"
          ? poliza.poliza.length === 10
            ? poliza.poliza
            : `${poliza.oficina}${poliza.poliza}`
          : poliza.poliza,
      token: objetoCookie.access_token,
    },
    fetchPolicy: "no-cache",
  });

  const [detalle, asignarValorDetalle] = useState([]);

  const obtenerTitulo = () => {
    tipoConsulta === "Recibos"
      ? diccionario.titulo + diccionario.dePoliza
      : diccionario.titulo + diccionario.deEndosos;
  };

  const alSeleccionarTipoConsulta = (tipoParam) => {
    setTipoConsulta(tipoParam);
  };

  useEffect(() => {
    if (!loading) {
      asignarValorCargando(false);
      if (detallePoliza && detallePoliza.cobranza_detallePolizaCobranza) {
        asignarValorDetalle(detallePoliza.cobranza_detallePolizaCobranza.dato);
      }
    } else {
      asignarValorCargando(true);
    }
  }, [loading, detallePoliza]);

  useEffect(() => {
    console.group("PANTALLA INFORMACION RECIBOS ENDOSOS");
    console.table(detalle?.recibosEndosos);
    console.log(detalle?.recibos);
    console.log(detalle);
    console.groupEnd();
  }, [detalle]);

  useEffect(() => {
    dispatch({
      type: "AGREGAR",
      valor: [],
      indice: "recibosPorPagar",
    });
  }, []);

  const obtenerTotalRecibos = () => {
    if (tipoConsulta === "Endosos") {
      if (detalle?.recibosEndosos?.length === undefined) {
        return 0;
      }
      return detalle?.recibosEndosos?.length;
    }
    if (tipoConsulta === "Recibos") {
      if (detalle?.recibos?.length === undefined) {
        return 0;
      }
      return detalle?.recibos?.length;
    }
  };

  return (
    <EnvolvedorPantallaPolizas key={v4()}>
      {cargando ? <IndicadorCarga /> : null}
      <EncabezadoGrande mostrarBack />
      <PantallaFondoBlanco>
        <Contenedor>
          <TituloMisPolizas id="titulo">
            {tipoConsulta === "Recibos"
              ? `${diccionario.titulo} ${poliza.polizaFormato}`
              : `${diccionario.titulo} ${diccionario.deEndosos}`}
          </TituloMisPolizas>

          <Alerta
            textoEncabezado="Para consultar sus recibos , favor de contactar a su agente"
            mostrarModal={obtenerTotalRecibos() === 0}
            temaBoton="estandar"
            etiquetaBoton="Aceptar"
            funcionLlamadaBoton={history.goBack}
          />

          {/*
          <GrupoBotones
            tipoSeleccionado={tipoConsulta}
            evento={alSeleccionarTipoConsulta}
            opcion1="Recibos"
            opcion2="Endosos"
            texto1="Recibos"
            texto2="Endosos"
            tipoIconos="tipoRecibo"
          />
        */}

          <ListaRecibos>
            {detalle &&
              detalle?.totalRecibos?.noPagado !== null &&
              detalle?.permiteRecYDom &&
              detalle?.recibos?.map((recibo) => (
                <ReciboPago
                  modo="consulta"
                  recibo={recibo}
                  tipo={tipo}
                  poliza={detalle}
                  polizaGeneral={poliza}
                  key={recibo.folio}
                  handlerCostoRecibo={() => {}}
                  reciboSeleccionado={recibo.checkPagar}
                  tipoRecibo="Recibo"
                  esDxn={detalle?.esDxn === 1}
                />
              ))}
          </ListaRecibos>

          {!detalle.permiteRecYDom && (
            <ContenedorSinElementos>
              <ImagenSinElementos>
                {tipoConsulta === "Recibos" ? (
                  <IconoReciboNegro className="icono" />
                ) : (
                  <IconoEndosoNegro className="icono" />
                )}
              </ImagenSinElementos>
              {tipoConsulta === "Recibos"
                ? diccionario.sinRecibos
                : diccionario.sinEndosos}
              <br />
              {diccionario.sinElementos}
            </ContenedorSinElementos>
          )}
        </Contenedor>
      </PantallaFondoBlanco>

      <PieDePagina>
        <ContenedorBoton>
          {detalle?.permiteRecYDom &&
            detalle.esDxn === 0 &&
            detalle.totalRecibos.noPagado !== "$ 0.00 pesos" && (
              <Boton
                etiqueta={
                  tipoConsulta === "Recibos"
                    ? diccionario.pagarRecibos
                    : diccionario.pagarEndosos
                }
                tema={obtenerTotalRecibos() < 1 ? "deshabilitado" : "estandar"}
                deshabilitado={obtenerTotalRecibos() < 1}
                enClick={() => {
                  history.push({
                    pathname: "/informacion-pagos",
                    state: { poliza, tipo, modo: tipoConsulta },
                  });
                }}
              />
            )}
        </ContenedorBoton>
      </PieDePagina>
    </EnvolvedorPantallaPolizas>
  );
};

export default PantallaInformacionRecibosEndosos;
