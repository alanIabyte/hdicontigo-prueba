/* eslint-disable */
import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { loader } from "graphql.macro";
import { useLazyQuery } from "@apollo/react-hooks";
import useAlerta from "../../../utils/useAlerta";
import {
  EnvolvedorPantallaPolizas,
  PantallaFondoBlanco,
  TituloMisPolizas,
  MensajePequeno,
  Contenedor,
  ContenedorFormasPago,
  ContenedorIcono,
  FormaPago,
  NombreFormaPago,
  DescripcionFormaPago,
} from "./PantallaFormasPago.styled";
import EncabezadoGrande from "../../encabezado-grande";
import Constantes from "../../../recursos/constantes";
import IndicadorCarga from "../../indicador-carga";
import { Alerta } from "../../alerta";
import { ReactComponent as IconoTarjeta } from "../../../recursos/iconos/hdi-c/pagar-recibos/tarjeta.svg";
import IconoTelefono from "../../../recursos/iconos/hdi-c/pagar-recibos/telefono.svg";
import { ReactComponent as IconoOtra } from "../../../recursos/iconos/hdi-c/pagar-recibos/otras.svg";
import {
  diccionario,
  configAlertaLigasPago,
  configAlertaRecibos,
} from "./utils";
import showConfig from "../../../utils/configs";
import useAccionesLog from "../../../utils/useAccionesLog";

const OBTENER_LIGAS_PAGO = loader(
  "../../../graphQL/query/cobranza/cobranza_consultaUrlSantanderXFolioRecibo.graphql"
);

const nombreCookie = Constantes.nombreDeCookie;

const PantallaFormasPago = () => {
  const history = useHistory();
  const location = useLocation();
  const estadoApp = useSelector((estado) => estado);
  const [objetoCookie] = useCookies([nombreCookie]);
  const alertaLigaPago = useAlerta(configAlertaLigasPago);
  const alertaRecibos = useAlerta(configAlertaRecibos);
  const [cargando, asignarValorCargando] = useState(false);
  const [ligaPago, setLigaPago] = useState(false);
  const { runEnterLog, runSuccesLog, runHDIContigoLog } = useAccionesLog(estadoApp.informacionContacto.telefono || "");
  let totalPorPagar;

  const { telPago } = Constantes;
  let poliza;
  let polizaGeneral;
  let recibosPorPagar;
  let totalPagar;

  const [obtenerLigasPago, { loading, error, data }] = useLazyQuery(
    OBTENER_LIGAS_PAGO,
    {
      fetchPolicy: "no-cache",
    }
  );

  const usuario =
    objetoCookie && objetoCookie.Usuario ? objetoCookie.Usuario : "0";

  if (location.state.poliza && estadoApp?.recibosPorPagar && location.state.totalPorPagar) {
    poliza = location.state.poliza;
    polizaGeneral = location.state.polizaGeneral;
    recibosPorPagar = estadoApp?.recibosPorPagar;
    totalPagar = location.state.totalPorPagar;
    console.log(totalPagar);
    /*
    console.groupCollapsed("PANTALLA FORMAS DE PAGO");
    console.log("Poliza");
    console.table(location.state.poliza);
    console.log("Poliza General");
    console.table(location.state.polizaGeneral);
    console.log("Recibos a pagar");
    console.table(recibosPorPagar);
    console.groupEnd();
    */
  } else {
   history.push("/mis-polizas");
    console.log(location.state)
  }

  const obtenerMeses = (recibos) => {
    const recibo = recibos[0];
    console.log(recibo);
    const meses = recibo.aplicaMeses;
    console.log(meses);
    if (meses !== "No") {
      console.log(meses.split(" ")[0])
      return Number(meses.split(" ")[0]);
    } else {
      return 0;
    }
  }

  const pagarPorTarjeta = () => {
    if (
      poliza?.recibos?.some((r) => r.checkPagar === true) &&
      recibosPorPagar.length < 2 &&
      recibosPorPagar[0].checkPagar === false
    ) {
      //TODO: No se puede pagar este
      alertaRecibos.mostrar();
    } else {
      let folios = [];
      let total = 0;
      recibosPorPagar.forEach((r) => folios.push(r.folio));
      recibosPorPagar.forEach((r) => {
        console.log(
          (total =
            total + parseFloat(r.primaNeta.replace(",", "").replace("$", "")))
        );
      });
      let cadenaFolios = folios.join(",");
      let date = new Date();
      let day = `${date.getDate()}`.padStart(2, "0");
      let month = `${date.getMonth() + 1}`.padStart(2, "0");
      let year = date.getFullYear();

      let fechaVigencia = `${day}/${month}/${year}`;
      const mesesSinIntereses = obtenerMeses(poliza.recibos);
      totalPorPagar = total;
      asignarValorCargando(true);
      obtenerLigasPago({
        variables: {
          correo: "TS10_Admin_Grl_Env@hdi.prep",
          depNumber: "",
          folios: cadenaFolios,
          lineaNegocio: polizaGeneral.lineaNegocio,
          mesesSinIntereses,
          monto: total,
          origen: "",
          provider: "",
          senderID: usuario,
          usuario: "SRV501286387",
          vigenciaURL: fechaVigencia,
        },
        fetchPolicy: "cache-and-network",
      });
    }
  };

  useEffect(() => {
    if (!loading && data && data.cobranza_consultaUrlSantanderXFolioRecibo) {
      guardarLog(`data: ${JSON.stringify(data)}, Poliza: [${JSON.stringify(polizaGeneral)}]`)
      asignarValorCargando(false);
      let res = data.cobranza_consultaUrlSantanderXFolioRecibo;
      if (res.dato !== null) {
        setLigaPago(res.dato.urlTransaccion);
        const listaDetalle = [
          {"columna": "causa", "valor": ""},
          {"columna": "importe", "valor" : totalPagar},
          {"columna": "folio", "valor": res.dato.refTransaccion || ""}
        ]
        runEnterLog(2, listaDetalle);
        history.push({
          pathname: "/transaccion-mitec",
          state: { url: res.dato.urlTransaccion },
        });
      } else {
        guardarLog(`Failed: ${JSON.stringify(data)}, Poliza: [${JSON.stringify(polizaGeneral)}]`)
        //  TODO: ERROR no tiene dato
        alertaLigaPago.settextoCuerpoJsx(
          "No se pudo procesar la solicitud, por favor contacta a tu agente."
        );
        const arrayListaDetalle = [
          {"columna": "causa", "valor": "liga de pago no generada"},
          {"columna": "importe", "valor": totalPagar},
          {"columna": "folio", "valor": ""},
        ]
        runSuccesLog(2, arrayListaDetalle);
        alertaLigaPago.mostrar();
      }
    }

    if (error) {
      guardarLog(`Error: [${JSON.stringify(error)}], Poliza: [${JSON.stringify(polizaGeneral)}]`)
      alertaLigaPago.settextoCuerpoJsx(error.message ?? "Error al obtener liga de pago");
      alertaLigaPago.mostrar();
      asignarValorCargando(false);
    }
  }, [data, loading, error]);

  const pagarPorTelefono = () => {
    window.location.href = `tel:${telPago}`;
  };

  const pagarPorOtra = () => {
    history.push({
      pathname: "/pago-otra",
      state: { poliza, polizaGeneral },
    });
  };

  const guardarLog = (detalle) => {
    try{
      console.log(`Enviando log HDI Contigo con detalle: ${detalle}`);
      runHDIContigoLog(detalle);
    } catch (error) {
      console.log("Error al enviar log HDI Contigo", error);
    }
  }

  return (
    <EnvolvedorPantallaPolizas key={v4()}>
      <EncabezadoGrande mostrarBack />
      {cargando ? <IndicadorCarga /> : null}
      <Alerta
        {...alertaRecibos}
        funcionLlamadaBoton={() => {
          history.push("/informacion-pagos", {
            poliza: polizaGeneral,
            tipo: polizaGeneral.lineaNegocio,
            modo: "Recibos",
          });
        }}
      />
      <Alerta
        {...alertaLigaPago}
        funcionLlamadaBoton={() => {
          alertaLigaPago.cerrar();
        }}
      />
      <PantallaFondoBlanco>
        <Contenedor>
          <TituloMisPolizas id="titulo">{diccionario.titulo}</TituloMisPolizas>

          <ContenedorFormasPago>
            { showConfig.showPagos && (
              <FormaPago onClick={pagarPorTarjeta}>
                <ContenedorIcono>
                  <IconoTarjeta className="icono" />
                </ContenedorIcono>
                <NombreFormaPago>{diccionario.formas.tarjeta}</NombreFormaPago>
                <DescripcionFormaPago>
                  {diccionario.formas.tarjetaDesc}
                </DescripcionFormaPago>
              </FormaPago>
            )}

            <FormaPago onClick={pagarPorTelefono}>
              <ContenedorIcono>
                {/* <IconoTelefono className="icono" /> */}
                <img src={IconoTelefono} className="icono" alt="icono-telefono" />
              </ContenedorIcono>
              <NombreFormaPago>{diccionario.formas.telefono}</NombreFormaPago>
              <DescripcionFormaPago>
                {diccionario.formas.telefonoDesc}
              </DescripcionFormaPago>
            </FormaPago>

            <FormaPago
              onClick={pagarPorOtra}
              // deshabilitada={recibosPorPagar.length > 1}
            >
              <ContenedorIcono>
                <IconoOtra className="icono" />
              </ContenedorIcono>
              <NombreFormaPago>{diccionario.formas.otra}</NombreFormaPago>
              <DescripcionFormaPago>
                {diccionario.formas.otraDesc}
              </DescripcionFormaPago>
            </FormaPago>
          </ContenedorFormasPago>
        </Contenedor>
      </PantallaFondoBlanco>
    </EnvolvedorPantallaPolizas>
  );
};

export default PantallaFormasPago;
