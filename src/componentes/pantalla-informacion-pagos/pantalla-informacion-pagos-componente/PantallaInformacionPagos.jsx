/* eslint-disable */
import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loader } from "graphql.macro";
import { useQuery } from "@apollo/react-hooks";
import {
  EnvolvedorPantallaPolizas,
  PantallaFondoBlanco,
  TituloMisPolizas,
  MensajePequeno,
  Contenedor,
  CostoTotal,
  PieDePagina,
  ContenedorBoton,
  ContenedorSinElementos,
  ImagenSinElementos,
} from "./PantallaInformacionPagos.styled";
import EncabezadoGrande from "../../encabezado-grande";
import IndicadorCarga from "../../indicador-carga";
import ReciboPago from "../../recibo-pago/recibo-pago-componente/ReciboPago";
import Boton from "../../boton";
import { ReactComponent as IconoReciboNegro } from "../../../recursos/iconos/ico_recibos_negro.svg";
import { ReactComponent as IconoEndosoNegro } from "../../../recursos/iconos/ico_endosos_negro.svg";

const diccionario = {
  titulo: "Recibos disponibles para pagar de la póliza ",
  descripcionPantalla: "Aquí podrás ver tu recibos próximos a vencer.",
  pagar: "Pagar $",
  acordeonPagos: {
    pagarProximo: "Pagar próximo recibo",
    pagarEndosos: "Pagar endosos",
  },
  pagarEnLinea: "Pagar en línea",
  verEndosos: "Ver endosos",
  verRecibos: "Ver recibos",
  etiquetaContinuar: "Continuar",
  sinRecibos: "No tienes recibos",
  sinEndosos: "No tienes endosos",
  sinElementos: "pendientes o registrados",
};

import dummy from "./dummy.json";
import Constantes from "../../../recursos/constantes";
import { useCookies } from "react-cookie";
import { Alerta } from "../../alerta";
import { PantallaFondoGris } from "../../pantalla-mis-polizas/pantalla-mis-polizas-componente/PantallaMisPolizas.styled";

const OBTENER_POLIZA = loader(
  "../../../graphQL/query/cobranza/cobranza_detallePolizaCobranza.graphql"
);

const nombreCookie = Constantes.nombreDeCookie;

const PantallaInformacionPagos = () => {
  const location = useLocation();
  const estadoApp = useSelector((estado) => estado);
  const history = useHistory();
  const dispatch = useDispatch();

  const [cookie] = useCookies([nombreCookie]);
  const objetoCookie = cookie[nombreCookie];
  if (!objetoCookie || !objetoCookie.Usuario || !objetoCookie.access_token) {
    history.push("/");
  }

  const { poliza, tipo, modo } = location.state;
  const [cargando, asignarValorCargando] = useState(false);
  const [totalPorPagar, setTotalPorPagar] = useState(0);
  const [alertaNoSaltarRecibo, setAlertaNoSaltarRecibo] = useState(false);

  useEffect(() => {
    //  console.table(poliza);
    //  console.log("MODO: ", modo);
    console.log(estadoApp);
  }, []);

  const { data: detallePoliza, loading } = useQuery(OBTENER_POLIZA, {
    variables: {
      agencia: poliza.oficina,
      inciso: parseInt(poliza.inciso),
      lineaNegocio: poliza.lineaNegocio,
      numeroReporte: 0,
      token: objetoCookie.access_token || "",
      poliza:
        poliza.lineaNegocio === "AUTR"
          ? poliza.poliza.length === 10
            ? poliza.poliza
            : `${poliza.oficina}${poliza.poliza}`
          : poliza.poliza,
    },
    fetchPolicy: "no-cache",
  });

  const [detalle, asignarValorDetalle] = useState(
    detallePoliza?.cobranza_detallePolizaCobranza.dato || []
  );

  const actualizarCostoTotal = (costo) => {
    setTotalPorPagar(costo);
  };

  useEffect(() => {
    if (!loading) {
      asignarValorCargando(false);
      if (detallePoliza && detallePoliza.cobranza_detallePolizaCobranza) {
        console.log(detallePoliza.cobranza_detallePolizaCobranza.dato)
        asignarValorDetalle(detallePoliza.cobranza_detallePolizaCobranza.dato);
        //asignarValorDetalle(dummy);
      }
    } else {
      asignarValorCargando(true);
    }
  }, [loading, detallePoliza]);

  const obtenerTotalRecibos = () => {
    //  console.log(detalle?.recibosEndosos?.length);
    if (modo === "Endosos") {
      if (detalle?.recibosEndosos?.length == undefined) {
        return 0;
      } else {
        return detalle?.recibosEndosos?.filter(
          (r) =>
            r.estatus.toUpperCase() !== "PAGADO" &&
            r.estatus.toUpperCase() !== "PAGADA"
        ).length;
      }
    }
    if (modo === "Recibos") {
      if (detalle?.recibos?.length == undefined) {
        return 0;
      } else {
        return detalle?.recibos?.filter(
          (r) =>
            r.estatus.toUpperCase() !== "PAGADO" &&
            r.estatus.toUpperCase() !== "PAGADA"
        ).length;
      }
    }
  };

  const verificarNoSaltarRecibo = () => {
    // TODO: Si uno de los recibos seleccionados salta al siguiente del primer recibo, no permitir pago
    const recibos = estadoApp.recibosPorPagar;
    if (recibos.length === 2) {
      const reciboObligatorio = recibos.filter((r) => r.checkPagar)[0];
      if (recibos[1].serie == reciboObligatorio.serie + 2) {
        console.log("No puedes pagar un recibo por adelantado si no has pagado el previo")
        setAlertaNoSaltarRecibo(true);
        return;
      }
    }

    history.push({
      pathname: "/formas-pago",
      state: { poliza: detalle, polizaGeneral: poliza, totalPorPagar: totalPorPagar },
    })
  };

  const reedireccion = () => {
    console.log(detalle.recibos);
    const folios = [];

    detalle.recibos.forEach((recibo) => {
      folios.push(recibo.folio);
      console.log(folios);
    });

    dispatch({
      type: "AGREGAR",
      valor: folios,
      indice: "foliosArray",
    });
    verificarNoSaltarRecibo();
    // const noRecibo = detalle.recibosEndosos.filter((recibo) => recibo.numeroRecibo === )
  }

  return (
    <EnvolvedorPantallaPolizas key={v4()}>
      {cargando ? <IndicadorCarga /> : null}
      <EncabezadoGrande mostrarBack />
      <PantallaFondoGris>
        <Contenedor>
          <Alerta 
            colorAlerta="rojo"
            manejarCierre={() => setAlertaNoSaltarRecibo(false)}
            textoEncabezado="Aviso"
            textoCuerpo="Lo sentimos, no es posible pagar un recibo por adelantado si no has pagado el previo"
            etiquetaBoton="Entiendo"
            funcionLlamadaBoton={() => setAlertaNoSaltarRecibo(false)}
            mostrarModal={alertaNoSaltarRecibo}
            tipoIcono="trianguloAlerta"
            key={v4()}
          />
          <TituloMisPolizas id="titulo">{diccionario.titulo}{poliza.polizaFormato}</TituloMisPolizas>
          <MensajePequeno id="mensajePequeno">
            {diccionario.descripcionPantalla}
          </MensajePequeno>

          <CostoTotal>{`${diccionario.pagar} ${totalPorPagar}`}</CostoTotal>

          {modo === "Endosos"
            ? detalle?.recibosEndosos
                ?.filter(
                  (r) =>
                    !r.estatus.toUpperCase().startsWith("PAGAD") &&
                    !r.estatus.toUpperCase().startsWith("CANCELAD")
                )
                .map((recibo) => (
                  <ReciboPago
                    modo="pago"
                    recibo={recibo}
                    tipo={tipo}
                    poliza={detalle}
                    polizaGeneral={poliza}
                    key={recibo.folio}
                    handlerCostoRecibo={actualizarCostoTotal}
                    reciboSeleccionado={recibo.checkPagar}
                  />
                ))
            : detalle?.recibos
                ?.filter(
                  (r) =>
                    !r.estatus.toUpperCase().startsWith("PAGAD") &&
                    !r.estatus.toUpperCase().startsWith("CANCELAD")
                )
                .map((recibo) => (
                  <ReciboPago
                    modo="pago"
                    recibo={recibo}
                    tipo={tipo}
                    poliza={detalle}
                    polizaGeneral={poliza}
                    key={recibo.folio}
                    handlerCostoRecibo={actualizarCostoTotal}
                    reciboSeleccionado={recibo.checkPagar}
                  />
                ))}

          {obtenerTotalRecibos() < 1 ? (
            <ContenedorSinElementos>
              <ImagenSinElementos>
                {modo === "Recibos" ? (
                  <IconoReciboNegro className="icono" />
                ) : (
                  <IconoEndosoNegro className="icono" />
                )}
              </ImagenSinElementos>
              {modo == "Recibos"
                ? diccionario.sinRecibos
                : diccionario.sinEndosos}
              <br />
              {diccionario.sinElementos}
            </ContenedorSinElementos>
          ) : null}
        </Contenedor>
      </PantallaFondoGris>

      <PieDePagina>
        <ContenedorBoton>
          <Boton
            etiqueta={diccionario.etiquetaContinuar}
            tema={totalPorPagar > 0 ? "estandar" : "deshabilitado"}
            enClick={
              totalPorPagar > 0
                ? () =>
                    reedireccion()
                : null
            }
          />
        </ContenedorBoton>
      </PieDePagina>
    </EnvolvedorPantallaPolizas>
  );
};

export default PantallaInformacionPagos;
